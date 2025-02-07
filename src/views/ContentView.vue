<!-- eslint-disable vue/multi-word-component-names -->
<!--
<template>
  <div class="flex flex-col md:flex-row h-screen">
    <assignmentList :assignments="inProgress" />

    <div class="w-full md:w-1/2 bg-gray-100 shadow-md overflow-y-auto">
      <assignmentList @showdata="assignments.map(a => a.data)"/>
    </div>

    <assignmentList :assignments="completed" />
  </div>

</template>

<script>
// import aAssignmentCreate from './AssignmentCreate.vue'
import assignmentList from '../components/Atoms/content.vue'

export default {
  components: { assignmentList },
  data() {
    return {
      assignments: [
      { name: 'assignment one', complete: false, id: 1, tag: 'science', data: 'content one' },
      { name: 'assignment two', complete: false, id: 2, tag: 'math', data: 'content two' },
      { name: 'assignment three', complete: false, id: 3, tag: 'science', data: 'content three' },
      ],
    }
  },
  computed: {
    inProgress() {
      return this.assignments.filter((a) => a.complete === false)
    },
    completed() {
      return this.assignments.filter((a) => a.complete === true)
    },
  },

}
</script>

-->
 <template>
  <TeachersView @addContent="addContent" />
</template>

<script>
export default {
  methods: {
    addContent(name) {
      this.outline.push({
        name: name,
        id: this.outline.length + 1,
        completed: false,
      })
    },
  },
}
</script>
