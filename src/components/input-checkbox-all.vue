<script>
import inputCheckbox from "./input-checkbox";
export default {
  name: "input-checkbox-all",
  extends: inputCheckbox,
  props: {
    checkboxList: Array,
    checkedList: Array,
  },
  created() {
    this.allCheck = true;
  },
  watch: {
    checkedList() {
      this.$emit(
        "selectChange",
        this.checkboxList.length === this.checkedList.length
      );
    },
  },
  computed: {
    isBoolean() {
      return typeof this.checked === "boolean";
    },
    listeners() {
      return {
        ...this.$listeners,
        focusin: (e) => {
          this.focused = true;
          this.$emit("focusin", e);
        },
        focusout: (e) => {
          this.focused = false;
          this.$emit("focusout", e);
        },
        change: (e) => {
          this.$emit(
            "update:checkedList",
            e.target.checked ? this.checkboxList : []
          );
          this.$emit("selectChange", e.target.checked);
          this.$emit("change", e);
        },
      };
    },
  },
};
</script>

<style scoped></style>
