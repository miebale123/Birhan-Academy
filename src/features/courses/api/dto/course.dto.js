/**
 * @typedef {Object} CourseLessonDto
 * @property {string} id
 * @property {string} title
 * @property {number} durationMinutes
 * @property {string} summary
 * @property {string} objective
 * @property {string} content
 * @property {string[]} activities
 */

/**
 * @typedef {Object} CourseModuleDto
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {CourseLessonDto[]} lessons
 */

/**
 * @typedef {Object} CourseDto
 * @property {string} id
 * @property {string} title
 * @property {string} headline
 * @property {string} description
 * @property {string} category
 * @property {string} level
 * @property {number} priceBirr
 * @property {number} rating
 * @property {number} reviewsCount
 * @property {number} learnerCount
 * @property {string} durationLabel
 * @property {string} thumbnail
 * @property {{name: string, title: string}} instructor
 * @property {string[]} outcomes
 * @property {CourseModuleDto[]} modules
 */

export const COURSE_LEVELS = Object.freeze({
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ALL_LEVELS: 'All Levels',
})
