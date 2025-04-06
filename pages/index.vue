<template>
  <div class="max-w-screen-2xl mx-auto">
    <LayoutParallax />
    <section
      class="px-3 dark:bg-backgroundAccentDarkMode bg-backgroundAccent py-6 md:py-24"
    >
      <p
        class="text-center font-header uppercase mb-6 text-2xl md:text-5xl text-darkMuted dark:text-lightMuted"
      >
        Custom Branding
      </p>
      <div
        class="flex lg:grid grid-cols-12 flex-col gap-6 max-w-screen-lg mx-auto"
      >
        <div class="flex flex-col gap-3 col-span-6">
          <p class="text-xl font-bold uppercase text-center">Color Palettes</p>
          <div
            class="border lg:h-16 rounded-lg p-3 flex flex-col lg:flex-row justify-between items-center cursor-pointer hover:-translate-x-3 transition"
            :class="
              paletteOption.name === selectedPalette.name && '-translate-x-3'
            "
            v-for="(paletteOption, index) in paletteOptions"
            :style="`background:${paletteOption.background}`"
            :key="index"
            @click="handleChangePalette(paletteOption)"
          >
            <p class="text-xl uppercase font-header font-bold">
              {{ paletteOption.name }}
            </p>
            <div class="flex gap-3">
              <div
                class="rounded-full p-5"
                :style="`background:${paletteOption.primary}`"
              ></div>
              <div
                class="rounded-full p-5"
                :style="`background:${paletteOption.secondary}`"
              ></div>
              <div
                class="rounded-full p-5"
                :style="`background:${paletteOption.backgroundAccent}`"
              ></div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3 col-span-6">
          <p class="text-xl font-bold uppercase text-center">Typefaces</p>
          <div
            class="border lg:h-16 bg-background rounded-lg p-3 flex flex-col lg:flex-row justify-between items-center cursor-pointer hover:translate-x-3 transition"
            :class="
              typefaceOption.name === selectedTypeface.name && `translate-x-3`
            "
            v-for="(typefaceOption, index) in typefaceOptions"
            :key="index"
            @click="handleChangeTypefaces(typefaceOption)"
          >
            <p
              class="text-xl uppercase font-bold"
              :style="`font-family:${typefaceOption.header}`"
            >
              {{ typefaceOption.name }}
            </p>
            <div class="flex gap-3">
              <p
                class="text-xl uppercase"
                :style="`font-family:${typefaceOption.header}`"
              >
                {{ typefaceOption.header }}
              </p>
              <p class="text-xl" :style="`font-family:${typefaceOption.sans}`">
                {{ typefaceOption.sans }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p class="text-center italic mt-6">Or come up with your own!</p>
    </section>
    <section class="px-3 py-6 md:py-24">
      <div class="max-w-screen-xl mx-auto">
        <h2
          class="mb-3 text-2xl md:text-5xl text-darkMuted dark:text-lightMuted"
        >
          Header Two
        </h2>
        <div class="md:grid grid-cols-12 gap-6">
          <div
            v-for="(card, index) in menuPreview"
            :key="index"
            v-scroll-animation="{
              duration: 1,
              delay: 0.1 * (index + 1),
              translateY: 25,
            }"
            class="col-span-3"
          >
            <LayoutCard :card="card" />
          </div>
        </div>

        <div class="flex justify-end">
          <p>
            <NuxtLink class="link" to="/menu"
              >Explore <span class="text-2xl">&rarr;</span></NuxtLink
            >
          </p>
        </div>
      </div>
    </section>
    <section class="py-6 md:py-24 bg-backgroundAccent">
      <h3
        v-scroll-animation="{
          duration: 1,
          delay: 0.2,
          translateX: 25,
        }"
        class="text-3xl md:text-5xl my-8 text-center"
      >
        Header three
      </h3>
      <div
        class="max-w-screen-lg mx-auto px-3 flex flex-col md:grid grid-cols-12 gap-6"
      >
        <div
          v-scroll-animation="{
            duration: 1,
            delay: 0.2,
          }"
          class="col-span-6 bg-background dark:bg-backgroundAccentDarkMode border rounded-md"
        >
          <div class="flex flex-col justify-between h-full p-3">
            <div>
              <div
                class="image-container hover:brightness-110 transition cursor-pointer h-56"
              >
                <img src="/public/images/mountains5.webp" alt="" />
              </div>
              <div class="">
                <h3 class="text-3xl my-2">Subheader one</h3>
                <ul class="list-disc dark:marker:text-light">
                  <li><p>Lorem, ipsum dolor.</p></li>
                  <li><p>Lorem ipsum dolor sit amet.</p></li>
                  <li>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
                  </li>
                  <li><p>Lorem ipsum dolor sit.</p></li>
                </ul>
              </div>
            </div>

            <NuxtLink class="btn w-full max-w-full mt-3">Button</NuxtLink>
          </div>
        </div>
        <div
          v-scroll-animation="{
            duration: 1,
            delay: 0.3,
          }"
          class="col-span-6 bg-background dark:bg-backgroundAccentDarkMode border rounded-md"
        >
          <div class="flex flex-col justify-between h-full p-3">
            <div>
              <div
                class="image-container hover:brightness-110 transition cursor-pointer h-56"
              >
                <img src="/public/images/mountains5.webp" alt="" />
              </div>
              <div class="">
                <h3 class="text-3xl my-2">Subheader Two</h3>
                <ul class="list-disc dark:marker:text-light">
                  <li><p>Lorem, ipsum dolor.</p></li>
                  <li>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquam repellat fugiat ipsa!
                    </p>
                  </li>
                  <li>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
                  </li>
                  <li><p>Lorem ipsum dolor sit.</p></li>
                </ul>
              </div>
            </div>

            <NuxtLink class="btn w-full max-w-full mt-3">Button</NuxtLink>
          </div>
        </div>
      </div>
    </section>
    <section class="py-6 md:py-24 px-3">
      <div class="md:grid gap-12 grid-cols-12 max-w-screen-xl mx-auto">
        <div class="col-span-6">
          <h4
            v-scroll-animation="{
              duration: 1,
              delay: 0.3,
              translateY: 25,
            }"
            class="text-3xl md:text-5xl"
          >
            Header Four
          </h4>
        </div>
        <div class="col-span-6">
          <p class="md:text-2xl md:pt-16">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            quas neque cupiditate tempora in explicabo earum quidem quo. Facere,
            aut?
          </p>
          <br />
          <NuxtLink class="btn" to="/">Button</NuxtLink>
        </div>
      </div>
    </section>
    <section class="py-6 md:py-24 px-3">
      <div
        v-scroll-animation="{
          duration: 1,
          delay: 0.3,
          translateY: 25,
        }"
        class="md:grid grid-cols-12 md:px-6"
      >
        <div class="col-span-7 image-container h-72 md:h-full">
          <img src="/public/images/mountains2.webp" alt="alt text" />
        </div>
        <div
          class="col-span-5 bg-backgroundAccent dark:bg-secondary px-3 py-6 md:p-12 flex flex-col gap-6 md:gap-12 justify-between"
        >
          <h5 class="font-bold uppercase">Header Five</h5>
          <p class="md:text-4xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
            labore! Consequatur incidunt quia eveniet totam?
          </p>
          <NuxtLink class="btn" to="/">Button</NuxtLink>
        </div>
      </div>

      <div
        v-scroll-animation="{
          duration: 1,
          delay: 0.3,
          translateY: 25,
        }"
        class="flex flex-col-reverse md:grid grid-cols-12 md:px-6 mt-6"
      >
        <div
          class="col-span-5 bg-backgroundAccent dark:bg-secondary px-3 py-6 md:p-12 flex flex-col gap-6 md:gap-12 justify-between"
        >
          <h6 class="font-bold">Header Six</h6>
          <p class="md:text-4xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
            neque nemo ipsum?
          </p>
          <NuxtLink class="btn" to="/">Button</NuxtLink>
        </div>
        <div class="col-span-7 image-container h-72 md:h-full">
          <img src="/public/images/mountains3.webp" alt="alt text" />
        </div>
      </div>
    </section>

    <section class="py-6 md:py-24 px-3">
      <p
        v-scroll-animation="{
          duration: 1,
          delay: 0.3,
        }"
        class="text-4xl text-center max-w-[35ch] mx-auto px-3"
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>
      <br />
      <div
        v-scroll-animation="{
          duration: 1,
          delay: 0.3,
        }"
        class="flex justify-center mx-auto"
      >
        <NuxtLink class="btn" to="/">Button</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { menuPreview } from "~/content/menu";

