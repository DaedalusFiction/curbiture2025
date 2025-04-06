<template>
  <header class="fixed w-full top-0 z-20">
    <div v-if="bannerMessage" class="bg-primary p-2">
      <p class="max-w-full text-center text-light">
        {{ bannerMessage }}
      </p>
    </div>
    <div class="bg-backgroundAccent dark:bg-backgroundAccentDarkMode">
      <div class="hidden xl:grid grid-cols-12 px-4 py-2 mx-auto">
        <div class="col-span-7 flex gap-4 items-center">
          <h1 class="whitespace-nowrap text-2xl">
            <NuxtLink to="/">
              <span class="text-primary dark:text-primaryDarkMode"
                >Template</span
              >
              <span class="text-secondary dark:text-secondaryDarkMode"
                >Website</span
              >
            </NuxtLink>
          </h1>

          <NuxtLink
            v-for="item in pages"
            :key="item"
            class="link"
            :href="item.href"
            >{{ item.title }}</NuxtLink
          >
        </div>
        <div class="col-span-5 flex gap-3 items-center justify-end">
          <InputSearchBar class="searchBar" />
        </div>
      </div>
      <div class="p-2 mx-auto flex xl:hidden justify-between items-center">
        <button
          class="navigationOptions text-2xl font-extrabold text-white"
          @click="handleExpandNavigation"
        >
          <IconsHamburger class="navigationOptions" />
        </button>
        <h1 class="text-secondary dark:text-secondaryDarkMode">
          <NuxtLink to="/" class="link">Website</NuxtLink>
        </h1>
        <div class="flex gap-2 items-center">
          <IconsSearch
            class="searchBar stroke-black dark:stroke-white cursor-pointer"
            @click="handleExpandSearch"
          />
        </div>
      </div>
    </div>

    <div
      class="flex xl:hidden p-3 transition searchBar"
      :class="
        searchExpanded && 'bg-background dark:bg-backgroundAccentDarkMode'
      "
    >
      <InputMobileSearchBar
        class="searchBar"
        :searchExpanded="searchExpanded"
      />
    </div>
  </header>

  <Transition>
    <nav
      v-if="navigationExpanded"
      class="fixed top-14 rounded border bg-background dark:bg-backgroundDarkMode transition-colors duration-50 min-w-40 flex items-center py-4 z-10"
      :class="navigationExpanded && 'navigationExpanded'"
    >
      <ul class="">
        <li class="my-2" v-for="item in pages" :key="item.href">
          <NuxtLink :to="item.href" @click="handleExpandNavigation">{{
            item.title
          }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </Transition>
  <Transition>
    <nav
      v-if="profileOptionsExpanded"
      class="profileOptions fixed top-14 right-0 rounded border bg-background dark:bg-backgroundDarkMode transition-colors duration-50 min-w-40 flex items-center py-4 z-10"
      :class="profileOptionsExpanded && 'profileOptionsExpanded'"
    >
      <ul class="pr-4 profileOptions">
        <li v-if="!googleUser" class="my-2 profileOptions">
          <button class="profileOptions" @click="handleSignIn">
            <p>Sign In with Google</p>
          </button>
        </li>
        <li v-if="googleUser" class="my-2 profileOptions">
          <button class="cursor-pointer" @click="handleSignOut">
            <p>Sign Out</p>
          </button>
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<script setup>
import { doc, getDoc } from "firebase/firestore";
import { ref, onMounted, onBeforeUnmount } from "vue";
import useLogin from "~/composables/login";
import { pages } from "~/data";
import { db } from "~/firebase.config";

const firebaseUser = useState("firebaseUser");
const googleUser = useState("googleUser");
const navigationExpanded = useState("navigationExpanded");
const profileOptionsExpanded = useState("profileOptionsExpanded");
const searchExpanded = useState("searchExpanded");
const bannerMessage = ref("");

const isScrolled = ref(false);

const handleSignIn = async () => {
  await useLogin("in");
  profileOptionsExpanded.value = !profileOptionsExpanded.value;
};
const handleSignOut = async () => {
  firebaseUser.value = null;
  googleUser.value = null;
  profileOptionsExpanded.value = !profileOptionsExpanded.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};

const handleExpandSearch = () => {
  searchExpanded.value = !searchExpanded.value;
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  const bannerRef = doc(db, "restaurant", "banner");
  const bannerMessageTask = await getDoc(bannerRef);
  console.log(bannerMessageTask.data().message);
  bannerMessage.value = bannerMessageTask.data().message;
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
const handleExpandNavigation = () => {
  navigationExpanded.value = !navigationExpanded.value;
};
const handleExpandProfileOptions = () => {
  profileOptionsExpanded.value = !profileOptionsExpanded.value;
};
</script>

<style scoped>
.scrolled {
  @apply bg-background dark:bg-backgroundAccent border-b;
}

.navigationExpanded,
.profileOptionsExpanded {
  @apply dark:bg-backgroundAccentDarkMode;
}

.v-enter-active,
.v-leave-active {
  transition: height 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
