<template>
  <div>
    <div class="container">
      <div class="inner">
        <title-wrap />
        <search-form :detailExist="false" @submit="getInsuranceList">
          <template #rows>
            <div class="row">
              <strong class="label">내용</strong>
              <input-text
                v-model="inputContent.value"
                :placeholder="inputContent.placeholder"
                name="keyword"
              />
            </div>
          </template>
        </search-form>
        <div class="table-wrap">
          <div class="table-top">
            <tab-list
              :tabList="tabList.list"
              name="sort"
              v-model="tabList.active"
              @change="getInsuranceList"
            />
            <div class="right">
              <number-of-total
                :currentNum="boardContent.length"
                :totalNum="paginationInfo.total"
              />
              <input-select
                type="sort"
                :selectOptions="sortSelect.options"
                v-model="sortSelect.value"
              />
            </div>
          </div>
          <board-table v-if="boardContent.length > 0">
            <template #colgroup>
              <col style="width: 130px" />
              <col style="width: 100px" />
              <col />
              <col />
              <col />
              <col />
              <col style="width: 120px" />
              <col style="width: 120px" />
            </template>
            <template #thead>
              <tr>
                <th v-for="(value, idx) in boardHead" :key="idx">
                  {{ value }}
                </th>
              </tr>
            </template>
            <template #tbody>
              <tr v-for="(item, idx) in boardContent" :key="idx">
                <td>
                  <div class="logo-img">
                    <img :src="item.ciPth" :alt="item.name" />
                  </div>
                </td>
                <td>
                  {{ item.lpicDvCd }}
                </td>
                <td>
                  {{ item.inscoNm }}
                </td>
                <td>
                  {{ item.rpsTlno }}
                </td>
                <td>
                  {{ item.helpDskTlno }}
                </td>
                <td>
                  {{ item.itDskTlno }}
                </td>
                <td>
                  <a :href="item.sbscDsgPth" target="_blank" class="btn-sub-sm">
                    가입설계
                  </a>
                </td>
                <td>
                  <a
                    :href="item.hmpgPth"
                    target="_blank"
                    class="btn-line-gray-sm"
                  >
                    홈페이지
                  </a>
                </td>
              </tr>
            </template>
          </board-table>
          <no-data v-else noDataText="배정된 상담 문의가 아직 없습니다." />
          <pagination
            v-model="paginationInfo.page"
            :per-page="paginationInfo.size"
            :options="paginationInfo.options"
            :records="paginationInfo.total"
            @paginate="pageClick(paginationInfo.page)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInsuranceList } from "@/api";
import Pagination from "vue-pagination-2";
import TitleWrap from "@/components/title-wrap";
import InputSelect from "@/components/input-select";
import InputText from "@/components/input-text";
import TabList from "@/components/tab-list";
import NumberOfTotal from "@/components/number-of-total";
import BoardTable from "@/components/board-table";
import NoData from "@/components/no-data";
import SearchForm from "@/components/search-form";

export default {
  name: "qna-list",
  components: {
    SearchForm,
    Pagination,
    NoData,
    BoardTable,
    NumberOfTotal,
    TabList,
    InputText,
    InputSelect,
    TitleWrap,
  },
  data() {
    return {
      detailYn: false,
      paginationInfo: {
        page: 1,
        size: 3,
        list: [], // 백엔드에서 받은 글 목록
        total: 0, // 백엔드에서 받은 전체 글의 갯수
        options: {
          texts: { count: "" },
          chunk: 10, // pagination 의 max 페이지 수
        },
      },
      dateSelect: {
        options: [
          {
            value: "전체",
            label: "전체",
          },
          {
            value: "오늘",
            label: "오늘",
          },
          {
            value: "1주",
            label: "1주",
          },
          {
            value: "1달",
            label: "1달",
          },
          {
            value: "1년",
            label: "1년",
          },
          {
            value: "직접입력",
            label: "직접입력",
          },
        ],
        value: "전체",
      },
      inputDate: {
        value: "",
        disabled: true,
      },
      inputContent: {
        value: "",
        placeholder: "검색어를 입력해주세요.",
      },
      tabList: {
        active: 1,
        list: [
          {
            title: "전체",
            id: 1,
          },
          {
            title: "생보",
            id: 2,
          },
          {
            title: "손보",
            id: 3,
          },
        ],
      },
      sortSelect: {
        options: [
          {
            value: "최신순",
            label: "최신순",
          },
          {
            value: "마감순",
            label: "마감순",
          },
        ],
        value: "최신순",
      },
      boardHead: {
        logo: "로고",
        category: "보험구분",
        name: "보험사명",
        number: "대표번호",
        helpDesc: "헬프데스크",
        itDesc: "IT데스크",
        design: "가입설계",
        site: "홈페이지",
      },
      boardContent: [
        {
          ciPth: "http://placehold.it/75x20",
          lpicDvCd: "1",
          inscoNm: "하나손해보험",
          rpsTlno: "1588-5588",
          helpDskTlno: "070-1588-5580",
          itDskTlno: "070-1588-5580",
          sbscDsgPth: "http://www.google.com",
          hmpgPth: "http://www.google.com",
        },
      ],
      searchValue: "",
    };
  },
  created() {},
  mounted() {
    this.getInsuranceList();
  },
  methods: {
    pageClick(num) {
      this.$router.push({ query: { ...this.$route.query, page: num } });
      this.paginationInfo.page = num;
      this.getInsuranceList();
    },
    async getInsuranceList() {
      try {
        const response = await getInsuranceList({
          page: this.paginationInfo.page,
          size: this.paginationInfo.size,
          inscoNm: this.searchValue,
          lpicDvCd: this.tabList.active,
        });
        console.log("getInsuranceList", response);

        this.paginationInfo.total = response.data.totalElements;
        this.boardContent = await response.data.list;
      } catch (err) {
        console.log(err);
      } finally {
        console.log("getInsuranceList finally");
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
