<template>
  <div class="py-24 md:py-32 max-w-screen-xl px-3 mx-auto">
    <div v-if="article" class="flex flex-col md:grid grid-cols-12 gap-12">
      <div class="col-span-9">
        <h1 class="md:text-4xl mb-3">{{ article.data().title }}</h1>
        <p class="italic">by {{ article.data().author }}</p>
        <br />
        <img
          v-if="article.data().image"
          class="w-full"
          :src="article.data().image.src"
          :alt="article.data().image.alt"
        />
        <br />
        <p class="whitespace-pre-wrap">{{ article.data().text }}</p>
        <br />
        <p class="italic">
          Published
          {{ new Date(article.data().dateUploaded).toLocaleDateString() }}
        </p>
      </div>
      <div class="col-span-3">
        <h2 class="font-bold md:mt-28 mb-3">Sidebar header</h2>

        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo ducimus
          incidunt deleniti!
        </p>
        <br />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo adipisci
          reprehenderit soluta eaque error repudiandae eligendi rem laboriosam?
          Eaque voluptatem ipsam possimus molestiae cumque quae?
        </p>
        <br />
        <NuxtLink to="/about"
          ><p class="underline link">Learn More</p></NuxtLink
        >
        <div class="flex flex-col gap-6">
          <div v-for="(furtherReading, index) in furtherReadings" :key="index">
            <LayoutArticlePreview :article="furtherReading" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "~/firebase.config";

const router = useRoute();
const article = ref(null);
const furtherReadings = ref([]);
onMounted(async () => {
  const articleRef = doc(db, "articles", router.params.id);
  const snapshot = await getDoc(articleRef);
  article.value = snapshot;
  const furtherReadingsRef = collection(db, "articles");
  const furtherReadingsQuery = query(
    furtherReadingsRef,
    limit(3),
    where("title", "!=", article.value.data().title)
  );
  const furtherReadingsSnapshot = getDocs(furtherReadingsQuery);
  furtherReadings.value = (await furtherReadingsSnapshot).docs;
});
</script>

<style scoped></style>
