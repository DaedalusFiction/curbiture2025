<template>
  <div class="flex flex-col md:grid grid-cols-12 gap-3">
    <div class="col-span-6">
      <h4 class="mb-2">Upload YouTube Link</h4>
      <button
        class="btn"
        v-if="!newDocumentPanelExpanded"
        @click="toggleExpandNewDocument"
      >
        Create
      </button>
      <div v-else class="p-2">
        <AdminVideoForm @update="handleRefreshList" />
      </div>
    </div>
    <div class="col-span-6">
      <h4 class="mb-2">Manage existing videos</h4>
      <div
        v-for="video in videos"
        :key="video.id"
        class="rounded transition my-1 border"
      >
        <div
          @click="toggleExpand(video.id)"
          class="flex p-2 justify-between rounded cursor-pointer hover:bg-backgroundAccent dark:hover:bg-backgroundAccentDarkMode"
          :class="
            expandedItems[video.id] &&
            'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
          "
        >
          <p>{{ video.data().title || "No Title" }}</p>
          <p>
            video Date: {{ new Date(video.data().date).toLocaleDateString() }}
          </p>
        </div>
        <div v-if="expandedItems[video.id]">
          <div class="p-3">
            <AdminVideoForm
              :video="video"
              @update="handleRefreshList(video.id)"
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
import { AdminVideoForm } from "#components";

const videos = ref([]);
const expandedItems = reactive({});
const pageSize = 10;
const numberOfShownDocuments = ref(pageSize);
const newDocumentPanelExpanded = ref(false);
const toggleExpandNewDocument = () => {
  newDocumentPanelExpanded.value = !newDocumentPanelExpanded.value;
};

const getDocuments = async (total) => {
  const videosRef = collection(db, "videos");
  const items = await getDocs(
    query(videosRef, limit(total), orderBy("dateUploaded", "desc"))
  );
  videos.value = items.docs;
};

onMounted(() => {
  getDocuments(numberOfShownDocuments.value);
});

const handleShowMoreDocuments = () => {
  numberOfShownDocuments.value += pageSize;
  getDocuments(numberOfShownDocuments.value);
};

const toggleExpand = (videoId) => {
  expandedItems[videoId] = !expandedItems[videoId];
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
