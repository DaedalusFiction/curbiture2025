<template>
  <div>
    <LayoutPageHeader header="Videos">< </LayoutPageHeader>

    <div class="max-w-screen-lg mt-12 px-4 mx-auto md:grid grid-cols-12 gap-6">
      <div
        class="col-span-6 lg:col-span-4"
        v-for="(video, index) in videos"
        :key="index"
      >
        <iframe
          class="youtube-video mb-3 rounded-xl"
          :src="video.data().url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <h3 class="link text-2xl">
          <NuxtLink :to="`/videos/${video.id}`">{{
            video.data().title
          }}</NuxtLink>
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "~/firebase.config";

const videos = ref([]);

onMounted(async () => {
  const videosRef = collection(db, "videos");
  const videosQuery = query(videosRef, orderBy("dateUploaded", "desc"));
  //sort by latest uploaded
  const videosSnapshot = await getDocs(videosQuery);
  videos.value = videosSnapshot.docs;
});
</script>

<style scoped>
.youtube-video {
  aspect-ratio: 16 / 9;
  width: 100%;
}
.widescreen {
  aspect-ratio: 20 / 9;
}
</style>
