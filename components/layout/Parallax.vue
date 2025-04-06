<!-- components/ParallaxHero.vue -->
<template>
  <section class="relative pt-8 min-h-[75vh] flex items-end">
    <div
      class="h-full w-full absolute z-0 bg-cover bg-center"
      :style="{
        transform: `translateY(${backgroundYOffset}px)`,
        willChange: 'transform',
      }"
      :class="'bg-[linear-gradient(to_bottom,rgba(17,13,23,0),rgba(17,13,23,0)),url(~/public/images/mountains1.webp)]'"
    />
    <div class="px-3 z-1 relative w-full max-w-screen-xl mx-auto py-8">
      <h1 class="text-light text-5xl md:text-7xl mb-2">Header One</h1>
      <p class="text-lightMuted max-w-prose">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi
        consequatur ducimus eum repellendus? Eligendi porro earum vel nobis
        aliquam qui quas autem expedita eum adipisci quis culpa repudiandae
        mollitia, sed eveniet ad sint sapiente cumque velit! Laborum aspernatur
        quidem at?
      </p>
      <div class="pt-3 flex gap-3">
        <button class="btn">Button</button>
        <button class="btn">Button</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// State to track background Y offset
const backgroundYOffset = ref(0);

// Parallax scroll handler
const handleScroll = () => {
  // Scroll speed factor (lower = slower movement)
  const scrollSpeed = 0.3;

  // Calculate background offset based on scroll position
  backgroundYOffset.value = window.scrollY * scrollSpeed;
};

// Add and remove scroll event listener
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
