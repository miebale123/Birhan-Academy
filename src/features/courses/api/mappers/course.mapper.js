import { mapEnrollmentDtoToModel } from '@/features/courses/api/mappers/enrollment.mapper'
import {
  createCatalogCourseModel,
  createDetailsCourseModel,
  createClassroomCourseModel,
  createPaymentCourseModel,
} from '@/features/courses/api/models/course.model'

function formatLearnerCount(value) {
  return `${new Intl.NumberFormat('en-US').format(value)} learners`
}

function countLessons(modules) {
  return modules.reduce((total, module) => total + module.lessons.length, 0)
}

function mapModules(modules) {
  return modules.map((module) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    lessons: module.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      durationMinutes: lesson.durationMinutes,
      durationLabel: `${lesson.durationMinutes} min`,
      summary: lesson.summary,
      objective: lesson.objective,
      content: lesson.content,
      activities: lesson.activities,
    })),
  }))
}

export function mapCourseDtoToCatalogModel(courseDto, enrollmentDto) {
  const modules = mapModules(courseDto.modules)
  const enrollment = mapEnrollmentDtoToModel(enrollmentDto)

  return createCatalogCourseModel({
    id: courseDto.id,
    title: courseDto.title,
    headline: courseDto.headline,
    description: courseDto.description,
    category: courseDto.category,
    level: courseDto.level,
    priceBirr: courseDto.priceBirr,
    rating: courseDto.rating,
    reviewsCount: courseDto.reviewsCount,
    learnerCountLabel: formatLearnerCount(courseDto.learnerCount),
    durationLabel: courseDto.durationLabel,
    thumbnail: courseDto.thumbnail,
    instructorName: courseDto.instructor.name,
    instructorTitle: courseDto.instructor.title,
    modulesCount: modules.length,
    lessonsCount: countLessons(modules),
    outcomes: [...courseDto.outcomes],
    enrollment,
  })
}

export function mapCourseDtoToDetailsModel(courseDto, enrollmentDto) {
  const modules = mapModules(courseDto.modules)
  const enrollment = mapEnrollmentDtoToModel(enrollmentDto)

  return createDetailsCourseModel({
    id: courseDto.id,
    title: courseDto.title,
    headline: courseDto.headline,
    description: courseDto.description,
    category: courseDto.category,
    level: courseDto.level,
    priceBirr: courseDto.priceBirr,
    rating: courseDto.rating,
    reviewsCount: courseDto.reviewsCount,
    learnerCountLabel: formatLearnerCount(courseDto.learnerCount),
    durationLabel: courseDto.durationLabel,
    thumbnail: courseDto.thumbnail,
    instructorName: courseDto.instructor.name,
    instructorTitle: courseDto.instructor.title,
    modules,
    modulesCount: modules.length,
    lessonsCount: countLessons(modules),
    outcomes: [...courseDto.outcomes],
    enrollment,
  })
}

export function mapCourseDtoToPaymentModel(courseDto, enrollmentDto) {
  return createPaymentCourseModel({
    id: courseDto.id,
    title: courseDto.title,
    headline: courseDto.headline,
    priceBirr: courseDto.priceBirr,
    durationLabel: courseDto.durationLabel,
    thumbnail: courseDto.thumbnail,
    instructorName: courseDto.instructor.name,
    level: courseDto.level,
    category: courseDto.category,
    outcomes: [...courseDto.outcomes],
    enrollment: mapEnrollmentDtoToModel(enrollmentDto),
  })
}

export function mapCourseDtoToClassroomModel(courseDto, enrollmentDto) {
  const modules = mapModules(courseDto.modules)
  const enrollment = mapEnrollmentDtoToModel(enrollmentDto)
  const fallbackLesson = modules[0]?.lessons[0] ?? null
  const activeLesson =
    modules.flatMap((module) => module.lessons).find((lesson) => lesson.id === enrollment.activeLessonId) ??
    fallbackLesson

  return createClassroomCourseModel({
    id: courseDto.id,
    title: courseDto.title,
    headline: courseDto.headline,
    description: courseDto.description,
    category: courseDto.category,
    level: courseDto.level,
    priceBirr: courseDto.priceBirr,
    rating: courseDto.rating,
    reviewsCount: courseDto.reviewsCount,
    learnerCountLabel: formatLearnerCount(courseDto.learnerCount),
    durationLabel: courseDto.durationLabel,
    thumbnail: courseDto.thumbnail,
    instructorName: courseDto.instructor.name,
    instructorTitle: courseDto.instructor.title,
    modules,
    activeLesson,
    lessonsCount: countLessons(modules),
    enrollment,
  })
}
