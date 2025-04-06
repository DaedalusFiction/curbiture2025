<template>
  <div class="flex flex-col md:grid grid-cols-12 gap-3">
    <div class="col-span-6">
      <h4 class="mb-2">Publish a contributor listing</h4>
      <button
        class="btn"
        v-if="!newDocumentPanelExpanded"
        @click="toggleExpandNewDocument"
      >
        Create
      </button>
      <div v-else class="p-2">
        <AdminContributorForm @update="handleRefreshList" />
      </div>
    </div>
    <div class="col-span-6">
      <h4 class="mb-2">Manage existing contributors</h4>
      <div
        v-for="contributor in contributors"
        :key="contributor.id"
        class="rounded transition my-1 border"
      >
        <div
          @click="toggleExpand(contributor.id)"
          class="flex p-2 justify-between rounded cursor-pointer hover:bg-backgroundAccent dark:hover:bg-backgroundAccentDarkMode"
          :class="
            expandedItems[contributor.id] &&
            'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
          "
        >
          <p>{{ contributor.data().name || "No Title" }}</p>
          <p>
            {{ new Date(contributor.data().dateUploaded).toLocaleDateString() }}
          </p>
        </div>
        <div v-if="expandedItems[contributor.id]">
          <div class="p-3">
            <AdminContributorForm
              :contributor="contributor"
              @update="handleRefreshList(contributor.id)"
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
import { AdminContributorForm } from "#components";

const contributors = ref([]);
const expandedItems = reactive({});
const pageSize = 10;
const numberOfShownDocuments = ref(pageSize);
const newDocumentPanelExpanded = ref(false);
const toggleExpandNewDocument = () => {
  newDocumentPanelExpanded.value = !newDocumentPanelExpanded.value;
};

const getDocuments = async (total) => {
  const contributorsRef = collection(db, "contributors");
  const items = await getDocs(
    query(contributorsRef, limit(total), orderBy("dateUploaded", "desc"))
  );
  contributors.value = items.docs;
};

onMounted(() => {
  getDocuments(numberOfShownDocuments.value);
});

const handleShowMoreDocuments = () => {
  numberOfShownDocuments.value += pageSize;
  getDocuments(numberOfShownDocuments.value);
};

const toggleExpand = (contributorId) => {
  expandedItems[contributorId] = !expandedItems[contributorId];
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
