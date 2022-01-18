<template>
  <div id="app">
    <div id="wrap">
      <header-nav />
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/layouts/header-nav";
export default {
  name: "App",
  components: { HeaderNav },
};
</script>

<style lang="scss" src="./assets/scss/common.scss" />
