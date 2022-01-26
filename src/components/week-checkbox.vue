<template>
  <div class="week-checkbox">
    <fieldset class="week-time-wrap">
      <div class="week-wrap">
        <input-checkbox-all />
      </div>
    </fieldset>
  </div>
</template>

<script>
import InputCheckboxAll from "@/components/input-checkbox-all";
export default {
  name: "week-checkbox",
  components: { InputCheckboxAll },
};
</script>

<style scoped></style>
