<template>
  <div
      :class="{
         'select-wrap': true,
         sort: type === 'sort',
         maxWidth: maxWidth,
         focused: focused,
         disabled: disabled,
         placeholder: placeholder && !value,
         error: error,
      }"
  >
    <select
      :value="value"
      :disabled="disabled"
      v-on="listeners"
      v-bind="$attrs"
    >
      <option :value="''" disabled="true" v-if="placeholder">
        {{ placeholder }}
      </option>
      <option
          v-for="(item, idx ) in selectOptions"
          :key="idx"
          :value="item.value"
          :disabled="item.disabled"
      >
        {{ item.label }}
      </option>
    </select>
    <p class="error-msg" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: "input-select",
  data() {
    return {
      focused: false,
      abc: true,
    };
  },
  inheritAttrs: false,
  props: {
    type: String,
    value: String,
    selectOptions: Array,
    disabled: Boolean,
    error: String,
    placeholder: String,
    maxWidth: Boolean
  },
  model: {
    event: 'selectChange',
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        focusin: (event) => {
          console.log(this);
          this.focused = true;
          this.$emit('focusin', event);
        },
        focusout: (event) => {
          this.focused = false;
          this.$emit('focusout', event);
        },
        change: (event) => {
          console.log(this)
          console.log(event.target.value);
          this.abc = true;
          this.$emit('selectChange', event.target.value);
          //this.$emit('change', event);
        },
      };
    },
  },
}
</script>

<style lang="scss" scoped>
.select-wrap {
  position: relative;
  flex: 1 1 auto;
  background: #fff;
  &.maxWidth {
    max-width: 89px;
  }
  select {
    position: relative;
    width: 100%;
    font-size: 14px;
    height: 44px;
    line-height: 20px;
    padding: 0 44px 0 15px;
    border-radius: 10px;
    border: 1px solid $gray-40;
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    width: 20px;
    height: 20px;
    background: url('../assets/images/ic-down-20.svg') no-repeat center;
  }
  &.focused {
    select {
      border-color: $mint-50;
    }
  }
  &.error {
    select {
      border-color: $error;
    }
  }
}
.error-msg {
  margin-top: 2px;
  color: $error;
  line-height: 18px;
  font-size: 12px;
  letter-spacing: -0.5px;
}
.sort {
  width: auto;
  select {
    display: inline-flex;
    padding: 12px 20px 12px 0;
    height: 44px;
    border: none;
  }
  &:before {
    right: 0;
  }
}
</style>