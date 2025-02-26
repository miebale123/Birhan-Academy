<template>
  <div class="flex gap-8 h-screen text-white">
    <div class="p-8 w-1/4">
      <div v-for="(item, index) in items" :key="item._id || index">
        <div v-for="value in item" :key="value">
          <div v-if="value === item.name">
            <button @click="showItem(index)">{{ value }}</button>
          </div>
          <div v-else></div>
        </div>
      </div>
    </div>

    <div class="p-8 bg-gray-500 w-full">
      <div v-if="items.length > 0">
        <div v-for="key in Object.keys(items[selectedIndex]).filter((k) => k !== '_id')" :key="key">
          {{ items[selectedIndex][key] }}
        </div>
      </div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import biology from '@/assets/biology.avif'
export default {
  data() {
    return {
      selectedIndex: 0,
      items: [],
      biology,
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:5000/items')
        this.items = response.data
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    },
    showItem(index) {
      this.selectedIndex = index
    },
  },
}
</script>
