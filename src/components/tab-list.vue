<template>
  <ul class="tab-wrap">
    <li
        v-for="(item, idx) in tabList"
        :key="idx"
        :class="{
          active: value === item.id
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
    tabList: {
      type: Array,
    },
    value : [String, Number]
  },
  methods: {
    tabClick(id) {
      console.log(id)
      this.$emit('active', id);
    }
  },
  model : {
    prop : 'value',
    event : 'active'
  },
}
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