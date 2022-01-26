<template>
  <label
    v-if="isBoolean"
    :class="{
      'input-checkbox': true,
      disabled: disabled,
      checked: checked,
      focused: focused,
    }"
  >
    <input
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      v-bind="$attrs"
      v-on="inputListeners"
    />
    <i class="icon-checkbox"></i>
  </label>
  <label
    v-else
    :class="{
      'input-checkbox': true,
      'all-check': allCheck,
      'agree-list': type === 'agree',
      checked: checked.some((checkedItem) => {
        checkedItem === val;
      }),
      disabled: disabled,
      focused: focused,
    }"
  >
    <input
      type="checkbox"
      :checked="
        checked.some((checkedItem) => {
          checkedItem === val;
        })
      "
      :disabled="disabled"
      v-bind="$attrs"
      v-on="inputListeners"
    />
    <i class="icon-checkbox"></i>
  </label>
</template>

<script>
export default {
  name: "input-checkbox",
  inheritAttrs: false,
  data() {
    return {
      focused: false,
    };
  },
  props: {
    checked: {
      type: [Boolean, Array],
      required: true,
    },
    val: String,
    disabled: Boolean,
    type: String,
  },
  computed: {
    isBoolean() {
      return typeof this.checked === "boolean";
    },
    inputListeners() {
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
        change: (event) => {
          if (this.isBoolean) {
            this.$emit("selectChange", event.target.checked);
          } else {
            const checkIdx = this.checked.indexOf(this.val);
            if (checkIdx !== -1) {
              this.checked.splice(checkIdx, 1);
            } else {
              this.checked.push(this.val);
            }
          }
          this.$emit("change", event);
        },
      };
    },
    model: {
      prop: "checked",
      event: "selectChange",
    },
  },
};
</script>

<style lang="scss" scoped></style>
