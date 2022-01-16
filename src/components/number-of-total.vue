<template>
  <div class="number-wrap">
    <strong class="num">
      <em>10</em>건
    </strong>
    <strong class="num total">
      전체<em>10</em>건
    </strong>
  </div>
</template>

<script>
export default {
  name: "numberOfTotal"
}
</script>

<style lang="scss" scoped>
  .number-wrap {
    font-size: 14px;
    line-height: 20px;
    strong {
      font-weight: normal;
    }
    .total {
      position: relative;
      margin-left: 10px;
      padding-left: 11px;
      color: #888;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: 1px;
        height: 14px;
        margin-top: -7px;
        background: #eee;
      }
    }
  }
</style>