<!-- eslint-disable vue/no-unused-components -->

<template>
  <div class="p-8">
    <!-- Input to Add New Content -->
     <h2>add content</h2>
    <div class="mt-3">
      <input v-model="newContent" class="border p-2" placeholder="Enter Content name" />

      <button @click="$emit(addContent, this.Contents)" class="ml-2 bg-blue-500 text-white px-4 py-2">Add</button>
    </div>

    <!-- Display Contents -->

    <ul class="mt-5">
      <h2>delete content</h2>
      <li v-for="Content in Contents" :key="Content._id" class="flex justify-between p-2 border">
        {{ Content.name }}
        <button @click="deleteContent(Content._id)" class="bg-red-500 text-white px-2 py-1">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      Contents: [],
      newContent: '',
    }
  },
  mounted() {
    this.fetchContents()
  },
  methods: {
    async fetchContents() {
      const response = await axios.get('http://localhost:5000/Contents')
      this.Contents = response.data
    },
    async addContent() {
      if (!this.newContent) return
      const response = await axios.post('http://localhost:5000/Contents', { name: this.newContent })
      this.Contents.push(response.data)
      this.newContent = ''
    },
    async deleteContent(id) {
      await axios.delete(`http://localhost:5000/Contents/${id}`)
      this.Contents = this.Contents.filter((Content) => Content._id !== id)
    },
    async updateContent() {
      try {
        const response = await axios.put(`/Contents/${this.ContentId}`, { name: this.newContentName }) // this.ContentId is ID of Content to be updated, this.newContentName is the new name
        console.log('Content updated:', response.data)
        // Update the Content in your Vue component's data
        const index = this.Contents.findIndex((Content) => Content._id === this.ContentId)
        if (index !== -1) {
          this.$set(this.Contents, index, response.data) // Important: Use $set for reactivity
        }
      } catch (error) {
        console.error('Error updating Content:', error)
      }
    },
  },
}
</script>
