<template>
  <div class="board-detail">
      <div class="status" v-if="boardInfo.state">
        <span v-if="boardInfo.state !== 'yet'"
              class="flag-sub-sm">
              답변 완료
        </span>
        <span v-else
              class="flag-orange-sm">
              답변 대기
        </span>
      </div>
      <div class="detail-title">
        <h3 class="title-h3">{{boardInfo.title}}</h3>
        <div class="detail-info">
          <span class="sort" v-if="boardInfo.sort">{{boardInfo.sort}}</span>
          <strong class="writer bar" v-if="boardInfo.sort">{{boardInfo.writer}}</strong>
          <span :class ="{
            date: true,
            bar: boardInfo.sort
          }" >
            {{boardInfo.date}}
          </span>
        </div>
      </div>
      <div class="detail-contents">
        <p class="contents" v-html="boardInfo.contents"/>
        <download-item
          :fileList = "boardInfo.files"
        />
      </div>
  </div>
</template>

<script>
import DownloadItem from "@/components/download-item";
export default {
  name: "board-detail",
  components: {DownloadItem},
  props: {
    boardInfo: {
      type: Object,
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
.board-detail   {
  .status {
    margin-top: 20px;
  }
  .detail-title {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .detail-info {
      .sort {
        color: $gray-60;
      }
      .writer {
        font-weight: normal;
      }
      .date {
        color: $gray-60;
      }
    }
  }
  .detail-contents {
    .contents {
      border-top: 1px solid $gray-30;
      border-bottom: 1px solid $gray-30;
      margin-top: 15px;
      padding: 30px 0;
    }
  }
}

</style>