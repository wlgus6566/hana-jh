<template>
  <div class="no-data-wrap">
    <i class="icon-no-data">노데이터</i>
    <p v-html="noDataText" ></p>
  </div>
</template>

<script>
export default {
  name: "no-data",
  props: {
    noDataText: {
      type: String,
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
  .no-data-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 0;
  }
</style>