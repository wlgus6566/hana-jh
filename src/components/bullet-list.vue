<template>
  <ul class="bullet-list">
    <li
      class="bullet-txt"
      v-for="(list, idx) in lists"
      :key="idx"
      v-html="list"
    ></li>
  </ul>
</template>

<script>
export default {
  name: "bullet-list",
  props: {
    lists: {
      type: Array,
    },
  },
};
</script>

<style scoped></style>
