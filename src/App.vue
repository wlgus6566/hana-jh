<template>
  <div id="app">
    <div id="wrap">
      <div class="container">
        <div class="inner">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss" src="./assets/scss/common.scss" />

