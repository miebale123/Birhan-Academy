<template>
  <div class="flex h-screen text-white items-center justify-center">
    <img
      src="../assets/reading.avif"
      alt="reading"
      class="rounded-xl w-[400px] h-[600px] ml-40"
    />

    <div class="flex items-center justify-center w-1/2">
      <div class="w-1/2 max-w-md p-6 rounded-lg bg-blue-900">
        <h2 class="text-2xl font-bold text-center mb-6">Sign up</h2>
        <form @submit.prevent="handleSignup" class="space-y-4">
          <label for="name" class="">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="infoData.name"
            required
            class="w-full mt-1 p-2 border rounded-lg"
          />
          <label for="email" class="">Email</label>
          <input
            type="email"
            id="email"
            v-model="infoData.email"
            required
            class="w-full mt-1 p-2 border rounded-lg"
          />
          <label for="password" class="">Password</label>
          <input
            type="password"
            id="password"
            v-model="infoData.password"
            required
            class="w-full mt-1 p-2 border rounded-lg"
          />
          <label for="passwordConfirm" class="">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            v-model="infoData.passwordConfirm"
            required
            class="w-full mt-1 p-2 border rounded-lg"
          />
          <div class="flex items-center">
            <input
              type="checkbox"
              id="agreement"
              v-model="agreement"
              required
              class="mr-2 rounded"
            />
            <label for="agreement" class="">I agree to the terms and conditions.</label>
          </div>
          <button type="submit" class="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700">
            Sign up
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import family from '../assets/family.bmp'
export default {
  data() {
    return {
      family,
      infoData: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
      agreement: false,
    }
  },
  methods: {
    async handleSignup() {
      if (!this.agreement) {
        alert('Please agree to the terms and conditions.')
        return
      }
      if (this.infoData.password !== this.infoData.passwordConfirm) {
        alert('Passwords do not match.')
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.infoData.email)) {
        alert('Please enter a valid email address.')
        return
      }
      const userData = { ...this.infoData, userType: 'freelancer' }
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        })
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message || `HTTP error! status: ${response.status}`)
        }
        alert('Freelancer registered successfully!')
        this.infoData = { name: '', email: '', password: '', passwordConfirm: '' }
        this.agreement = false
      } catch (error) {
        console.error('Registration error:', error)
        alert(`Error: ${error.message}`)
      }
    },
  },
}
</script>
<style scoped>
input {
  color: black;
}
</style>
