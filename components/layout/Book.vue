<template>
  <div class="md:grid grid-cols-12 gap-3 border-b pb-6 mb-6">
    <div class="col-span-4">
      <NuxtLink :to="book.href"
        ><img
          :src="book.image.src"
          class="hover:brightness-105 transition"
          :alt="book.image.alt"
      /></NuxtLink>
    </div>
    <div class="col-span-8 flex flex-col justify-between">
      <div>
        <p class="text-sm mt-3 md:mt-0">{{ book.genre }}</p>
        <p class="text-3xl font-header font-bold">{{ book.title }}</p>
        <p class="">{{ book.publisher }}, {{ book.yearPublished }}</p>
        <br />
        <p class="whitespace-pre-wrap">{{ book.description }}</p>
        <br />
      </div>
      <a :href="book.href" class="btn">Order Now</a>
    </div>
  </div>
</template>

<script setup>
const { book } = defineProps(["book"]);
</script>

<style scoped></style>
