<template>
  <div class="card">
    <div class="mb-4">
      <label for="title"> Title </label>
      <input id="title" v-model="formData.title" required type="text" />
    </div>
    <div class="mb-4">
      <label for="author"> Author </label>
      <input id="author" v-model="formData.author" required type="text" />
    </div>
    <div class="mb-4">
      <label for="publisher"> Publisher </label>
      <input id="publisher" v-model="formData.publisher" required type="text" />
    </div>
    <div class="mb-4">
      <label for="yearPublished"> Year Published </label>
      <input
        id="yearPublished"
        v-model="formData.yearPublished"
        required
        type="text"
      />
    </div>
    <div class="mb-4">
      <label for="href"> Purchase Link </label>
      <input id="href" v-model="formData.href" required type="text" />
    </div>
    <div class="mb-4">
      <label for="description"> Description </label>
      <textarea id="description" v-model="formData.description" rows="4" />
    </div>
    <AdminImageSelector v-model:model-value="imageFile" />
    <div class="mb-4">
      <label for="alt"> Image Alternate Text </label>
      <input
        id="alt"
        v-model="formData.alt"
        type="text"
        placeholder="e.g. The Blue Ridge Mountains"
      />
    </div>
    <div class="flex gap-2">
      <button class="btn" @click="submitForm">
        <p>{{ book ? "Update" : "Submit" }}</p>
      </button>
      <button v-if="book" class="btn" @click="handleDeleteDocument">
        <p>Delete</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { deleteDoc, doc } from "firebase/firestore";
const emit = defineEmits(["update"]);
import useUploadDocument from "~/composables/admin/uploadDocument";
import useUpdateDocument from "~/composables/admin/updateDocument";
import useSnackbar from "~/composables/showSnackbar";
import { db } from "~/firebase.config";
const { book } = defineProps(["book"]);
const emptyForm = {
  title: "",
  author: "",
  alt: "",
  href: "",
  publisher: "",
  yearPublished: "",
  description: "",
};
const formData = ref(emptyForm);
const imageFile = ref(null);

onMounted(() => {
  if (book) {
    formData.value = {
      title: book.data().title || "",
      author: book.data().author || "",
      alt: book.data().alt || "",
      href: book.data().href || "",
      description: book.data().description || "",
      publisher: book.data().publisher || "",
      yearPublished: book.data().yearPublished || "",
    };
  }
});

const submitForm = async () => {
  if (book) {
    await useUpdateDocument(
      "portfolio",
      formData.value,
      imageFile.value,
      book.id
    );
    emit("update");
  } else {
    await useUploadDocument("portfolio", formData.value, imageFile.value);

    emit("update");
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(doc(db, "portfolio", book.id));
    useSnackbar("Document successfully deleted");
    emit("update");
  } catch {
    useSnackbar("Error deleting document");
  }
};
</script>

<style scoped>
input[type="text"],
textarea {
  @apply block p-2.5 shadow w-full text-sm bg-gray-50 rounded-lg border;
}

label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
