<template>
  <div class="container">
    <div class="inner">
      <div class="answer-wrap">
        <board-detail :boardInfo="boardInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
import BoardDetail from "./board-detail";
export default {
  name: "board-answer",
  components: {BoardDetail},
  props: {
    boardInfo: {
      type: Object
    },
  },
}
</script>

<style lang="scss" scoped>
.answer-wrap {
  position: relative;
  padding: 40px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 20px;
  box-shadow: 5px 5px 15px -5px rgb(0 0 0 / 5%);
  &::before {
    content: "";
    position: absolute;
    top: -80px;
    right: 20px;
    width: 100px;
    height: 80px;
    z-index: 1;
    background: url(../assets/images/t-image-img-review-character-100@2x.png) center center/100% no-repeat;
  }
}
</style>