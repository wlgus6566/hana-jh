<template>
  <div
      :class="{
         'select-wrap': true,
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
  name: "base-select",
  data() {
    return {
    }
  },
  inheritAttrs: false,
  props: {
    type: String,
    value: String,
    selectOptions: Array,
    disabled: Boolean,
    error: String,
    placeholder: String,
  },
  model: {
    event: 'selectChange',
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        focusin: (event) => {
          this.focused = true;
          this.$emit('focusin', event);
        },
        focusout: (event) => {
          this.focused = false;
          this.$emit('focusout', event);
        },
        change: (event) => {
          console.log(event.target.value);
          this.$emit('selectChange', event.target.value);
          this.$emit('change', event);
        },
      };
    },
  },
}
</script>

<style lang="scss" scoped>
.select-wrap {
  position: relative;
  background: #fff;
  select {
    position: relative;
    width: 100%;
    font-size: 14px;
    height: 44px;
    line-height: 20px;
    padding: 0 47px 0 15px;
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
</style>