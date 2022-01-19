<template>
  <div class="number-wrap">
    <strong class="num">
      <em>{{ currentNum }}</em
      >건
    </strong>
    <strong class="num total bar">
      전체<em>{{ totalNum }}</em
      >건
    </strong>
  </div>
</template>

<script>
export default {
  name: "numberOfTotal",
  props: {
    currentNum: {
      type: Number,
      default: 0,
    },
    totalNum: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
.number-wrap {
  font-size: 14px;
  line-height: 20px;
  strong {
    font-weight: normal;
  }
  .total {
    color: #888;
  }
}
</style>
