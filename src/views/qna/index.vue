<template>
  <div>
    <keep-alive :include="['qna-list', 'qna-detail']" :max="5">
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
