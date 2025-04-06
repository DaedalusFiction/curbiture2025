<template>
  <div class="pt-16 md:pt-32 mb-12 px-3 max-w-screen-2xl mx-auto">
    <h1 class="text-5xl md:text-5xl text-center">
      {{ header }}
    </h1>
  </div>
</template>

<script setup>
const { header } = defineProps(["header"]);
</script>

<style lang="scss" scoped></style>
