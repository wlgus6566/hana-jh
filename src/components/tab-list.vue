<template>
  <ul class="tab-wrap">
    <li
      v-for="(item, key) in tabList"
      :key="key"
      :class="{
        active: active === item.id,
      }"
    >
      <button @click="tabClick(item.id)">
        <span v-html="item.title" />
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tab-list",
  props: {
    tabList: Array,
    name: {
      type: String,
      default: "tab",
    },
    active: [String, Number],
  },
  created() {
    if (
      this.tabList.some((el) => el.id === this.$route.query[this.name])) {
      let num = this.$route.query[this.name];
      console.log('created activechange')
      this.$emit("activeChange", num || this.tabList[0].id);
    }
  },
  watch: {
    "$route.query"(to, from) {
      if (from[this.name] !== to[this.name]) {
        this.$emit("update:page", 1);
        this.$emit("change");
      }
    },
    active(to, from) {
      console.log("active event");
      if (from !== to) {
        this.$router
          .push({
            query: { ...this.$route.query, [this.name]: to },
          })
          .catch(() => {});
      }
    },
  },
  methods: {
    tabClick(id) {
      console.log("tabEvent");
      this.$emit("activeChange", id);
    },
  },
  model: {
    prop: "active",
    event: "activeChange",
  },
};
</script>

<style lang="scss" scoped>
.tab-wrap {
  display: flex;
  li {
    button {
      font-size: 14px;
      line-height: 20px;
      padding: 12px 0;
      color: $gray-60;
    }
    & + li {
      margin-left: 25px;
    }
    &.active {
      button {
        color: $mint-60;
        font-weight: bold;
      }
    }
  }
}
</style>
