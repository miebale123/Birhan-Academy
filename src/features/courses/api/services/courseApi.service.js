import { ENROLLMENT_STATUSES } from '@/features/courses/api/dto/enrollment.dto'
import {
  mapCourseDtoToCatalogModel,
  mapCourseDtoToDetailsModel,
  mapCourseDtoToClassroomModel,
  mapCourseDtoToPaymentModel,
} from '@/features/courses/api/mappers/course.mapper'
import { mapEnrollmentDtoToModel } from '@/features/courses/api/mappers/enrollment.mapper'
import { simulateMockRequest } from '@/features/courses/api/services/mockApi.service'
import {
  getCourseDto,
  getEnrollmentDto,
  listCourseDtos,
  listEnrollmentDtos,
  markCourseCompleted,
  markPaymentComplete,
  setActiveLesson,
  startEnrollment,
} from '@/features/courses/api/services/courseStorage.service'

function createAccessError(message, code) {
  const error = new Error(message)
  error.code = code
  return error
}

function ensureExistingCourse(courseId) {
  return getCourseDto(courseId)
}

export const courseApiService = {
  async getCourseCatalog() {
    return simulateMockRequest(() => {
      const enrollmentDtos = listEnrollmentDtos()

      return listCourseDtos().map((courseDto) => {
        const enrollmentDto = enrollmentDtos.find((item) => item.courseId === courseDto.id) ?? null
        return mapCourseDtoToCatalogModel(courseDto, enrollmentDto)
      })
    })
  },

  async beginEnrollment(courseId) {
    return simulateMockRequest(() => {
      ensureExistingCourse(courseId)
      return mapEnrollmentDtoToModel(startEnrollment(courseId))
    })
  },

  async getCourseDetails(courseId) {
    return simulateMockRequest(() => {
      const courseDto = ensureExistingCourse(courseId)
      const enrollmentDto = getEnrollmentDto(courseId)
      return mapCourseDtoToDetailsModel(courseDto, enrollmentDto)
    })
  },

  async getPaymentContext(courseId) {
    return simulateMockRequest(() => {
      const courseDto = ensureExistingCourse(courseId)
      const enrollmentDto = getEnrollmentDto(courseId) ?? startEnrollment(courseId)
      return mapCourseDtoToPaymentModel(courseDto, enrollmentDto)
    })
  },

  async completePayment(courseId, paymentDto) {
    return simulateMockRequest(() => {
      ensureExistingCourse(courseId)

      if (!paymentDto.cardholderName || !paymentDto.cardNumber || !paymentDto.expiryDate || !paymentDto.cvc) {
        throw createAccessError('Please complete the payment form before continuing.', 'PAYMENT_INVALID')
      }

      return mapEnrollmentDtoToModel(markPaymentComplete(courseId))
    }, 360)
  },

  async getClassroom(courseId) {
    return simulateMockRequest(() => {
      const courseDto = ensureExistingCourse(courseId)
      const enrollmentDto = getEnrollmentDto(courseId)

      if (!enrollmentDto || enrollmentDto.status === ENROLLMENT_STATUSES.PENDING_PAYMENT) {
        throw createAccessError('Payment is required before class access.', 'PAYMENT_REQUIRED')
      }

      return mapCourseDtoToClassroomModel(courseDto, enrollmentDto)
    })
  },

  async selectLesson(courseId, lessonId) {
    return simulateMockRequest(() => {
      const courseDto = ensureExistingCourse(courseId)
      const enrollmentDto = getEnrollmentDto(courseId)

      if (!enrollmentDto || ![ENROLLMENT_STATUSES.ENROLLED, ENROLLMENT_STATUSES.COMPLETED].includes(enrollmentDto.status)) {
        throw createAccessError('You need active course access to open lessons.', 'PAYMENT_REQUIRED')
      }

      return mapCourseDtoToClassroomModel(courseDto, setActiveLesson(courseId, lessonId))
    })
  },

  async completeCourse(courseId) {
    return simulateMockRequest(() => {
      const courseDto = ensureExistingCourse(courseId)
      const enrollmentDto = getEnrollmentDto(courseId)

      if (!enrollmentDto || ![ENROLLMENT_STATUSES.ENROLLED, ENROLLMENT_STATUSES.COMPLETED].includes(enrollmentDto.status)) {
        throw createAccessError('You need active course access before completion.', 'PAYMENT_REQUIRED')
      }

      return mapCourseDtoToClassroomModel(courseDto, markCourseCompleted(courseId))
    })
  },
}
