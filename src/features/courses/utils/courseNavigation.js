export function getCourseRoute(course) {
  if (course.enrollment.status === 'completed') {
    return { name: 'courseCompletion', params: { courseId: course.id } }
  }

  if (course.enrollment.status === 'enrolled') {
    return { name: 'courseContent', params: { courseId: course.id } }
  }

  if (course.enrollment.status === 'pending_payment') {
    return { name: 'coursePayment', params: { courseId: course.id } }
  }

  return { name: 'courseDetails', params: { courseId: course.id } }
}
