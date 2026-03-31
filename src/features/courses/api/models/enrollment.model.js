export function createEnrollmentModel(payload) {
  return {
    courseId: payload.courseId,
    status: payload.status,
    statusLabel: payload.statusLabel,
    primaryActionLabel: payload.primaryActionLabel,
    isLocked: payload.isLocked,
    hasAccess: payload.hasAccess,
    activeLessonId: payload.activeLessonId,
    enrolledAt: payload.enrolledAt,
    paidAt: payload.paidAt,
    completedAt: payload.completedAt,
    paymentReference: payload.paymentReference,
  }
}
