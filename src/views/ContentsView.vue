<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item._id }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:5000/items');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }

  }
};
</script>
