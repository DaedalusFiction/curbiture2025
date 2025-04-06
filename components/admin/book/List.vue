<template>
  <div class="flex flex-col md:grid grid-cols-12 gap-3">
    <div class="col-span-6">
      <h4 class="mb-2">Publish a book entry</h4>
      <button
        class="btn"
        v-if="!newDocumentPanelExpanded"
        @click="toggleExpandNewDocument"
      >
        Create
      </button>
      <div v-else class="p-2">
        <AdminBookForm @update="handleRefreshList" />
      </div>
    </div>
    <div class="col-span-6">
      <h4 class="mb-2">Manage existing book entries</h4>
      <div
        v-for="book in books"
        :key="book.id"
        class="rounded transition my-1 border"
      >
        <div
          @click="toggleExpand(book.id)"
          class="flex p-2 justify-between rounded cursor-pointer hover:bg-backgroundAccent dark:hover:bg-backgroundAccentDarkMode"
          :class="
            expandedItems[book.id] &&
            'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
          "
        >
          <p>{{ book.data().title || "No Title" }}</p>
          <p>
            {{ new Date(book.data().dateUploaded).toLocaleDateString() }}
          </p>
        </div>
        <div v-if="expandedItems[book.id]">
          <div class="p-3">
            <AdminBookForm :book="book" @update="handleRefreshList(book.id)" />
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

const books = ref([]);
const expandedItems = reactive({});
const pageSize = 10;
const numberOfShownDocuments = ref(pageSize);
const newDocumentPanelExpanded = ref(false);
const toggleExpandNewDocument = () => {
  newDocumentPanelExpanded.value = !newDocumentPanelExpanded.value;
};

const getDocuments = async (total) => {
  const booksRef = collection(db, "portfolio");
  const items = await getDocs(
    query(booksRef, limit(total), orderBy("dateUploaded", "desc"))
  );
  books.value = items.docs;
};

onMounted(() => {
  getDocuments(numberOfShownDocuments.value);
});

const handleShowMoreDocuments = () => {
  numberOfShownDocuments.value += pageSize;
  getDocuments(numberOfShownDocuments.value);
};

const toggleExpand = (bookId) => {
  expandedItems[bookId] = !expandedItems[bookId];
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
