<template>
  <div class="table-wrap">
    <table class="table">
      <colgroup>
        <slot name="colgroup" />
      </colgroup>
      <thead>
        <slot name="thead" />
      </thead>
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "board-table",
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  table-layout: fixed;
  border-bottom: 1px solid $gray-30;
  thead {
    th {
      padding: 15px 20px;
      background: $gray-20;
      border-top: 1px solid $gray-30;
      vertical-align: middle;
    }
  }
  tbody {
    td {
      padding: 15px 20px;
      text-align: center;
      border-top: 1px solid $gray-30;
      vertical-align: middle;
      .logo-img {
        height: 20px;
        img {
          width: auto;
          height: 100%;
        }
      }
      &.content {
        text-align: left;
        .content-inner {
          display: flex;
          align-items: center;
          a {
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
