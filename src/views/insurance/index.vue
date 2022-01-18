<template>
  <div>
    <keep-alive include="insuranceList" :max="5">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "insurance",
};
</script>
<style lang="scss" scoped></style>
