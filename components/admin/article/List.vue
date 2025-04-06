<template>
  <div class="flex flex-col md:grid grid-cols-12 gap-3">
    <div class="col-span-6">
      <h4 class="mb-2">Publish an Article</h4>

      <button
        class="btn"
        v-if="!newDocumentPanelExpanded"
        @click="toggleExpandNewDocument"
      >
        Create
      </button>
      <div v-else class="p-2">
        <AdminArticleForm @update="handleRefreshList" />
      </div>
    </div>
    <div class="col-span-6">
      <h4 class="mb-2">Manage existing articles</h4>
      <div
        v-for="article in articles"
        :key="article.id"
        class="rounded transition my-1 border"
      >
        <div
          @click="toggleExpand(article.id)"
          class="flex p-2 justify-between rounded cursor-pointer hover:bg-backgroundAccent dark:hover:bg-backgroundAccentDarkMode"
          :class="
            expandedItems[article.id] &&
            'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
          "
        >
          <p>{{ article.data().title || "No Title" }}</p>
          <p>
            {{ new Date(article.data().dateUploaded).toLocaleDateString() }}
          </p>
        </div>
        <div v-if="expandedItems[article.id]">
          <div class="p-3">
            <AdminArticleForm
              :article="article"
              @update="handleRefreshList(article.id)"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="btn" @click="handleShowMoreDocuments">More</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "~/firebase.config";
import { ref, reactive } from "vue";
import { AdminArticleForm } from "#components";

const articles = ref([]);
const expandedItems = reactive({});
const pageSize = 10;
const numberOfShownDocuments = ref(pageSize);

const newDocumentPanelExpanded = ref(false);
const toggleExpandNewDocument = () => {
  newDocumentPanelExpanded.value = !newDocumentPanelExpanded.value;
};
const getDocuments = async (total) => {
  const articlesRef = collection(db, "articles");
  const items = await getDocs(
    query(articlesRef, limit(total), orderBy("dateUploaded", "desc"))
  );
  articles.value = items.docs;
};

onMounted(() => {
  getDocuments(numberOfShownDocuments.value);
});

const handleShowMoreDocuments = () => {
  numberOfShownDocuments.value += pageSize;
  getDocuments(numberOfShownDocuments.value);
};

const toggleExpand = (articleId) => {
  expandedItems[articleId] = !expandedItems[articleId];
};

const handleRefreshList = (articleId) => {
  if (articleId) {
    getDocuments(numberOfShownDocuments.value);
    toggleExpand(articleId);
  } else {
    toggleExpandNewDocument();
  }
};
</script>

<style scoped></style>
