<template>
  <footer
    class="p-3 mt-12 bg-backgroundAccent dark:bg-backgroundAccentDarkMode border-t"
  >
    <div
      class="flex flex-col max-w-screen-2xl mx-auto py-8 gap-4 md:grid grid-cols-12"
    >
      <div class="col-span-3">
        <h6 class="text-lg mb-2 text-primary dark:text-primaryDarkMode">
          Pages
        </h6>
        <p class="mb-1" v-for="(page, index) in pages" :key="page.title">
          <NuxtLink :to="page.href" class="link">{{ page.title }}</NuxtLink>
        </p>
      </div>
      <div class="col-span-3">
        <h6 class="text-lg mb-2 text-primary dark:text-primaryDarkMode">
          Follow Us
        </h6>
        <p
          class="mb-1"
          v-for="(link, index) in socialMediaLinks"
          :key="link.title"
        >
          <NuxtLink :to="link.href" class="link">{{ link.title }}</NuxtLink>
        </p>
      </div>
      <div class="col-span-3"></div>
      <div class="col-span-3 pb-8">
        <h6 class="text-lg mb-2 text-primary dark:text-primaryDarkMode">
          Newsletter
        </h6>
        <div v-if="!emailSubmitted">
          <p class="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
            molestias, laudantium facere fuga impedit recusandae?
          </p>
          <div class="flex sm:flex-col lg:flex-row gap-2">
            <input
              type="text"
              v-model="email"
              class="placeholder-black dark:placeholder-white bg-inherit"
              placeholder="Enter your email..."
            />
            <button @click="handleSubscribe" class="btn">Subscribe</button>
          </div>
        </div>

        <div v-else>
          <p>Thank you for subscribing!</p>
        </div>
      </div>
    </div>
    <div class="md:flex gap-4 justify-between items-end">
      <div class="md:flex gap-6">
        <p class="text-center md:text-start">&copy; 2024 {{ siteName }}</p>
      </div>
      <div class="h-full flex justify-center items-end">
        <p class="text-center md:text-end">
          Website created by
          <a
            class="hover:underline text-primary dark:text-primaryDarkMode"
            href="https://fictionalweb.com"
            >Fictional Web</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { addDoc, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { pages, siteName, socialMediaLinks } from "~/data";
import { db } from "~/firebase.config";
const email = ref("");
const emailSubmitted = ref(false);

const handleSubscribe = async () => {
  const mailingListRef = doc(db, "newsletter", "mailinglist");
  await updateDoc(mailingListRef, { subscribers: arrayUnion(email.value) });
  emailSubmitted.value = true;
};
</script>

<style scoped>
.footer-header {
  @apply font-header font-semibold text-lg  mt-3 mb-1;
}

p,
span {
  @apply text-sm;
}
</style>
