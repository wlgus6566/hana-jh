<template>
  <div
    :class="{
      'textarea-wrap':true,
      focused: focused,
      disabled: disabled,
      placeholder: placeholder && !value,
      error: error
    }"
  >
    <div class="textarea">
      <textarea
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :placeholder="placeholder"
        v-bind="$attrs"
        v-on="listeners"
      />
      <span class="length" v-if="maxlength">
        <em class="current">{{ length }}</em>/
        <em class="max">{{ maxlength }}</em>
      </span>
    </div>
    <p class="error-msg" v-if="error">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: "input-textarea",
  data() {
    return {
      length: 0,
      focused: false
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: String,
    error: Boolean,
    maxlength: String,
    minlength: String,
    disabled: Boolean
  },
  inheritAttrs: false,
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        focusin: (event) => {
          this.focused = true;
          this.$emit('focusin', event)
        },
        focusout: (event) => {
          this.focused = false;
          this.$emit('focusout', event)
        },
        input: (event) => {
          console.log('input')
          if(this.maxlength) {
            this.$emit('input',event)
            this.length = event.target.value.length;
          }
        },
        change: (event) => {
          console.log('change')
          this.inputChange(event);
          this.$emit('input',event);
        }
      }
    },

  },
  methods: {
    inputChange(event) {
      console.log(event.target.value)
      this.$emit('inputChange', event.target.value);
      if(this.maxlength) {
        event.target.value.slice(0,this.maxlength);
      }
    }
  },
  model: {
    prop: 'value',
    event: 'inputChange'
  }
}
</script>

<style lang="scss" scoped>
  .textarea-wrap {
    margin-top: 10px;
    .textarea {
      position: relative;
      display: block;
      width: 320px;
      height: 300px;
      padding: 15px 15px 43px;
      border-radius: 10px;
      box-sizing: border-box;
      border: 1px solid $gray-40;
      background: #fff;
      textarea {
        color: $gray-70;
      }
      .length {
        position: absolute;
        right: 15px;
        bottom: 10px;
        margin-top: 5px;
        color: $gray-70;
        font-size: 12px;
        text-align: right;
        .max {
          color: $gray-50;
        }
      }
    }
    &.focused {
      .textarea {
        border-color: $mint-30;
      }
    }
    &.disabled {
      .textarea {
        background: $gray-20;
      }
    }
  }

</style>