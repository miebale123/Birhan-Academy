import { ENROLLMENT_STATUSES } from '@/features/courses/api/dto/enrollment.dto'
import { createEnrollmentModel } from '@/features/courses/api/models/enrollment.model'

const STATUS_COPY = {
  [ENROLLMENT_STATUSES.BROWSING]: {
    statusLabel: 'Ready to enroll',
    primaryActionLabel: 'Enroll now',
    isLocked: true,
    hasAccess: false,
  },
  [ENROLLMENT_STATUSES.PENDING_PAYMENT]: {
    statusLabel: 'Payment required',
    primaryActionLabel: 'Complete payment',
    isLocked: true,
    hasAccess: false,
  },
  [ENROLLMENT_STATUSES.ENROLLED]: {
    statusLabel: 'In class',
    primaryActionLabel: 'Go to class',
    isLocked: false,
    hasAccess: true,
  },
  [ENROLLMENT_STATUSES.COMPLETED]: {
    statusLabel: 'Completed',
    primaryActionLabel: 'Review course',
    isLocked: false,
    hasAccess: true,
  },
}

export function mapEnrollmentDtoToModel(enrollmentDto) {
  if (!enrollmentDto) {
    return createEnrollmentModel({
      courseId: '',
      status: ENROLLMENT_STATUSES.BROWSING,
      activeLessonId: null,
      enrolledAt: null,
      paidAt: null,
      completedAt: null,
      paymentReference: null,
      ...STATUS_COPY[ENROLLMENT_STATUSES.BROWSING],
    })
  }

  const statusMeta = STATUS_COPY[enrollmentDto.status] ?? STATUS_COPY[ENROLLMENT_STATUSES.BROWSING]

  return createEnrollmentModel({
    courseId: enrollmentDto.courseId,
    status: enrollmentDto.status,
    activeLessonId: enrollmentDto.activeLessonId,
    enrolledAt: enrollmentDto.enrolledAt,
    paidAt: enrollmentDto.paidAt,
    completedAt: enrollmentDto.completedAt,
    paymentReference: enrollmentDto.paymentReference,
    ...statusMeta,
  })
}
