<template>
  <div
    :class="{
      'form-input': true,
      disabled: disabled,
      focused: focused,
      placeholder: !value,
      error: error,
      'input-search': type === 'search',
    }"
  >
    <div class="input">
      <input
        :type="type"
        :value="value"
        :maxlength="maxlength"
        :name="name"
        v-bind="$attrs"
        v-on="listeners"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
    <p class="error-msg" v-if="error">{{ error }}</p>
  </div>
</template>
<script>
export default {
  name: "input-text",
  data() {
    return {
      focused: false,
    };
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    name: String,
    type: {
      type: String,
      default: "text",
    },
    disabled: Boolean,
    error: String,
    maxlength: Number,
    placeholder: String,
  },
  inheritAttrs: false,
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        focusin: (event) => {
          this.focused = true;
          this.$emit("focusin", event);
        },
        focusout: (event) => {
          this.focused = false;
          this.$emit("focusout", event);
        },
        input: (event) => {
          this.$emit("inputEvent", event.target.value);
          //this.$emit('input', event);
        },
      };
    },
  },
  model: {
    event: "inputEvent",
    prop: "value",
  },
};
</script>

<style lang="scss" scoped>
.form-input {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  border-radius: 10px;
  .input {
    width: 100%;
    input {
      flex: 1 1 auto;
      width: 100%;
      height: 42px;
      padding: 7px 25px 6px 15px;
      box-sizing: border-box;
      border: 1px solid $gray-40;
      border-radius: 10px;
      caret-color: $mint-50;
    }
  }
  &.focused {
    input {
      border-color: $mint-50;
    }
  }
  &.error {
    input {
      border-color: $error;
    }
  }
}
</style>
