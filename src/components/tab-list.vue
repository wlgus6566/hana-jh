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
      this.tabList.some(
        (el) => el.id === parseInt(this.$route.query[this.name])
      )
    ) {
      let num = parseInt(this.$route.query[this.name]);
      this.$emit("activeChange", num || this.list[0].id);
    }
  },
  watch: {
    "$route.query"(to, from) {
      if (from[this.name] !== to[this.name]) {
        this.$emit("activeChange", parseInt(to[this.name]) || this.list[0].id);
        //this.$emit("change");
      }
    },
  },
  methods: {
    tabClick(id) {
      if (id === this.$route.query[this.name]) return;
      this.$router
        .push({
          query: { ...this.$route.query, [this.name]: id },
        })
        .catch(() => {});
      this.$emit("activeChange", id);
      console.log(id);
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
