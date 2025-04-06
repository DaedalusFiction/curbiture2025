<template>
  <div>
    <div class="container mx-auto flex justify-center my-7">
      <div>
        <h1>{{ error.statusCode }}</h1>
        <p class="my-10">{{ error.message }}</p>
        <button class="btn my-7" @click="handleClearError">Go Back</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["error"]);
const handleClearError = () => clearError({ redirect: "/" });
</script>

<style scoped></style>
