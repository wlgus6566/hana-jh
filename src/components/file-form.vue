<template>
  <div
  :class="{
      'file-form':true,
  }">
    <file-attach @input="getFile"/>
    <ul class="attached-list">
      <li v-for="file in files" :key="file.id">
        <span class="name">{{ files.name }}</span>
        <button class="delete-button">파일삭제</button>
      </li>
    </ul>
  </div>
</template>

<script>
import FileAttach from "./file-attach";
export default {
  name: "file-form",
  components: {FileAttach},
  props: {
    files: [],
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    getFile(file) {
      this.fileList.push(file);
      this.$emit('changeFile', this.fileList);
    }
  },
  model: {
    prop:'files',
    event: 'changeFile'
  }
}
</script>

<style lang="scss" scoped>
.attached-list {
  margin-top: 22px;
  li {
    display: flex;
    align-items: flex-start;
    .name {
    }
    .delete-button {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-left: 5px;
      background: url(../../src/assets/images/ic-delete-24.svg) no-repeat center;
      text-indent: -9999px;
      font-size: 0;
    }
    & + li {
      margin-top: 14px;
    }
  }
}
</style>