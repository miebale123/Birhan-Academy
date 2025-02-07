<template>
  <div>
    <form @submit.prevent="$emit('add', newcontent)">
      <input type="text" v-model="newcontent" />
      <button type="submit" class="bg-gray-500 rounded">add content</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newcontent: '',
    }
  },
}
</script>
