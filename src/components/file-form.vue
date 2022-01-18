<template>
  <div
  :class="{
      'file-form':true,
  }">
    <file-attach
        @input="updateFile"
    />
    <ul class="attached-list">
      <li v-for="file in files" :key="file.id">
        <span class="name">{{ file.name }}</span>
        <button class="delete-button" @click="deleteFile(file.id)">파일삭제</button>
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
    updateFile(file) {
      const idx = this.fileList.findIndex(el=>el.name===file.name);
      if (idx !== -1) {
        this.fileList.splice(idx, 1);
      } else {
        const fileInfo = {
          id: file.lastModified,
          name: file.name,
          link: file.webkitRelativePath
        };
        this.fileList.push(fileInfo);
      }
      this.$emit('inputFile', this.fileList);
    },
    deleteFile(idx) {
      const id = this.fileList.findIndex(list => list.id ===idx);
      this.fileList.splice(id,1);
      this.$emit('inputFile', this.fileList);

    }
  },
  model: {
    prop:'files',
    event: 'inputFile'
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
    & + li {
      margin-top: 14px;
    }
  }
}
</style>