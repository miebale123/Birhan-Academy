export const authCopy = {
  signIn: {
    title: 'Sign in',
    socialButtons: {
      google: 'Continue with Google',
      apple: 'Continue with Apple',
    },
    fields: {
      email: {
        label: 'Email',
        placeholder: 'you@example.com',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password',
      },
    },
    submitLabel: 'Sign in',
    submittingLabel: 'Signing in...',
    switchPrompt: 'Need an account?',
    switchAction: 'Create account',
  },
  signUp: {
    kicker: 'Create account',
    socialButtons: {
      google: 'Continue with Google',
      apple: 'Continue with Apple',
    },
    fields: {
      name: {
        label: 'Full name',
        placeholder: 'Abebe Kebede',
      },
      email: {
        label: 'Email',
        placeholder: 'you@example.com',
      },
      password: {
        label: 'Password',
        placeholder: 'At least 8 characters',
      },
      passwordHint: 'Use at least 8 characters.',
    },
    agreement: 'I agree to the terms and conditions.',
    submitLabel: 'Create account',
    submittingLabel: 'Creating account...',
    switchPrompt: 'Already have an account?',
    switchAction: 'Sign in',
  },
}

export const authFeedbackCopy = {
  signIn: {
    emailRequired: 'Please enter your email address.',
    passwordRequired: 'Please enter your password.',
    socialSigninComingSoon(provider) {
      return `${provider} sign in is coming soon.`
    },
  },
  signUp: {
    nameRequired: 'Please enter your full name.',
    emailRequired: 'Please enter your email address.',
    passwordTooShort: 'Your password should be at least 8 characters long.',
    agreementRequired: 'Please agree to the terms and conditions.',
    invalidEmail: 'Please enter a valid email address.',
    socialSignupComingSoon(provider) {
      return `${provider} sign up is coming soon.`
    },
  },
  service: {
    signupInvalid: 'Please complete all required fields before continuing.',
    userExists: 'An account with this email already exists.',
    signinInvalid: 'Please enter your email and password.',
    authInvalid: 'Incorrect email or password.',
  },
}
