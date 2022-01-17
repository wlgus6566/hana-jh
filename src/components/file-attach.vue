<template>
  <div class="file-attach">
    <div class="label">파일 첨부</div>
    <div class="file-input">
      <div class="input">
        <span class="name">{{ fileName }}</span>
        <input
            ref="inputFileBtn"
            type="file"
            accept="image/*"
            @input="updateInput"
        />
      </div>
      <button class="btn-line-primary-md" @click="uploadFile()">파일첨부</button>
    </div>
    <ul class="bullet-list">
      <li class="bullet-txt">이미지 및 파일 첨부 10MB 이하로 최대 3까지 등록 가능합니다. (첨부 가능한 형식 : JPG, PNG, PPT, HWP, PDF, EXCEL)</li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "file-attach",
  data() {
    return {
      fileName: '',
    }
  },
  methods: {
    updateInput(e) {
      console.log(e);
      this.fileName = e.target.files[0].name;
      this.$emit('input', e.target.files[0]);
    },
    uploadFile() {
      this.$refs.inputFileBtn.click();
    }
  },
}
</script>

<style lang="scss" scoped>
.file-attach {
  margin-top: 30px;
  .label {
    color: $gray-70;
    font-weight: bold;
  }
  .file-input{
    display: flex;
    align-items: center;
    margin-top: 10px;
    .input{
      position: relative;
      width: 230px;
      height: 44px;
      line-height: 44px;
      letter-spacing: -0.5px;
      padding: 0 15px;
      border-radius: 10px;
      border: 1px solid $gray-40;
      background-color: $gray-20;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }
    .btn-line-primary-md {
      margin-left: 10px;
    }
  }
}
</style>