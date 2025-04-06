<template>
  <div class="flex flex-col md:grid grid-cols-12 gap-3">
    <div class="col-span-6">
      <h4 class="mb-2">Publish an event</h4>
      <button
        class="btn"
        v-if="!newDocumentPanelExpanded"
        @click="toggleExpandNewDocument"
      >
        Create
      </button>
      <div v-else class="p-2">
        <AdminEventForm @update="handleRefreshList" />
      </div>
    </div>
    <div class="col-span-6">
      <h4 class="mb-2">Manage existing events</h4>
      <div
        v-for="event in events"
        :key="event.id"
        class="rounded transition my-1 border"
      >
        <div
          @click="toggleExpand(event.id)"
          class="flex p-2 justify-between rounded cursor-pointer hover:bg-backgroundAccent dark:hover:bg-backgroundAccentDarkMode"
          :class="
            expandedItems[event.id] &&
            'bg-backgroundAccent dark:bg-backgroundAccentDarkMode'
          "
        >
          <p>{{ event.data().title || "No Title" }}</p>
          <p>
            Event Date: {{ new Date(event.data().date).toLocaleDateString() }}
          </p>
        </div>
        <div v-if="expandedItems[event.id]">
          <div class="p-3">
            <AdminEventForm
              :event="event"
              @update="handleRefreshList(event.id)"
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
import { AdminEventForm } from "#components";

const events = ref([]);
const expandedItems = reactive({});
const pageSize = 10;
const numberOfShownDocuments = ref(pageSize);
const newDocumentPanelExpanded = ref(false);
const toggleExpandNewDocument = () => {
  newDocumentPanelExpanded.value = !newDocumentPanelExpanded.value;
};

const getDocuments = async (total) => {
  const eventsRef = collection(db, "events");
  const items = await getDocs(
    query(eventsRef, limit(total), orderBy("dateUploaded", "desc"))
  );
  events.value = items.docs;
};

onMounted(() => {
  getDocuments(numberOfShownDocuments.value);
});

const handleShowMoreDocuments = () => {
  numberOfShownDocuments.value += pageSize;
  getDocuments(numberOfShownDocuments.value);
};

const toggleExpand = (eventId) => {
  expandedItems[eventId] = !expandedItems[eventId];
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
