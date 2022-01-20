<template>
  <div>
    <div class="container">
      <div class="inner">
        <title-wrap />
        <search-form :detailExist="false" @change="getInsuranceList">
          <template #rows>
            <div class="row">
              <strong class="label">내용</strong>
              <input-text
                v-model="searchValue"
                :placeholder="inputContent.placeholder"
                name="keyword"
              />
            </div>
          </template>
        </search-form>
        <div class="table-wrap">
          <div class="table-top">
            <tab-list
              name="sort"
              :tabList="tabList.list"
              v-model="tabList.active"
              @change="getInsuranceList"
            />
            <div class="right">
              <number-of-total
                :currentNum="paginationInfo.total"
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
          <paginationItem
            :total="paginationInfo.total"
            :active="paginationInfo.activePage"
            v-model="paginationInfo.activePage"
            :size="paginationInfo.size"
            @change="getInsuranceList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInsuranceList } from "@/api";
import TitleWrap from "@/components/title-wrap";
import InputSelect from "@/components/input-select";
import InputText from "@/components/input-text";
import TabList from "@/components/tab-list";
import NumberOfTotal from "@/components/number-of-total";
import BoardTable from "@/components/board-table";
import NoData from "@/components/no-data";
import SearchForm from "@/components/search-form";
import PaginationItem from "@/components/pagination-item";

export default {
  name: "qna-list",
  components: {
    PaginationItem,
    SearchForm,
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
        size: 3,
        total: 1,
        activePage: 1,
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
    async getInsuranceList() {
      try {
        const response = await getInsuranceList({
          page: this.paginationInfo.activePage,
          size: this.paginationInfo.size,
          inscoNm: this.searchValue,
          lpicDvCd: this.tabList.active,
        });
        console.log("getInsuranceList", response);

        this.paginationInfo.total = response.data.totalElements;
        this.boardContent = await response.data.list;
      } catch (err) {
        console.log(err);
        this.boardContent = [];
      } finally {
        console.log("getInsuranceList finally");
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
