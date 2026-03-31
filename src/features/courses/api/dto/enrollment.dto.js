export const ENROLLMENT_STATUSES = Object.freeze({
  BROWSING: 'browsing',
  PENDING_PAYMENT: 'pending_payment',
  ENROLLED: 'enrolled',
  COMPLETED: 'completed',
})

/**
 * @typedef {Object} EnrollmentDto
 * @property {string} courseId
 * @property {string} status
 * @property {string|null} enrolledAt
 * @property {string|null} paidAt
 * @property {string|null} completedAt
 * @property {string|null} activeLessonId
 * @property {string|null} paymentReference
 */
