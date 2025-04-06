<template>
  <div class="flex items-center input-wrapper">
    <IconsSearch class="stroke-black" />
    <input
      type="text"
      placeholder="Search"
      v-model="searchValue"
      class="border-white ml-1 focus:outline-none"
      @keyup.enter="handleSearch"
    />
    <IconsCancelCircle
      v-if="searchValue.length > 0"
      @click="handleClearSearch"
      class="cursor-pointer"
    />
  </div>
</template>

<script setup>
const searchValue = ref("");

const handleSearch = () => {
  navigateTo("/search?q=" + searchValue.value);
  searchValue.value = "";
};

const handleClearSearch = () => {
  searchValue.value = "";
};
</script>

<style scoped></style>
