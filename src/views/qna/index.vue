<template>
  <div>
    <title-wrap/>
    <div class="search-detail">
      <span>
        상세검색
        <i
          :class="{
              'ic-search-detail': detailYs,
              'ic-ex': !detailYs,
              }"
        >
        </i>
      </span>
    </div>
    <div class="search-wrap">
      <div class="inner">
        <div class="row">
          <div class="row-half">
            <strong class="label">구분</strong>
            <base-select
                v-model="assortSelect.value"
                :selectOptions="assortSelect.options"
                :disabled="assortSelect.disabled"
                :error="assortSelect.error"
            />
          </div>
          <div class="row-half">
            <strong class="label">문의일</strong>
            <base-select
                v-model="assortSelect.value"
                :selectOptions="assortSelect.options"
                :disabled="assortSelect.disabled"
                :error="assortSelect.error"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleWrap from "@/components/title-wrap";
import BaseSelect from "@/components/base-select";
export default {
  name: "qna-list",
  components: {BaseSelect, TitleWrap},
  data() {
    return {
      detailYs: false,
      assortSelect: {
        options: [
          {
            value: '전체',
            label: '전체',
          },
          {
            value: '분야별 Q&A',
            label: '분야별 Q&A',
          },
          {
            value: '프로필 문의',
            label: '프로필 문의',
          },
        ],
        value: '전체',
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.search-detail {
  display: flex;
  justify-content: flex-end;
}
</style>