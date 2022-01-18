<template>
  <div>
    <v-date-picker v-model="date">
      <template v-slot="{ inputValue, inputEvents }">
        <input
            class="bg-white border px-2 py-1 rounded"
            :value="inputValue"
            v-on="inputEvents"
        />
      </template>
    </v-date-picker>
  </div>
</template>

<script>
export default {
  name: "calendar-input",
  data() {
    return {
      date: new Date(),
    };
  },
}
</script>

<style scoped>

</style>