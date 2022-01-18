<template>
  <div>
    <div class="container">
      <div class="inner">
        <title-wrap />
        <div class="form-search-wrap">
          <div class="form-search">
            <div class="search-inner">
              <div class="row">
                <strong class="label">내용</strong>
                <input-text
                  v-model="inputContent.value"
                  :placeholder="inputContent.placeholder"
                />
              </div>
            </div>
            <button class="btn-md-primary">검색</button>
          </div>
        </div>
        <div class="table-wrap">
          <div class="table-top">
            <tab-list :tabList="tabList.list" v-model="tabList.active" />
            <div class="right">
              <number-of-total />
              <input-select
                type="sort"
                :selectOptions="sortSelect.options"
                v-model="sortSelect.value"
              />
            </div>
          </div>
          <board-table v-if="paginationInfo.length > 0">
            <template #colgroup>
              <col style="width: 72px" />
              <col style="width: 107px" />
              <col style="width: auto" />
              <col style="width: 102px" />
              <col style="width: 109px" />
              <col style="width: 101px" />
            </template>
            <template #thead>
              <tr>
                <th v-for="(value, idx) in boardHead" :key="idx">
                  {{ value }}
                </th>
              </tr>
            </template>
            <template #tbody>
              <tr v-for="(item, idx) in paginationInfo" :key="idx">
                <td>
                  {{ item.num }}
                </td>
                <td>
                  {{ item.category }}
                </td>
                <td class="content">
                  <div class="content-inner">
                    <span class="flag-primary-sm" v-if="item.impo">중요</span>
                    <router-link :to="`/qna/${item.num}`">
                      {{ item.content }}
                    </router-link>
                  </div>
                </td>
                <td>
                  {{ item.writer }}
                </td>
                <td>
                  {{ item.date }}
                </td>
                <td>
                  <span v-if="item.state === 'done'" class="flag-sub-sm">
                    답변 완료
                  </span>
                  <span v-else class="flag-orange-sm"> 답변 대기 </span>
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
import SearchDetailTxtBtn from "@/components/search-detail-txt-btn";
import InputText from "@/components/input-text";
import TabList from "@/components/tab-list";
import NumberOfTotal from "@/components/number-of-total";
import BoardTable from "@/components/board-table";
import NoData from "@/components/no-data";

export default {
  name: "qna-list",
  components: {
    Pagination,
    NoData,
    BoardTable,
    NumberOfTotal,
    TabList,
    InputText,
    SearchDetailTxtBtn,
    InputSelect,
    TitleWrap,
  },
  data() {
    return {
      paginationInfo: {
        page: 1,
        size: 5,
        list: [], // 백엔드에서 받은 글 목록
        total: 30, // 백엔드에서 받은 전체 글의 갯수
        options: {
          texts: { count: "" },
          chunk: 10, // pagination 의 max 페이지 수
        },
      },
      assortSelect: {
        options: [
          {
            value: "전체",
            label: "전체",
          },
          {
            value: "분야별 Q&A",
            label: "분야별 Q&A",
          },
          {
            value: "프로필 문의",
            label: "프로필 문의",
          },
        ],
        value: "전체",
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
            title: "답변대기",
            id: 2,
          },
          {
            title: "답변완료",
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
        num: "번호",
        category: "문의유형",
        content: "내용",
        writer: "문의고객",
        date: "작성일",
        state: "상태",
      },
      boardContent: [
        {
          impo: true,
          num: "10",
          category: "분야별 Q&A",
          content: "관절에 무리가 안되면서 다이어트에 좋은 운동 문의",
          writer: "김모션",
          date: "2022.01.01",
          state: "done",
        },
        {
          num: "9",
          category: "프로필 문의",
          content:
            "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
          writer: "김모션",
          date: "2021.11.30",
          state: "standby",
        },
        {
          impo: true,
          num: "8",
          category: "분야별 Q&A",
          content: "일이삼사오육칠팔구십",
          writer: "김모션",
          date: "2022.01.01",
          state: "done",
        },
        {
          num: "7",
          category: "프로필 문의",
          content: "거북목 교정에 좋은 필라테스 자세",
          writer: "김모션",
          date: "2021.11.30",
          state: "standby",
        },
        {
          num: "6",
          category: "분야별 Q&A",
          content: "손목 염좌 후 재활에 대해 문의드립니다.",
          writer: "김모션",
          date: "2022.01.01",
          state: "done",
        },
        {
          num: "5",
          category: "프로필 문의",
          content: "저번에 문의 드렸던 발목 수술 환자입니다.",
          writer: "김모션",
          date: "2021.11.30",
          state: "standby",
        },
        {
          num: "4",
          category: "분야별 Q&A",
          content: "일이삼사오육칠팔구십",
          writer: "김모션",
          date: "2022.01.01",
          state: "done",
        },
        {
          num: "3",
          category: "프로필 문의",
          content:
            "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
          writer: "김모션",
          date: "2021.11.30",
          state: "standby",
        },
        {
          num: "2",
          category: "분야별 Q&A",
          content:
            "목디스크 이후 재활운동 문의 목디스크 이후 재활운동 문의 목디스크 이후목디스크 이후 재활운동 문의 목디스크 이후 재활운동 문의 목디스크 이후",
          writer: "김모션",
          date: "2022.01.01",
          state: "done",
        },
        {
          num: "1",
          category: "프로필 문의",
          content: "관절에 무리가 안되면서 다이어트에 좋은 운동 문의",
          writer: "김모션",
          date: "2021.11.30",
          state: "standby",
        },
      ],
    };
  },
  created() {
    this.getInsuranceList();
  },
  watch: {
    "paginationInfo.page"() {
      this.getInsuranceList();
    },
    /*    'paginationInfo.sort'() {
      this.paginationInfo.page = 1;
      this.getInsuranceList()
    },*/
  },
  methods: {
    async getInsuranceList() {
      try {
        const response = await getInsuranceList({
          page: this.paginationInfo.page,
          size: this.paginationInfo.size,
        });
        console.log("getInsuranceList", response);
        this.paginationInfo.list = response.list;
        this.paginationInfo.total = response.totalElements;
      } catch (e) {
        console.log("getInsuranceList", e);
      } finally {
        console.log("getInsuranceList finally");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.table-top {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .right {
    display: flex;
    align-items: center;
    .select-wrap {
      margin-left: 20px;
    }
  }
}
</style>
