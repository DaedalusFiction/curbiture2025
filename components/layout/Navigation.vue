<template>
  <header
    class="fixed w-full border-b top-0 z-20 transition-transform duration-300"
    :class="{ 'translate-y-0': isScrolled, '-translate-y-full': !isScrolled }"
  >
    <div class="bg-backgroundAccent">
      <div class="p-2 mx-auto flex justify-between items-center">
        <h1>
          <NuxtLink to="/" class="font-header text-xl">Curbiture</NuxtLink>
        </h1>
        <button
          class="navigationOptions text-2xl font-extrabold text-white"
          @click="handleExpandNavigation"
        >
          <IconsHamburger class="navigationOptions" />
        </button>
      </div>
    </div>
  </header>

  <Transition>
    <nav
      v-if="navigationExpanded"
      class="fixed h-screen w-screen bg-background dark:bg-backgroundDarkMode transition-colors flex items-center py-4 z-10"
      :class="navigationExpanded && 'navigationExpanded'"
    >
      <ul class="">
        <li class="my-2" v-for="item in pages" :key="item.href">
          <NuxtLink
            :to="item.href"
            class="text-3xl md:text-7xl font-header"
            @click="handleExpandNavigation"
            >{{ item.title }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { pages } from "~/data";

const navigationExpanded = useState("navigationExpanded");

const route = useRoute();
const isScrolled = ref(false);

const handleScroll = () => {
  if (route.path === "/") {
    isScrolled.value = window.scrollY > 80;
  }
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  if (route.path === "/") {
    isScrolled.value = window.scrollY > 80;
  } else {
    isScrolled.value = true;
  }
});

watch(
  () => route.path,
  () => {
    console.log("route.path: ", route.path);
    if (route.path === "/") {
      isScrolled.value = false;
    } else {
      isScrolled.value = true;
    }
  },
  { deep: true }
);

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleExpandNavigation = () => {
  navigationExpanded.value = !navigationExpanded.value;
};
</script>

<style scoped>
.navigationExpanded {
  @apply bg-background dark:bg-backgroundAccentDarkMode;
}

.v-enter-active,
.v-leave-active {
  transition: height 0.5s ease, opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
