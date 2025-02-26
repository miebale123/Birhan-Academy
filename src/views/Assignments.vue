<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex gap-16">
    <AssignmentListC :assignments="inProgress" title="in progress" />
    <AssignmentListC :assignments="completed" title="completed" />
    <aAssignmentCreate @add="add" class="mt-2 "/>
  </div>
</template>

<script>
import aAssignmentCreate from './.vue'
import AssignmentListC from './AssignmentList.vue'

export default {
  components: { AssignmentListC, aAssignmentCreate },
  data() {
    return {
      assignments: [
        { name: 'assignment one', complete: false, id: 1, tag: 'science' },
        { name: 'assignment two', complete: false, id: 2, tag: 'math' },
        { name: 'assignment three', complete: false, id: 3, tag: 'science' },
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

  methods: {
    add(name) {
      this.assignments.push({
        name: name,
        complete: false,
        id: this.assignments.length + 1,
      })
    },
  },
}
</script>
