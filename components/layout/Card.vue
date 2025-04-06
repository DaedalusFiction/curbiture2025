<template>
  <NuxtLink
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    :href="card.href"
    class="h-full flex flex-col gap-3 justify-between"
  >
    <div class="">
      <div class="">
        <div class="image-container h-64 hover:brightness-105 transition">
          <img :src="card.image.src" alt="" />
        </div>
        <p class="text-2xl font-header uppercase font-bold pt-2">
          {{ card.header }}
        </p>
        <div>
          <p class="text-darkMuted dark:text-lightMuted">
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="btn w-full opacity-0 transition"
      :class="isHovering && 'opacity-100'"
    >
      Order now
    </div>
  </NuxtLink>
</template>

<script setup>
const { card } = defineProps(["card"]);
const isHovering = ref(false);
</script>

<style scoped></style>
