<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section v-if="assignments.length" class="w-full md:w-1/4 bg-gray-400 shadow-md overflow-y-auto">
    <h2 class="font-bold">{{ title }}</h2>
    <div class="flex gap-2">
      <button
        v-for="tag in tags"
        :key="tag"
        class="border rounded-lg p-2 py-px"
        @click="currentTag = tag"
      >
        {{ tag }}
      </button>
    </div>
    <ul>
      <label>
        <li
          v-for="assignment in filteredAssignments"
          :key="assignment.id"
          class="flex items-center justify-center gap-6 pt-2"
        >
          {{ assignment.name }}
          <input type="checkbox" v-model="assignment.complete" />
        </li>
      </label>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentTag: 'all',
    }
  },
  props: {
    assignments: Array,
    title: String,
  },
  computed: {
    filteredAssignments() {
      if (this.currentTag === 'all') {
        return this.assignments
      }
      return this.assignments.filter((a) => a.tag === this.currentTag)
    },
    tags() {
      return ['all', ...new Set(this.assignments.map((a) => a.tag))]
    },
  },
}
</script>
