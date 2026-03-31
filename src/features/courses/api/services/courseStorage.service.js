import { ENROLLMENT_STATUSES } from '@/features/courses/api/dto/enrollment.dto'
import { mockCourseDtos } from '@/features/courses/api/mock/courses.mock'

const STORAGE_KEY = 'birhan-academy.mock-enrollments'

function getDefaultActiveLessonId(courseDto) {
  return courseDto.modules[0]?.lessons[0]?.id ?? null
}

function readRawStorage() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY)
    return serialized ? JSON.parse(serialized) : []
  } catch {
    return []
  }
}

function writeRawStorage(enrollmentDtos) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(enrollmentDtos))
}

export function listCourseDtos() {
  return mockCourseDtos
}

export function getCourseDto(courseId) {
  const courseDto = mockCourseDtos.find((item) => item.id === courseId)

  if (!courseDto) {
    throw new Error(`Course "${courseId}" was not found.`)
  }

  return courseDto
}

export function listEnrollmentDtos() {
  return readRawStorage()
}

export function getEnrollmentDto(courseId) {
  return readRawStorage().find((item) => item.courseId === courseId) ?? null
}

export function upsertEnrollmentDto(courseId, updater) {
  const courseDto = getCourseDto(courseId)
  const enrollmentDtos = readRawStorage()
  const index = enrollmentDtos.findIndex((item) => item.courseId === courseId)
  const existing =
    index >= 0
      ? enrollmentDtos[index]
      : {
          courseId,
          status: ENROLLMENT_STATUSES.BROWSING,
          enrolledAt: null,
          paidAt: null,
          completedAt: null,
          activeLessonId: getDefaultActiveLessonId(courseDto),
          paymentReference: null,
        }

  const next = updater(existing, courseDto)

  if (index >= 0) {
    enrollmentDtos.splice(index, 1, next)
  } else {
    enrollmentDtos.push(next)
  }

  writeRawStorage(enrollmentDtos)
  return next
}

export function startEnrollment(courseId) {
  return upsertEnrollmentDto(courseId, (existing, courseDto) => ({
    ...existing,
    status:
      existing.status === ENROLLMENT_STATUSES.COMPLETED || existing.status === ENROLLMENT_STATUSES.ENROLLED
        ? existing.status
        : ENROLLMENT_STATUSES.PENDING_PAYMENT,
    enrolledAt: existing.enrolledAt ?? new Date().toISOString(),
    activeLessonId: existing.activeLessonId ?? getDefaultActiveLessonId(courseDto),
  }))
}

export function markPaymentComplete(courseId) {
  return upsertEnrollmentDto(courseId, (existing, courseDto) => ({
    ...existing,
    status: ENROLLMENT_STATUSES.ENROLLED,
    enrolledAt: existing.enrolledAt ?? new Date().toISOString(),
    paidAt: new Date().toISOString(),
    completedAt: null,
    activeLessonId: existing.activeLessonId ?? getDefaultActiveLessonId(courseDto),
    paymentReference: `PAY-${Date.now().toString(36).toUpperCase()}`,
  }))
}

export function setActiveLesson(courseId, lessonId) {
  return upsertEnrollmentDto(courseId, (existing) => ({
    ...existing,
    activeLessonId: lessonId,
  }))
}

export function markCourseCompleted(courseId) {
  return upsertEnrollmentDto(courseId, (existing, courseDto) => ({
    ...existing,
    status: ENROLLMENT_STATUSES.COMPLETED,
    paidAt: existing.paidAt ?? new Date().toISOString(),
    completedAt: new Date().toISOString(),
    activeLessonId: existing.activeLessonId ?? getDefaultActiveLessonId(courseDto),
  }))
}
