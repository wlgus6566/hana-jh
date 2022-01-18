<template>
  <div>
    <div class="container">
      <div class="inner">
        <title-wrap/>
        <board-detail :boardInfo="question"/>
      </div>
    </div>
    <hr class="wide-gray">
    <template>
      <div class="container">
        <div class="inner">
          <template v-if="answer">
            <form action="#" @submit.prevent="submitAnswer">
              <h3 class="title-h3">핑글코치의 답변을 작성해주세요.</h3>
              <input-textarea
                  v-model="form.write.value"
                  :maxlength="form.write.maxlength"
                  :placeholder="form.write.placeholder"
                  :disabled="form.write.disabled"
              />
              <ul class="bullet-list">
                <li class="bullet-txt"> 최소 30자 ~ 최대 500자까지 입력해주세요.</li>
                <li class="bullet-txt"> 등록된 답변이 고객의 모바일 화면에서 노출되는 점을 고려하여
                  답변을 작성해주세요.</li>
              </ul>
              <file-form :files="form.write.files"
                         v-model="form.write.files"
              />
              <div class="area-btn">
                <button type="button" class="btn-line-gray-lg">
                  취소
                </button>
                <button type="submit" class="btn-primary-lg">저장</button>
              </div>
            </form>
          </template>
          <template v-else>
            <no-data
                noDataText='아직 등록된 답변이 없습니다. 답변을 등록해주세요.'
            />
            <div class="area-btn">
              <router-link to="/qna" class="btn-sub-lg">
                목록
              </router-link>
              <button type="button" class="btn-primary-lg">
                답변 등록
              </button>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template>
      <div class="answer-wrap bg-gray">
        <board-answer :boardInfo="answer"/>
        <div class="area-btn">
          <router-link to="/qna" class="btn-sub-lg">목록</router-link>
          <button type="button" class="btn-line-gray-lg">삭제</button>
          <button type="button" class="btn-primary-lg">수정</button>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import TitleWrap from "@/components/title-wrap";
import BoardDetail from "@/components/board-detail";
import InputTextarea from "@/components/input-textarea";
import FileForm from "../../components/file-form";
import BoardAnswer from "../../components/board-answer";
import NoData from "../../components/no-data";
export default {
  name: "qna-detail",
  components: {NoData, BoardAnswer, BoardDetail, FileForm, InputTextarea, TitleWrap},
  data() {
    return {
      writeForm: false, //핑글코치인지 아닌지 체크
      prevRoute: null,
      question: {
        state: 'yet',
        title: '만성질환관리 관련 질문입니다.',
        sort: '분야별 Q&A',
        writer: '김하나',
        date: '2021.11.30',
        contents:
            '평소에 마라톤을 즐겨하는데 발목과 무릎에 통증이 생겼습니다.<br/> 정형외과에 들러보니 인대에 염증이 생겼다고 하는데요. <br/> 이렇게 아픈게 한두번이 아니라서 마라톤 말고 다른 운동을 해보려고 합니다.<br/>  관절에 무리가 안되면서 다이어트에 좋은 운동이 있으면 추천해주세요.',
        files: [
          {
            id: 'file-01',
            name: '문의 내용 스크린샷1_211013.png',
            link: '/img/t-image-img-review-character-100@2x.6a85402e.png',
          },
          {
            id: 'file-02',
            name: 'profile.jpg',
            link: '/img/t-image-img-review-character-100@2x.6a85402e.png',
          },
          {
            id: 'file-03',
            name: 'background.jpg',
            link: '/img/t-image-img-review-character-100@2x.6a85402e.png',
          },
          {
            id: 'file-04',
            name: 'etc.jpg',
            link: '/img/t-image-img-review-character-100@2x.6a85402e.png',
          },
        ],
      },
      //answer: null,
          answer: {
        title: '핑글코치의 답변입니다.',
        date: '2021.12.04',
        contents:
          '안녕하세요. 운동지도사 이강서 핑글 코치입니다. 첨부해주신 스크린샷 확인해보니 마라톤에 애정이 많으셨던 분 같아요. 염증 치료가 끝나면 아프신 부위에 재활, 근력증가 운동 진행하시고 관절에 무리가 안되는 수영이나 필라테스로 운동을 바꿔보시는 것 추천드립니다. 감사합니다.',
        files: [
          {
            id: 'file-01',
            name: '문의 내용 스크린샷1_211013.png',
            link: '/img/t-image-img-review-character-100@2x.6a85402e.png',
          },
          {
            id: 'file-02',
            name: 'profile.jpg',
            link: '/img/t-image-img-review-character-100@2x.6a85402e.png',
          },
          {
            id: 'file-03',
            name: 'background.jpg',
            link: '/img/t-image-img-review-character-100@2x.6a85402e.png',
          },
          {
            id: 'file-04',
            name: 'etc.jpg',
            link: '/img/t-image-img-review-character-100@2x.6a85402e.png',
          },
        ],
      },
      form: {
        write: {
          value: '',
          maxlength: '100',
          placeholder: `고객님의 질문에 답변해주세요.\n질문과 답변은 코치님의 답변 후 모든 사용자에게 공개됩니다.`,
          disabled: false,
          error: '',
          files: [],
        },
      },
    };
  },
  methods: {
    submitAnswer() {
      console.log('df')
    }
  },
}
</script>

<style scoped>

</style>