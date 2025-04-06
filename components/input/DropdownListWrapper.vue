<template>
  <div>
    <div class="border-b">
      <div
        @click="expanded = !expanded"
        class="flex justify-between cursor-pointer hover:bg-lightMuted dark:hover:bg-backgroundAccentDarkMode rounded py-2 px-3"
      >
        <p>{{ title }}</p>

        <IconsChevronDown
          class="transition"
          :class="!expanded && '-rotate-90'"
          color="white"
        />
      </div>
      <div v-if="expanded" class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const { title } = defineProps(["title"]);
const expanded = ref(false);
</script>

<style scoped></style>
