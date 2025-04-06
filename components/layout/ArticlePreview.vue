<template>
  <NuxtLink :href="`/articles/` + article.id">
    <div>
      <div class="image-container h-72 hover:brightness-105 transition">
        <img :src="article.data().image.src" :alt="article.data().image.alt" />
      </div>
      <p class="text-2xl font-header link uppercase pt-2">
        {{ article.data().title }}
      </p>
      <p>by {{ article.data().author }}</p>

      <p class="text-darkMuted dark:text-lightMuted">
        {{ article.data().hook }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
const { article } = defineProps(["article"]);
</script>

<style scoped></style>
