<template>
  <div class="container">
    <div class="inner">
      <title-wrap />
      <form action="#" @submit.prevent="submitForm">
        <ul class="sign-form-wrap">
          <li>
            <strong class="key"><span class="txt">이름</span></strong>
            <div class="val-wrap">
              <input-text
                v-model="form.name"
                :disabled="form.name.length > 0"
              />
            </div>
          </li>
          <li>
            <strong class="key"><span class="txt">휴대폰 번호</span></strong>
            <div class="val-wrap">
              <input-text
                v-model="form.phone"
                :disabled="form.phone.length > 0"
              />
            </div>
          </li>
          <li>
            <strong class="key"><span class="txt">아이디</span></strong>
            <div class="val-wrap">
              <input-text
                v-model="form.cchId.value"
                :error="form.cchId.error"
                placeholder="아이디를 입력해주세요."
              />
              <bullet-list :lists="idBulletLists" />
            </div>
          </li>
          <li>
            <strong class="key"><span class="txt">비밀번호</span></strong>
            <div class="val-wrap">
              <input-text
                v-model="form.cchPswd.value"
                :error="form.cchId.error"
                placeholder="비밀번호를 입력해주세요."
                type="password"
              />
              <bullet-list :lists="pwBulletLists" />
            </div>
          </li>
          <li>
            <strong class="key"><span class="txt">비밀번호 확인</span></strong>
            <div class="val-wrap">
              <input-text
                v-model="form.reUserPw.value"
                :error="form.reUserPw.error"
                placeholder="비밀번호를 한번 더 입력해주세요."
                type="password"
              />
              <bullet-list :lists="pwBulletLists" />
            </div>
          </li>
          <li>
            <strong class="key"><span class="txt">이메일</span></strong>
            <div class="val-wrap half-wrap">
              <input-text
                v-model="form.emlAdr.value"
                placeholder="이메일을 입력해주세요."
              />
              <input-select
                v-model="form.email.value"
                :options="form.email.options"
                :disabled="form.email.disabled"
                :error="form.email.error"
                placeholder="선택"
              />
            </div>
          </li>
        </ul>
      </form>
    </div>
  </div>
</template>

<script>
import TitleWrap from "@/components/title-wrap";
import InputText from "@/components/input-text";
import BulletList from "@/components/bullet-list";
import InputSelect from "@/components/input-select";
export default {
  name: "signUp",
  components: { InputSelect, BulletList, InputText, TitleWrap },
  data() {
    return {
      form: {
        name: "홍길동",
        phone: "010-3456-7890",
        cchId: {
          value: "",
        },
        cchPswd: {
          value: "",
        },
        reUserPw: {
          value: "",
        },
        emlAdr: {
          value: "",
        },
        email: {
          value: "",
          options: [
            { value: "naver", label: "naver.com" },
            { value: "daum", label: "daum.com" },
          ],
        },
        chtgCnsl: {
          checkList: {
            all: {
              value: false,
              label: "전체",
            },
            checked: [],
            list: [
              {
                value: "월",
                label: "월",
              },
              {
                value: "화",
                label: "화",
              },
              {
                value: "수",
                label: "수",
              },
              {
                value: "목",
                label: "목",
              },
              {
                value: "금",
                label: "금",
              },
              {
                value: "토",
                label: "토",
              },
              {
                value: "일",
                label: "일",
              },
            ],
          },
          start: {
            value: "",
            options: [
              { value: "09:00", label: "09:00" },
              { value: "09:30", label: "09:30" },
            ],
          },
          end: {
            value: "",
            options: [
              { value: "09:30", label: "09:30" },
              { value: "10:00", label: "10:00" },
            ],
          },
          disabled: { checked: false, value: "진행 안함" },
        },
        vdeoCnsl: {
          checkList: {
            all: {
              value: false,
              label: "전체",
            },
            checked: [],
            list: [
              {
                value: "월",
                label: "월",
              },
              {
                value: "화",
                label: "화",
              },
              {
                value: "수",
                label: "수",
              },
              {
                value: "목",
                label: "목",
              },
              {
                value: "금",
                label: "금",
              },
              {
                value: "토",
                label: "토",
              },
              {
                value: "일",
                label: "일",
              },
            ],
          },
          start: {
            value: "",
            options: [
              { value: "09:00", label: "09:00" },
              { value: "09:30", label: "09:30" },
            ],
          },
          end: {
            value: "",
            options: [
              { value: "09:30", label: "09:30" },
              { value: "10:00", label: "10:00" },
            ],
          },
          disabled: { checked: false, value: "진행 안함" },
        },
        telCnsl: {
          checkList: {
            all: {
              value: false,
              label: "전체",
            },
            checked: [],
            list: [
              {
                value: "월",
                label: "월",
              },
              {
                value: "화",
                label: "화",
              },
              {
                value: "수",
                label: "수",
              },
              {
                value: "목",
                label: "목",
              },
              {
                value: "금",
                label: "금",
              },
              {
                value: "토",
                label: "토",
              },
              {
                value: "일",
                label: "일",
              },
            ],
          },
          start: {
            value: "",
            options: [
              { value: "09:00", label: "09:00" },
              { value: "09:30", label: "09:30" },
            ],
          },
          end: {
            value: "",
            options: [
              { value: "09:30", label: "09:30" },
              { value: "10:00", label: "10:00" },
            ],
          },
          disabled: { checked: false, value: "진행 안함" },
        },
        cfntCnsl: {
          checkList: {
            all: {
              value: false,
              label: "전체",
            },
            checked: [],
            list: [
              {
                value: "월",
                label: "월",
              },
              {
                value: "화",
                label: "화",
              },
              {
                value: "수",
                label: "수",
              },
              {
                value: "목",
                label: "목",
              },
              {
                value: "금",
                label: "금",
              },
              {
                value: "토",
                label: "토",
              },
              {
                value: "일",
                label: "일",
              },
            ],
          },
          start: {
            value: "",
            options: [
              { value: "09:00", label: "09:00" },
              { value: "09:30", label: "09:30" },
            ],
          },
          end: {
            value: "",
            options: [
              { value: "09:30", label: "09:30" },
              { value: "10:00", label: "10:00" },
            ],
          },
          disabled: { checked: false, value: "진행 안함" },
        },

        agree: {
          all: false,
          checked: [],
          list: [
            {
              value: "checkList-1",
              label: "핑클커넨트 이용약관",
              required: true,
            },
            {
              value: "checkList-2",
              label: "개인정보 수집 및 이용 동의",
              required: true,
            },
            {
              value: "checkList-3",
              label: "마케팅/이벤트 정보 수신 동의",
            },
          ],
        },
      },
      idBulletLists: ["아이디는 최소 3글자 이상 입력해주세요."],
      pwBulletLists: [
        "비밀번호는 영문/숫자/특수문자 2가지 이상 조합으로 6~12자이어야 합니다.",
      ],
    };
  },
  methods: {
    submitForm() {
      console.log("dfd");
    },
  },
};
</script>

<style scoped></style>
