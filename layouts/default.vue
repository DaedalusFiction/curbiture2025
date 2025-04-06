<template>
  <div class="flex flex-col bg-background justify-between">
    <div class="relative z-0" @click="handleCloseMenus">
      <
      <LayoutNavigation />
      <div class="max-w-screen-2xl mx-auto">
        <slot />
      </div>
    </div>
    <FeedbackSnackBar />
    <LayoutFooter />
  </div>
</template>

<script setup>
const navigationExpanded = useState("navigationExpanded");
const profileOptionsExpanded = useState("profileOptionsExpanded");
const searchExpanded = useState("searchExpanded");
const handleCloseMenus = (e) => {
  if (!e.target.classList.contains("profileOptions")) {
    profileOptionsExpanded.value = false;
  }
  if (!e.target.classList.contains("navigationOptions")) {
    navigationExpanded.value = false;
  }
  if (!e.target.classList.contains("searchBar")) {
    searchExpanded.value = false;
  }
};
</script>

<style scoped></style>
