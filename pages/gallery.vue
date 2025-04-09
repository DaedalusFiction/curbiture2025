<template>
  <div>
    <LayoutPageHeader header="Gallery" />

    <div
      class="flex max-w-screen-2xl mx-auto p-1 gap-1 flex-col md:grid grid-cols-12 grid-flow-dense auto-rows-[20vh]"
    >
      <div
        v-if="images.length > 0"
        v-for="(image, index) in images"
        :key="index"
        class="image-container row-span-3"
        :class="image.perspective === 'landscape' ? 'col-span-6' : 'col-span-3'"
      >
        <img class="" :src="image.src" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase.config";

const images = ref([]);

onMounted(async () => {
  const imagesRef = collection(db, "images");
  const imagesSnapshot = await getDocs(imagesRef);

  // Use Promise.all to wait for all images to load
  const formattedImages = await Promise.all(
    imagesSnapshot.docs.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          console.log("H: ", img.height, "W: ", img.width);
          resolve({
            src: image.data().image.src,
            alt: image.data().image.alt,
            perspective: img.height > img.width ? "portrait" : "landscape",
          });
        };

        // Handle potential image loading errors
        img.onerror = () => {
          console.error("Failed to load image:", image.data().image.src);
          resolve({
            src: image.data().image.src,
            alt: image.data().image.alt,
            perspective: "unknown", // Default when image fails to load
          });
        };

        img.src = image.data().image.src;
      });
    })
  );

  images.value = formattedImages;
});
</script>

<style lang="scss" scoped></style>
