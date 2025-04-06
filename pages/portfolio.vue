<template>
  <div>
    <LayoutPageHeader header="Portfolio" />
    <div class="md:grid grid-cols-12 px-3 mx-auto gap-12">
      <div class="col-span-3">
        <h2 class="md:text-right mb-3">Books</h2>
      </div>
      <div class="col-span-9">
        <LayoutBook
          v-for="(book, index) in books"
          :book="book.data()"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
import { db } from "~/firebase.config";
const books = ref([]);

onMounted(async () => {
  const portfolioRef = collection(db, "portfolio");
  const snapshot = await getDocs(portfolioRef);
  books.value = snapshot.docs;
  console.log(books.value[0].data());
});
const novels = [
  {
    title: "Moby Dick",
    publisher: "Penguin",
    yearPublished: "2024",
    genre: "Novel",
    href: "https://google.com",
    image: { src: "/images/mobyDick.jpg", alt: "Moby Dick book cover" },
    description: [
      "This is the description for Moby Dick. It's a great book that literally everyone loves. Nobody thinks any part of it is boring.",
      "If you don't like this book, then people will judge you.",
    ],
  },
  {
    title: "Moby Dick",
    publisher: "Penguin",
    yearPublished: "2024",
    genre: "Novel",
    href: "https://google.com",
    image: { src: "/images/mobyDick.jpg", alt: "Moby Dick book cover" },
    description: [
      "This is the description for Moby Dick. It's a great book that literally everyone loves. Nobody thinks any part of it is boring.",
      "If you don't like this book, then people will judge you.",
    ],
  },
  {
    title: "Moby Dick",
    publisher: "Penguin",
    yearPublished: "2024",
    genre: "Novel",
    href: "https://google.com",
    image: { src: "/images/mobyDick.jpg", alt: "Moby Dick book cover" },
    description: [
      "This is the description for Moby Dick. It's a great book that literally everyone loves. Nobody thinks any part of it is boring.",
      "If you don't like this book, then people will judge you.",
    ],
  },
];
</script>

<style lang="scss" scoped></style>
