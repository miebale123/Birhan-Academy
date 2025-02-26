<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div>
    <form @submit.prevent="$emit('add', newnote)">
      <input type="text" v-model="newnote" />
      <button type="submit" class="bg-gray-500 rounded">add note</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newnote: '',
    }
  },
}
</script>
