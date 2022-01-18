<template>
  <div class="search-detail">
    <span @click="toggleDetailYn(detailYn)">
      상세검색
      <i
        :class="{
          'ic-search-detail': !detailYn,
          'ic-ex': detailYn,
        }"
      >
      </i>
    </span>
  </div>
</template>

<script>
export default {
  name: "search-detail-txt-btn",
  props: {
    detailYn: Boolean,
  },
  methods: {
    toggleDetailYn(detailYn) {
      this.$emit("update:toggle", !detailYn);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-detail {
  display: flex;
  justify-content: flex-end;
  span {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
