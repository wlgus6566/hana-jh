<template>
  <div>
    <div class="container">
      <div class="inner">
        <title-wrap />
        <div class="form-search-wrap">
          <search-detail-txt-btn :detailYn="detailYn" :toggle.sync="detailYn" />
          <div class="form-search">
            <div class="search-inner">
              <div class="row" v-if="detailYn">
                <div class="row-half">
                  <strong class="label">구분</strong>
                  <input-select
                    v-model="assortSelect.value"
                    :selectOptions="assortSelect.options"
                    :disabled="assortSelect.disabled"
                    :maxWidth="false"
                  />
                </div>
                <div class="row-half">
                  <strong class="label">문의일</strong>
                  <input-select
                    v-model="dateSelect.value"
                    :selectOptions="dateSelect.options"
                    :disabled="dateSelect.disabled"
                    :maxWidth="true"
                  />
                  <input-text
                    v-model="inputDate.value"
                    :disabled="
                      inputDate.disabled && !(dateSelect.value === '직접입력')
                    "
                  />
                </div>
              </div>
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
          <board-table v-if="boardContent.length > 0">
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
              <tr v-for="(item, idx) in boardContent" :key="idx">
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
                    <i class="icon-new" v-if="NewFlag(item.date, 10)"></i>
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
          <pagination-item
              :total="paginationInfo.total"
              v-model="paginationInfo.page"
              :size = "paginationInfo.size"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleWrap from "@/components/title-wrap";
import InputSelect from "@/components/input-select";
import SearchDetailTxtBtn from "@/components/search-detail-txt-btn";
import InputText from "@/components/input-text";
import TabList from "@/components/tab-list";
import NumberOfTotal from "@/components/number-of-total";
import BoardTable from "@/components/board-table";
import NoData from "@/components/no-data";
import PaginationItem from "@/components/pagination-item";

export default {
  name: "qna-list",
  components: {
    PaginationItem,
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
        size: 3,
        total: 1,
        activePage: 1,
      },
      detailYn: false,
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
  methods: {
    NewFlag(regDay, num) {
      //regDay 날짜가 오늘 날짜에서 num 만큼 작으면 true
      const setDate = new Date(regDay);
      const now = new Date();
      const distance = now.getTime() - setDate.getTime();
      const day = Math.floor(distance / (1000 * 60 * 60 * 24));
      let state = false;
      if (day <= num) {
        state = true;
      }
      return state;
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
