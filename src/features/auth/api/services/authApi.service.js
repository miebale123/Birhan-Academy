import { authFeedbackCopy } from '@/features/auth/constants/authCopy'

const STORAGE_KEY = 'birhan-academy.mock-users'
const CURRENT_USER_KEY = 'birhan-academy.current-user'
const AUTH_USER_CHANGED_EVENT = 'birhan-academy:auth-user-changed'

function wait(durationMs) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, durationMs)
  })
}

async function simulateMockRequest(factory, durationMs = 420) {
  await wait(durationMs)
  return factory()
}

function createAuthError(message, code) {
  const error = new Error(message)
  error.code = code
  return error
}

function normalizeEmail(email = '') {
  return email.trim().toLowerCase()
}

function readUsers() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawUsers = window.localStorage.getItem(STORAGE_KEY)
    return rawUsers ? JSON.parse(rawUsers) : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

function sanitizeUser(user) {
  if (!user) {
    return null
  }

  const safeUser = { ...user }
  delete safeUser.password
  return safeUser
}

function readCurrentUser() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const rawUser = window.localStorage.getItem(CURRENT_USER_KEY)
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    return null
  }
}

function emitAuthUserChanged(user) {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(
    new CustomEvent(AUTH_USER_CHANGED_EVENT, {
      detail: user,
    }),
  )
}

function writeCurrentUser(user) {
  if (typeof window === 'undefined') {
    return
  }

  const safeUser = sanitizeUser(user)
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser))
  emitAuthUserChanged(safeUser)
}

function createMockUser(userDto) {
  return {
    id: `usr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    name: userDto.name.trim(),
    email: normalizeEmail(userDto.email),
    password: userDto.password,
    userType: userDto.userType ?? 'student',
    createdAt: new Date().toISOString(),
  }
}

export const authApiService = {
  async signUp(userDto) {
    return simulateMockRequest(() => {
      const name = userDto.name?.trim()
      const email = normalizeEmail(userDto.email)
      const password = userDto.password ?? ''

      if (!name || !email || !password) {
        throw createAuthError(authFeedbackCopy.service.signupInvalid, 'SIGNUP_INVALID')
      }

      const users = readUsers()
      const existingUser = users.find((user) => normalizeEmail(user.email) === email)

      if (existingUser) {
        throw createAuthError(authFeedbackCopy.service.userExists, 'USER_EXISTS')
      }

      const nextUser = createMockUser(userDto)
      writeUsers([...users, nextUser])
      writeCurrentUser(nextUser)
      return sanitizeUser(nextUser)
    })
  },

  async signIn(credentials) {
    return simulateMockRequest(() => {
      const email = normalizeEmail(credentials.email)
      const password = credentials.password ?? ''

      if (!email || !password) {
        throw createAuthError(authFeedbackCopy.service.signinInvalid, 'SIGNIN_INVALID')
      }

      const user = readUsers().find((item) => normalizeEmail(item.email) === email)

      if (!user || user.password !== password) {
        throw createAuthError(authFeedbackCopy.service.authInvalid, 'AUTH_INVALID')
      }

      writeCurrentUser(user)
      return sanitizeUser(user)
    }, 320)
  },

  async listUsers() {
    return simulateMockRequest(() => readUsers().map((user) => sanitizeUser(user)), 180)
  },

  signOut() {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.removeItem(CURRENT_USER_KEY)
    emitAuthUserChanged(null)
  },

  getCurrentUser() {
    return readCurrentUser()
  },

  getAuthUserChangedEventName() {
    return AUTH_USER_CHANGED_EVENT
  },
}
