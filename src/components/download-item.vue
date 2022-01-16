<template>
  <div class="download-wrap">
    <strong class="label">첨부파일</strong>
    <ul class="download-list">
      <li v-for="item in fileList" :key="item.id">
        <a :href="item.link" download>
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "download-item",
  props: {
    fileList: {
      type: [],
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
.download-wrap {
  display: block;
  margin-top: 30px;
  .label {
    display: block;
    color: $gray-70;
    font-weight: bold;
  }
  .download-list {
    display: flex;
    li {
      margin-top: 10px;
      a {
        display: inline-block;
        box-sizing: border-box;
        border-radius: 10px;
        padding: 12px 20px 12px 45px;
        background: $gray-20 url(../assets/images/ic-download-20.svg) 18px center no-repeat;
        text-align: left;
      }
      & + li {
        margin-left: 10px;
      }
    }
  }
}
</style>