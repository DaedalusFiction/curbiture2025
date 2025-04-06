<template>
  <LayoutPageHeader header="Search" />
  <div class="max-w-screen-lg px-3 mx-auto min-h-[50vh]">
    <div class="md:flex gap-3 justify-between items-center">
      <p>Search for Articles, Events, Contributors, and Portfolio Items</p>
      <div class="flex gap-2 mb-2 items-center justify-between">
        <label for="hitsPerPage"><p>Results Per Page:</p></label>
        <select
          class="w-fit"
          name="Results Per Page"
          id="hitsPerPage"
          v-model="hitsPerPage"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-3 mb-3">
      <input
        type="text"
        class="grow"
        id="query"
        v-model="searchQuery"
        placeholder="Search Publications..."
        @keyup.enter="getSearchResults(searchQuery)"
      />
      <button
        class="btn w-full md:w-fit"
        @click="getSearchResults(searchQuery)"
      >
        Search
      </button>
    </div>
    <label class="hidden" for="query">Search Query</label>
    <p v-if="searchResults.length > 0" class="text-sm mb-3">
      Showing 1-{{ searchResults.length }} of {{ totalHits }} total results
    </p>
    <p v-else>No documents found.</p>
    <div v-if="searchResults && searchResults.length > 0">
      <div v-for="(result, index) in searchResults" :key="index">
        <h4 class="mb-0">
          <NuxtLink :href="result.path" class="link">{{
            result.fields[0].value
          }}</NuxtLink>
        </h4>
        <p class="italic text-sm">
          By
          <NuxtLink
            class="link"
            :href="`/contributors/search/${result.fields[1].value}`"
            >{{ result.fields[1].value }}</NuxtLink
          >
        </p>
        <p class="my-2">{{ result.fields[2].value }}</p>
        <hr />
      </div>
      <button
        class="btn"
        v-if="searchResults.length < totalHits"
        @click="handleLoadMorePublications"
      >
        Load More Results
      </button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

import useSearch from "~/composables/search";

const searchResults = ref([]);
const totalHits = ref(0);
const query = ref(route.query.q);
const hitsPerPage = ref(10);
const totalRequestedHits = ref(hitsPerPage.value);
const searchQuery = ref("");

const getSearchResults = async (query) => {
  if (searchQuery.value == "") {
    return;
  }

  const { hits, nbHits } = await useSearch(query, totalRequestedHits.value);

  totalHits.value = nbHits;
  searchResults.value = hits;
};

const handleLoadMorePublications = () => {
  totalRequestedHits.value += hitsPerPage.value;
};

watch(
  () => route.query.q,
  async () => {
    query.value = route.query.q;
    getSearchResults(route.query.q);
  }
);

watch(
  () => totalRequestedHits.value,
  async () => {
    getSearchResults(searchQuery.value);
  }
);
watch(
  () => hitsPerPage.value,
  async () => {
    totalRequestedHits.value = hitsPerPage.value;
    getSearchResults(searchQuery.value);
  }
);
</script>

<style scoped>
input,
select,
textarea {
  @apply shadow md:w-fit appearance-none border rounded py-2 px-3 text-gray-700 leading-tight;
}

input,
textarea {
  @apply w-full;
}
</style>
