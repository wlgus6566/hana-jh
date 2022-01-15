<template>
  <div class="no-data-wrap">
    <i class="icon-no-data">노데이터</i>
    <p>‘텍스트’ 에 대한 검색 결과가 없습니다.</p>
  </div>
</template>

<script>
export default {
  name: "no-data"
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