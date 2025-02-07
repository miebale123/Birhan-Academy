<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" id="name" v-model="infoData.name" required
                 class="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="infoData.email" required
                 class="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200" />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="infoData.password" required
                 class="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200" />
        </div>
        <div>
          <label for="passwordConfirm" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" id="passwordConfirm" v-model="infoData.passwordConfirm" required
                 class="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200" />
        </div>
        <div class="flex items-center">
          <input type="checkbox" id="agreement" v-model="agreement" required
                 class="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200" />
          <label for="agreement" class="text-sm text-gray-700">I agree to the terms and conditions.</label>
        </div>
        <button type="submit"
                class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-200">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoData: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      agreement: false,
    };
  },
  methods: {
    async handleRegister() {
      if (!this.agreement) {
        alert("Please agree to the terms and conditions.");
        return;
      }
      if (this.infoData.password !== this.infoData.passwordConfirm) {
        alert("Passwords do not match.");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.infoData.email)) {
        alert("Please enter a valid email address.");
        return;
      }
      const userData = { ...this.infoData, userType: "freelancer" };
      try {
        const response = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }
        alert("Freelancer registered successfully!");
        this.infoData = { name: "", email: "", password: "", passwordConfirm: "" };
        this.agreement = false;
      } catch (error) {
        console.error("Registration error:", error);
        alert(`Error: ${error.message}`);
      }
    },
  },
};
</script>
