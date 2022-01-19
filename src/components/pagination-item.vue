<template>
  <div class="pagination-wrap" v-if="total !== 0">
    <button
      type="button"
      class="paging-first"
      @click="activeUpdate(numList[0] - pageSize)"
      :disabled="numList[0] === 1"
    >
      이전페이지
    </button>
    <button
      type="button"
      class="paging-prev"
      @click="activeUpdate(activePage - 1)"
      :disabled="1 === this.activePage"
    >
      이전
    </button>
    <ul class="pagination-list">
      <li
        v-for="(item, key) in numList"
        :key="key"
        :class="{ active: activePage === item }"
      >
        <span v-if="activePage === item" class="number-item">
          {{ item }}
        </span>
        <button
          v-else
          type="button"
          class="number-item"
          @click="activeUpdate(item)"
        >
          {{ item }}
        </button>
      </li>
    </ul>
    <button
      type="button"
      class="paging-next"
      @click="activeUpdate(activePage + 1)"
      :disabled="activePage === totalPageSize"
    >
      다음
    </button>
    <button
      type="button"
      class="paging-last"
      @click="
        activeUpdate(Math.min(numList[numList.length - 1] + 1, totalPageSize))
      "
      :disabled="numList[numList.length - 1] === totalPageSize"
    >
      다음페이지
    </button>
  </div>
</template>
<script>
export default {
  name: "pagination-item",
  computed: {
    numList() {
      const test = Math.ceil(this.activePage / this.pageSize) * this.pageSize;
      let num = [];
      for (let i = test; i > test - this.pageSize; i--) {
        num.push(i);
      }
      num.reverse();
      if (num[num.length - 1] > this.totalPageSize) {
        const idx = num.findIndex((el) => el === this.totalPageSize + 1);
        num.splice(idx, num.length);
      }
      return num;
    },

    // 한페이지에 노출 될 페이지네이션 갯수
    pageSize() {
      return this.mobileYn ? 5 : 10;
    },
    // 페이지네이션 최대 갯수
    totalPageSize() {
      return Math.ceil(this.total / this.size);
    },
    activePage() {
      return parseInt(this.active);
    },
  },
  props: {
    size: { type: Number, default: 10 }, // 한페이지 노출 게시글 갯수
    total: { type: Number, required: true }, // 총 게시글 갯수
    active: { type: [Number, String], required: true, default: 1 }, // 현제 페이지
    name: { type: String, default: "page" },
  },
  model: {
    prop: "active",
    event: "activeChange",
  },
  watch: {
    "$route.query"(to, from) {
      if (from[this.name] !== to[this.name]) {
        console.log(to[this.name]);
        this.$emit("activeChange", to[this.name]);
        this.$emit("change");
        console.log("너타니");
      } else {
        this.$emit("activeChange", "1");
        this.$router
          .replace({ query: { ...this.$route.query, page: "1" } })
          .catch(() => {});
        this.$emit("change");
        console.log("아님너타니");
      }
    },
  },
  methods: {
    activeUpdate(num) {
      this.$router.push({ query: { ...this.$route.query, page: num } });
      this.$emit("activeChange", num);
    },
  },
  created() {
    const num = this.$route.query?.page || this.activePage;
    this.$emit("activeChange", num);
  },
};
</script>
<style scoped lang="scss">
.pagination-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  [class^="paging-"] {
    width: 20px;
    height: 20px;
    background: no-repeat center;
    text-indent: -999px;
    overflow: hidden;
    &:disabled {
      opacity: 0.5;
      &[class*="-first"] {
        background-image: url(../assets/images/ic-backend-20-gr.svg);
      }
      &[class*="-prev"] {
        background-image: url(../assets/images/ic-back-20-gr.svg);
      }
      &[class*="-next"] {
        background-image: url(../assets/images/ic-next-20-gr.svg);
      }
      &[class*="-last"] {
        background-image: url(../assets/images/ic-nextend-20-gr.svg);
      }
    }
    &[class*="-first"] {
      background-image: url(../assets/images/ic-backend-20.svg);
    }
    &[class*="-prev"] {
      margin-left: 15px;
      background-image: url(../assets/images/ic-back-20.svg);
    }
    &[class*="-next"] {
      margin-right: 15px;
      background-image: url(../assets/images/ic-next-20.svg);
    }
    &[class*="-last"] {
      background-image: url(../assets/images/ic-nextend-20.svg);
    }
  }
  .pagination-list {
    display: flex;
    margin: 0 15px;
    li {
      .number-item {
        display: inline-block;
        padding: 5px;
        font-size: 14px;
        line-height: 20px;
        color: $gray-50;
      }
      & + li {
        margin-left: 15px;
      }
      &.active {
        .number-item {
          color: $mint-60;
        }
      }
    }
  }
}
</style>
