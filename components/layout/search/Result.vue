<template>
  <div class="md:grid grid-cols-12 gap-3">
    <div class="col-span-2">
      <NuxtLink aria-label="View game" :to="`/games/${result.objectID}`">
        <div
          class="transition hover:brightness-110 image-container rounded-t min-h-28 h-full"
        >
          <img
            v-if="result.images"
            :src="result.images[0]"
            :alt="result.title"
          />
          <img v-else src="~/assets/images/mvdblogo.webp" alt="bsdb logo" />
        </div>
      </NuxtLink>
    </div>
    <div class="col-span-10">
      <hr />
      <div class="md:grid grid-cols-12 gap-3 h-full">
        <div class="col-span-9 flex flex-col gap-4 justify-between h-full">
          <div>
            <NuxtLink :to="`/games/` + result.objectID">
              <h4 class="link">{{ result.title }}</h4>
            </NuxtLink>
            <p class="text-xs">
              {{ result._tags?.slice(0, 3).join(", ") }}
            </p>
          </div>
          <p class="text-sm line-clamp-3">
            {{
              result.synopsis || result.description || "No synopsis available."
            }}
          </p>
        </div>
        <div class="col-span-3 flex justify-end">
          <NuxtLink :to="`/games/` + result.objectID"
            ><p class="link mt-2 md:mt-0">Visit Page &rsaquo;</p></NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { result } = defineProps(["result"]);
</script>

<style scoped></style>
