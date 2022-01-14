<template>
  <div class="title-wrap">
    <h2 class="title-h2" v-html="$route.meta.title">
      {{ $route.meta.title }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "title-wrap"
}
</script>

<style scoped>

</style>