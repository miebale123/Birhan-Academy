import biologyImage from '@/assets/images/courses/biology.avif'
import geographyImage from '@/assets/images/courses/geography.jpg'
import mathImage from '@/assets/images/courses/math.jpg'
import soccerImage from '@/assets/images/courses/soccer.jpg'
import watermelonImage from '@/assets/images/courses/watermelon.jpg'
import { COURSE_LEVELS } from '@/features/courses/api/dto/course.dto'

export const mockCourseDtos = [
  {
    id: 'food-science',
    title: 'Food Science',
    headline: 'Understand nutrition, healthy choices, and the science behind everyday meals.',
    description:
      'A practical introduction to food science for younger learners, with everyday examples that connect science, health, and home life.',
    category: 'Life Skills',
    level: COURSE_LEVELS.BEGINNER,
    priceBirr: 1499,
    rating: 4.8,
    reviewsCount: 1842,
    learnerCount: 12650,
    durationLabel: '6 lessons · 2 weeks',
    thumbnail: watermelonImage,
    instructor: {
      name: 'Hanna Tesfaye',
      title: 'Life Skills Instructor',
    },
    outcomes: [
      'Read food choices with more confidence.',
      'Connect nutrition concepts to daily life.',
      'Build simple habits that support healthy learning.',
    ],
    modules: [
      {
        id: 'food-foundations',
        title: 'Food Foundations',
        description: 'Begin with the basics of nutrition and how food supports learning and energy.',
        lessons: [
          {
            id: 'food-foundations-lesson-1',
            title: 'Why food science matters',
            durationMinutes: 14,
            summary: 'A warm introduction to how food connects to growth, concentration, and health.',
            objective: 'Explain the role of food science in everyday student life.',
            content:
              'Food science helps us understand what the body needs, how meals affect concentration, and why balanced choices matter. In this lesson, learners connect food to energy, growth, and wellbeing in practical ways.',
            activities: [
              'List three foods you eat during a school week.',
              'Discuss which meals help you stay focused longer.',
            ],
          },
          {
            id: 'food-foundations-lesson-2',
            title: 'Healthy routines that last',
            durationMinutes: 17,
            summary: 'Build simple habits around breakfast, water, and balanced plates.',
            objective: 'Describe small routines that support long-term healthy eating.',
            content:
              'Healthy routines are easier to keep when they feel realistic. This lesson introduces simple planning habits, hydration reminders, and balanced meal examples that fit real family schedules.',
            activities: [
              'Design a simple balanced breakfast.',
              'Write one routine you can keep for the next week.',
            ],
          },
        ],
      },
      {
        id: 'food-practice',
        title: 'Food in Practice',
        description: 'Apply food science ideas to real choices and situations.',
        lessons: [
          {
            id: 'food-practice-lesson-1',
            title: 'Smart choices at home and school',
            durationMinutes: 15,
            summary: 'Use practical thinking when choosing snacks and meals.',
            objective: 'Compare food options using simple nutrition clues.',
            content:
              'Students often make food choices quickly. This lesson teaches them how to think about ingredients, energy, and balance in a simple, encouraging way that works in daily routines.',
            activities: [
              'Compare two snacks and explain the stronger choice.',
              'Create a one-day healthy food plan.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'geography',
    title: 'Geography',
    headline: 'Read places, regions, and maps with stronger understanding.',
    description:
      'A visually guided geography course that helps learners connect places, movement, and environment using simple explanations and strong examples.',
    category: 'Social Studies',
    level: COURSE_LEVELS.ALL_LEVELS,
    priceBirr: 1699,
    rating: 4.7,
    reviewsCount: 2218,
    learnerCount: 14290,
    durationLabel: '8 lessons · 3 weeks',
    thumbnail: geographyImage,
    instructor: {
      name: 'Mekdes Alemu',
      title: 'Geography Educator',
    },
    outcomes: [
      'Interpret maps with more confidence.',
      'Understand how geography shapes communities.',
      'Use location language clearly and accurately.',
    ],
    modules: [
      {
        id: 'geography-maps',
        title: 'Maps and Movement',
        description: 'Develop the core language of maps, symbols, and directions.',
        lessons: [
          {
            id: 'geography-maps-lesson-1',
            title: 'Reading a map clearly',
            durationMinutes: 18,
            summary: 'Understand symbols, scale, and direction in a calm step-by-step lesson.',
            objective: 'Identify the core parts of a simple map.',
            content:
              'Maps communicate information through symbols, labels, and scale. In this lesson, students learn how to read a map calmly and accurately, moving from simple landmarks to more detailed geographic ideas.',
            activities: [
              'Label the compass directions on a practice map.',
              'Match symbols to their meanings.',
            ],
          },
          {
            id: 'geography-maps-lesson-2',
            title: 'Places, regions, and people',
            durationMinutes: 16,
            summary: 'See how landscapes and communities connect across regions.',
            objective: 'Explain how geography influences everyday life.',
            content:
              'Different places shape how people travel, build homes, and use natural resources. This lesson helps students connect geography to the real experiences of communities and regions.',
            activities: [
              'Describe one way geography shapes transportation.',
              'Compare two different regions and their environments.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'math',
    title: 'Math',
    headline: 'Practice number sense and structured problem-solving with confidence.',
    description:
      'A focused math course that keeps learning clear and approachable, with strong pacing for learners who want practice without confusion.',
    category: 'STEM',
    level: COURSE_LEVELS.INTERMEDIATE,
    priceBirr: 1899,
    rating: 4.9,
    reviewsCount: 3094,
    learnerCount: 20110,
    durationLabel: '10 lessons · 4 weeks',
    thumbnail: mathImage,
    instructor: {
      name: 'Samuel Bekele',
      title: 'Mathematics Instructor',
    },
    outcomes: [
      'Break larger problems into smaller steps.',
      'Strengthen number sense and pattern recognition.',
      'Build confidence through guided math routines.',
    ],
    modules: [
      {
        id: 'math-reasoning',
        title: 'Reasoning with Numbers',
        description: 'A steady approach to patterns, logic, and multi-step solutions.',
        lessons: [
          {
            id: 'math-reasoning-lesson-1',
            title: 'Patterns that simplify thinking',
            durationMinutes: 19,
            summary: 'Use patterns and structure to reduce confusion when solving problems.',
            objective: 'Identify useful patterns in basic math problems.',
            content:
              'Patterns help learners recognize structure instead of memorizing isolated answers. This lesson introduces pattern recognition as a tool for clearer and faster reasoning.',
            activities: [
              'Continue a number pattern and explain your thinking.',
              'Circle repeated structures in a set of problems.',
            ],
          },
          {
            id: 'math-reasoning-lesson-2',
            title: 'From problem to solution',
            durationMinutes: 21,
            summary: 'Work through a calm problem-solving routine that students can reuse.',
            objective: 'Apply a repeatable method to multi-step problems.',
            content:
              'When students use the same reliable method each time, math feels less stressful. This lesson introduces a sequence of understanding, planning, solving, and reviewing.',
            activities: [
              'Solve a multi-step problem using the full routine.',
              'Write one sentence about how the routine helped.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'biology',
    title: 'Biology',
    headline: 'Explore living systems through accessible science and observation.',
    description:
      'An engaging biology track for learners who want approachable science content supported by visuals, examples, and guided explanation.',
    category: 'Science',
    level: COURSE_LEVELS.INTERMEDIATE,
    priceBirr: 1799,
    rating: 4.8,
    reviewsCount: 1984,
    learnerCount: 13720,
    durationLabel: '7 lessons · 3 weeks',
    thumbnail: biologyImage,
    instructor: {
      name: 'Lidiya Wondimu',
      title: 'Biology Teacher',
    },
    outcomes: [
      'Understand the basics of living systems.',
      'Observe and describe science examples more clearly.',
      'Connect biology concepts to daily life and environment.',
    ],
    modules: [
      {
        id: 'biology-life',
        title: 'Life and Living Systems',
        description: 'Start with cells, systems, and how living things function.',
        lessons: [
          {
            id: 'biology-life-lesson-1',
            title: 'What makes something alive?',
            durationMinutes: 16,
            summary: 'Explore the core traits that define living organisms.',
            objective: 'Describe the characteristics of living things.',
            content:
              'Biology begins with careful observation. In this lesson, students look at what living things need, how they grow, and what patterns help us classify them.',
            activities: [
              'List three characteristics of living things.',
              'Compare a plant and an animal using those traits.',
            ],
          },
          {
            id: 'biology-life-lesson-2',
            title: 'Systems working together',
            durationMinutes: 18,
            summary: 'Understand how parts of the body and environment depend on one another.',
            objective: 'Explain how systems support life through cooperation.',
            content:
              'Living systems are strongest when students see the connections between parts. This lesson introduces major systems and shows how they cooperate to support life and health.',
            activities: [
              'Draw a simple system diagram.',
              'Explain one connection between two living systems.',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sport-teamwork',
    title: 'Sport & Teamwork',
    headline: 'Connect movement, discipline, and collaboration in a practical course.',
    description:
      'A learner-friendly course about teamwork, healthy habits, and the discipline required to grow through sport and group activity.',
    category: 'Wellbeing',
    level: COURSE_LEVELS.BEGINNER,
    priceBirr: 1399,
    rating: 4.6,
    reviewsCount: 1210,
    learnerCount: 8840,
    durationLabel: '5 lessons · 2 weeks',
    thumbnail: soccerImage,
    instructor: {
      name: 'Bereket Nega',
      title: 'Youth Sports Mentor',
    },
    outcomes: [
      'Understand the value of teamwork.',
      'Connect movement to wellbeing and confidence.',
      'Practice discipline in group settings.',
    ],
    modules: [
      {
        id: 'sport-basics',
        title: 'Movement and Team Culture',
        description: 'Build teamwork habits that help students grow on and off the field.',
        lessons: [
          {
            id: 'sport-basics-lesson-1',
            title: 'Why teamwork matters',
            durationMinutes: 13,
            summary: 'See how communication and shared effort improve performance.',
            objective: 'Explain why teamwork improves learning and sport.',
            content:
              'Sport teaches more than movement. It shows students how communication, patience, and support strengthen the whole group. This lesson frames teamwork as a life skill, not only a game skill.',
            activities: [
              'Describe one strong teamwork moment you have seen.',
              'Write one habit that helps a group work better together.',
            ],
          },
          {
            id: 'sport-basics-lesson-2',
            title: 'Discipline and routine',
            durationMinutes: 15,
            summary: 'Create routines that support healthy participation and steady progress.',
            objective: 'Identify routines that improve focus and discipline.',
            content:
              'Discipline becomes easier when learners can see what routines actually help. This lesson focuses on consistency, preparation, and respect for team goals and shared effort.',
            activities: [
              'Plan a simple weekly practice routine.',
              'Choose one discipline habit to improve this week.',
            ],
          },
        ],
      },
    ],
  },
]
