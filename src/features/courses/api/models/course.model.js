export function createCatalogCourseModel(payload) {
  return {
    id: payload.id,
    title: payload.title,
    headline: payload.headline,
    description: payload.description,
    category: payload.category,
    level: payload.level,
    priceBirr: payload.priceBirr,
    rating: payload.rating,
    reviewsCount: payload.reviewsCount,
    learnerCountLabel: payload.learnerCountLabel,
    durationLabel: payload.durationLabel,
    thumbnail: payload.thumbnail,
    instructorName: payload.instructorName,
    instructorTitle: payload.instructorTitle,
    modulesCount: payload.modulesCount,
    lessonsCount: payload.lessonsCount,
    outcomes: payload.outcomes,
    enrollment: payload.enrollment,
  }
}

export function createDetailsCourseModel(payload) {
  return {
    id: payload.id,
    title: payload.title,
    headline: payload.headline,
    description: payload.description,
    category: payload.category,
    level: payload.level,
    priceBirr: payload.priceBirr,
    rating: payload.rating,
    reviewsCount: payload.reviewsCount,
    learnerCountLabel: payload.learnerCountLabel,
    durationLabel: payload.durationLabel,
    thumbnail: payload.thumbnail,
    instructorName: payload.instructorName,
    instructorTitle: payload.instructorTitle,
    modules: payload.modules,
    modulesCount: payload.modulesCount,
    lessonsCount: payload.lessonsCount,
    outcomes: payload.outcomes,
    enrollment: payload.enrollment,
  }
}

export function createPaymentCourseModel(payload) {
  return {
    id: payload.id,
    title: payload.title,
    headline: payload.headline,
    priceBirr: payload.priceBirr,
    durationLabel: payload.durationLabel,
    thumbnail: payload.thumbnail,
    instructorName: payload.instructorName,
    level: payload.level,
    category: payload.category,
    outcomes: payload.outcomes,
    enrollment: payload.enrollment,
  }
}

export function createClassroomCourseModel(payload) {
  return {
    id: payload.id,
    title: payload.title,
    headline: payload.headline,
    description: payload.description,
    category: payload.category,
    level: payload.level,
    priceBirr: payload.priceBirr,
    rating: payload.rating,
    reviewsCount: payload.reviewsCount,
    learnerCountLabel: payload.learnerCountLabel,
    durationLabel: payload.durationLabel,
    thumbnail: payload.thumbnail,
    instructorName: payload.instructorName,
    instructorTitle: payload.instructorTitle,
    modules: payload.modules,
    activeLesson: payload.activeLesson,
    lessonsCount: payload.lessonsCount,
    enrollment: payload.enrollment,
  }
}
