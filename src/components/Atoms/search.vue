<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="relative">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleSearch"
      placeholder="Search courses..."
      class="w-80 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
    <ul
      v-if="showResults && filteredItems.length"
      class="absolute bg-white rounded-lg w-full mt-1 shadow-lg z-10"
    >
      <li
        v-for="(item, index) in filteredItems"
        :key="index"
        class="p-2 hover:bg-gray-100 cursor-pointer"
        @click="selectItem(item)"
      >
        {{ item }}
      </li>
    </ul>
    <div
      v-if="showResults && !filteredItems.length"
      class="absolute bg-white w-full mt-1 shadow-lg z-10 p-2 text-gray-500 text-center"
    >
      No results found.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchQuery: '',
      showResults: false,
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) =>
        item.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    },
  },
  methods: {
    handleSearch() {
      this.showResults = this.searchQuery.trim() !== ''
    },
    selectItem(item) {
      this.searchQuery = item
      this.showResults = false
      this.$emit('itemSelected', item) // Emit the selected item to the parent
    },
  },
}
</script>
