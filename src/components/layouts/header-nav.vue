<template>
  <header>
    <router-link class="btn-md-primary" to="/qna">Q&A 게시판</router-link>
    <router-link class="btn-md-primary" to="/insurance">보험사목록</router-link>
    <router-link class="btn-md-primary" to="/signup">회원가입</router-link>
  </header>
</template>

<script>
export default {
  name: "header-nav",
};
</script>

<style lang="scss" scoped>
header {
  padding: 30px;
  a {
    + a {
      margin-left: 10px;
    }
  }
}
</style>
