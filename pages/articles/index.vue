<template>
  <div>
    <LayoutPageHeader header="Articles" />

    <div class="md:grid grid-cols-12 max-w-screen-xl gap-3 px-3 mx-auto pt-3">
      <div
        v-for="(article, index) in articles"
        :key="index"
        class="col-span-3 mb-6"
      >
        <LayoutArticlePreview :article="article" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "~/firebase.config";

const articles = ref([]);

const articlesRef = collection(db, "articles");
onMounted(async () => {
  const articlesQuery = query(articlesRef, orderBy("dateUploaded", "desc"));
  const snapshot = await getDocs(articlesQuery);
  articles.value = snapshot.docs;
  console.log(articles.value[0].data().title);
});
</script>

<style lang="scss" scoped></style>