const paletteOptions = [
  {
    name: "Wolf",
    primary: "#0f7173",
    secondary: "#df3b57",
    background: "#f7f0f0",
    backgroundAccent: "#e3dbdc",
  },
  {
    name: "Alpinist",
    primary: "#6F6866",
    secondary: "#38302E",
    background: "#CCDAD1",
    backgroundAccent: "#9CAEA9",
  },
  {
    name: "Vinyl",
    primary: "#3F292B",
    secondary: "#DB7F67",
    background: "#FFFBFC",
    backgroundAccent: "#DBBEA1",
  },
  {
    name: "Gardens",
    primary: "#D81E5B",
    secondary: "#4D5382",
    background: "#FFFFFF",
    backgroundAccent: "#F7EDE2",
  },
];

const typefaceOptions = [
  { name: "Professional", header: "Montserrat", sans: "SourceSans" },
  { name: "Contemporary", header: "Syne", sans: "Inter" },
  { name: "Technical", header: "Karla", sans: "Inconsolata" },
  { name: "Refined", header: "Oswald", sans: "Lora" },
];

const selectedPalette = ref(paletteOptions[0]);
const selectedTypeface = ref(typefaceOptions[0]);

onMounted(() => {
  const root = document.documentElement;
  const primaryColor =
    getComputedStyle(root).getPropertyValue("--color-primary");
  const headerFont = getComputedStyle(root).getPropertyValue("--font-header");
  typefaceOptions.forEach((option) => {
    if (option.header === headerFont) {
      selectedTypeface.value = option;
    }
  });
  paletteOptions.forEach((option) => {
    if (option.primary === primaryColor) {
      selectedPalette.value = option;
    }
  });
});

const handleChangeTypefaces = (typefaceSet) => {
  selectedTypeface.value = typefaceSet;
  document.documentElement.style.setProperty(
    "--font-header",
    typefaceSet.header
  );
  document.documentElement.style.setProperty("--font-sans", typefaceSet.sans);
};
const handleChangePalette = (palette) => {
  selectedPalette.value = palette;
  document.documentElement.style.setProperty(
    "--color-primary",
    palette.primary
  );
  document.documentElement.style.setProperty(
    "--color-secondary",
    palette.secondary
  );
  document.documentElement.style.setProperty(
    "--color-background",
    palette.background
  );
  document.documentElement.style.setProperty(
    "--color-background-accent",
    palette.backgroundAccent
  );
};
</script>

<style scoped></style>
