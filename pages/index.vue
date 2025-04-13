<template>
  <div class="max-w-screen-2xl mx-auto relative p-1">
    <div class="flex flex-col md:grid grid-cols-12 auto-rows-[20vh] gap-1">
      <!-- panel one -->
      <div class="col-span-6 row-span-4 flex min-h-64">
        <div
          class="border grow p-1 bg-backgroundAccent flex flex-col justify-between"
        >
          <div class="flex flex-col gap-1">
            <NuxtLink to="/events" class="uppercase">Events</NuxtLink>
            <NuxtLink to="/gallery" class="uppercase">Gallery</NuxtLink>
          </div>
          <h1 class="text-primary top-3 text-5xl lg:text-7xl">Curbiture</h1>
          <p class="text-end">Charlottesville Alternative</p>
        </div>
      </div>
      <!-- panel two -->
      <div class="col-span-6 row-span-3 border image-container">
        <img src="/public/images/VWVan.webp" alt="" />
      </div>
      <div class="col-span-3 row-span-1 border p-1 flex items-end min-h-32">
        <p>Events & Miscellanea</p>
      </div>
      <div class="col-span-3 row-span-4 border image-container">
        <video
          autoplay
          loop
          muted
          playsinline
          disablePictureInPicture
          src="/public/videos/chinchillas.mp4"
          class="video"
        ></video>
      </div>
      <div class="col-span-4 row-span-2 border image-container">
        <img
          src="/public/images/highHeel.webp"
          alt="high heel next a sign that says look what your $ does for me!"
        />
      </div>
      <div class="col-span-5 row-span-4 border image-container">
        <img src="/public/images/daedalus1.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-4 row-span-1 border p-1 flex items-center min-h-32"
      >
        <p>LGBTQIA+</p>
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-4 row-span-3 border image-container"
      >
        <img src="/public/images/herbs.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-3 row-span-1 border p-1 flex items-center min-h-32 bg-backgroundAccent"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem quo
          doloremque odio.
        </p>
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-3 row-span-2 border image-container"
      >
        <img src="/public/images/sunset.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-5 row-span-4 border image-container"
      >
        <img src="/public/images/24Sign.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-7 row-span-1 border p-1 flex items-center min-h-32 bg-backgroundAccent"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptas, ad officiis corrupti non ullam sit provident ab earum
          consequuntur vel commodi natus.
        </p>
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-3 row-span-3 border image-container"
      >
        <img src="/public/images/origamiJesus.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-4 row-span-2 border image-container"
      >
        <img src="/public/images/alethea.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-5 row-span-1 border p-1 flex items-center min-h-32"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptas, ad officiis corrupti non ullam sit provident ab earum
          consequuntur.
        </p>
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-2 row-span-1 border p-1 flex items-center min-h-32"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptas, ad officiis corrupti non ullam sit provident.
        </p>
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-7 row-span-3 border image-container"
      >
        <img src="/public/images/aspenAndWinston.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-5 row-span-3 border image-container"
      >
        <img src="/public/images/gummies.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-3 row-span-3 border image-container"
      >
        <img src="/public/images/cardboardPoem.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-4 row-span-2 border image-container"
      >
        <img src="/public/images/infiniteEre.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-3 row-span-1 border p-1 flex items-center min-h-32"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptas, ad officiis corrupti non ullam sit provident ab earum
          consequuntur vel commodi natus, nisi autem?
        </p>
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-2 row-span-3 border image-container"
      >
        <img src="/public/images/frostFlowers.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-3 row-span-2 border image-container"
      >
        <img src="/public/images/teaHouse.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-4 row-span-1 border p-1 flex items-center min-h-32"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptas, ad officiis corrupti non ullam sit provident ab earum
          consequuntur vel commodi natus, nisi autem?
        </p>
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-5 row-span-2 border image-container"
      >
        <img src="/public/images/sadie.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-2 row-span-4 border image-container"
      >
        <img src="/public/images/horses.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-2 row-span-3 border image-container"
      >
        <img src="/public/images/pizzaBox.webp" alt="" />
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-3 row-span-1 border p-1 flex items-center min-h-32"
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptas, ad officiis corrupti non ullam sit provident ab earum
          consequuntur vel commodi natus, nisi autem?
        </p>
      </div>
      <div
        v-scroll-animation="animationOptions"
        class="col-span-8 row-span-2 border image-container"
      >
        <img src="/public/images/pumpkins.webp" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
const animationOptions = { translateY: 10, delay: 0.2, threshold: 0.5 };
</script>

<style scoped>
.hero-header {
  font-size: clamp(3rem, 15vw, 17rem);
  mix-blend-mode: difference;
}

.image-container img,
.image-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

img {
  @apply transition duration-700 hover:invert;
}
</style>
