<template>
  <div>
    <keep-alive include="qnaList, qnaDetail" :max="5">
        <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "qna",
};
</script>
<style lang="scss" scoped></style>
