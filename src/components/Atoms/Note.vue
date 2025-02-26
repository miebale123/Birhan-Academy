<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section v-if="notes.length" class="bg-blue-200 p-4 w-[600px] rounded-lg">
    <h2 class="font-bold">{{ title }}</h2>

    <div class="flex gap-2">
      <button
        v-for="tag in tags"
        :key="tag"
        class="bg-green-200 rounded-lg p-2 py-px hover:bg-red-200"
        @click="currentTag = tag"
        :class="{'bg-red-200': currentTag === tag}"
      >
        {{ tag }}
      </button>
    </div>
    <ul>
      <label>
        <li
          v-for="note in filterednotes"
          :key="note.id"
          class="flex items-center justify-between"
        >
          {{ note.name }}
          <input type="checkbox" v-model="note.complete" />
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
    notes: Array,
    title: String,
  },
  computed: {
    filterednotes() {
      if (this.currentTag === 'all') {
        return this.notes
      }
      return this.notes.filter((a) => a.tag === this.currentTag)
    },
    tags() {
      return ['all', ...new Set(this.notes.map((a) => a.tag))]
    },
  },
}
</script>
