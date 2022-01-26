<template>
  <form class="form-search-wrap" @submit.prevent="searchSubmit" ref="form">
    <div class="search-detail">
      <button @click="toggleDetailYn(detailYn)" v-if="detailExist">
        상세검색
        <i
          :class="{
            'ic-search-detail': !detailYn,
            'ic-ex': detailYn,
          }"
        >
        </i>
      </button>
    </div>
    <div class="form-search">
      <div class="search-inner">
        <slot name="rows" />
      </div>
      <button type="submit" class="btn-md-primary">검색</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "search-form",
  data() {
    return {
      detailYn: {
        type: Boolean,
        default: false,
      },
    };
  },
  props: {
    detailExist: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleDetailYn() {
      this.detailYn = !this.detailYn;
    },
    queryMerge(route, obj) {
      const t = { ...route, ...obj };
      Object.entries(t).forEach(([key, value]) => {
        t[key] = value.trim();
        if (!t[key]) {
          delete t[key]; //공백일 경우 키의 값을 제거 keyword=""
        }
      });
      return t;
    },
    searchSubmit(e) {
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);
      const route = this.queryMerge(this.$route.query, formProps);
      this.$router.push({ query: { ...route } }).catch(() => {});
      this.$emit("change");//빈값일 경우 api 1,1로 호출
    },
  },
  mounted() {
    const formData = new FormData(this.$refs.form);
    // **  fromEntries : [['keyword', 'red'],['select', '2']] 를 {keyword: "red", select: "2"} 로
    const formProps = Object.fromEntries(formData);

    // ** Object.keys : 키값만 뽑아내서 배열로 만듦 {"keyword","page"}
    // this.$route.query ex) { keyword: '어쩌고검색', select: "2" }
    let difference = Object.keys(this.$route.query).filter(
      (
        key // router에 있는 query들의 key값과 form의 검색조건들의 교집합 만들기
      ) => Object.keys(formProps).includes(key)
    );
    difference.forEach((x) => {
      this.$refs.form[x].value = this.$route.query[x]; //라우터에 있는 value로 input값을 입력
      if (this.$refs.form[x].selectedIndex === -1) {
        //select하지 않았을 경우 옵션 첫번째로 검색
        this.$refs.form[x].value = this.$refs.form[x].options[0]._value;
      }
      const input = new Event("input");
      const change = new Event("change");
      this.$refs.form[x].dispatchEvent(input);
      this.$refs.form[x].dispatchEvent(change);
    });
  },
};
</script>

<style lang="scss" scoped></style>
