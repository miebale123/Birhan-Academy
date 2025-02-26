<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex gap-16 p-16 h-screen ">
    <create @add="add" class="mt-2" />
    <Note :notes="inProgress" title="in progress" />
    <Note :notes="completed" title="completed" />
  </div>
</template>

<script>
import Note from '../components/Atoms/Note.vue'
import create from '@/components/Atoms/create.vue'
export default {
  components: { Note, create },
  data() {
    return {
      notes: [
        { name: 'chemistry', complete: false, tag: 'chemistry', id: 1 },
        { name: 'biology', complete: false, tag: 'biology', id: 1 },
        { name: 'geography', complete: false, tag: 'geography', id: 1 },
        { name: 'maths', complete: false, tag: 'maths', id: 1 },
      ],
    }
  },
  computed: {
    inProgress() {
      return this.notes.filter((a) => a.complete === false)
    },
    completed() {
      return this.notes.filter((a) => a.complete === true)
    },
  },

  methods: {
    add(name) {
      this.notes.push({
        name: name,
        complete: false,
        id: this.notes.length + 1,
        tag: name
      })
    },
  },
}
</script>
