<template>
  <Transition name="slide-fade">
    <div v-if="searchExpanded" class="flex gap-2 w-full">
      <input
        class="p-3 grow searchBar"
        placeholder="Search"
        type="text"
        v-model="searchInput"
      />
      <button @click="handleSearch" class="btn w-fit">
        <IconsArrowRight color="white" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
const { searchExpanded } = defineProps(["searchExpanded"]);
const searchInput = ref("");

const handleSearch = () => {
  navigateTo("/search?q=" + searchInput.value);
  searchInput.value = "";
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
