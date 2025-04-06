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
      <label for="hook"> Hook </label>
      <textarea id="hook" v-model="formData.hook" rows="4" />
    </div>
    <div class="mb-4">
      <label for="text"> Article Text </label>
      <textarea
        id="text"
        v-model="formData.text"
        rows="4"
        class="block p-2.5 w-full bg-gray-50 shadow rounded-lg border"
      />
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
        <p>{{ article ? "Update" : "Submit" }}</p>
      </button>
      <button v-if="article" class="btn" @click="handleDeleteDocument">
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
const { article } = defineProps(["article"]);
const emptyForm = {
  title: "",
  author: "",
  alt: "",
  hook: "",
  text: "",
};
const formData = ref(emptyForm);
const imageFile = ref(null);

onMounted(() => {
  if (article) {
    formData.value = {
      title: article.data().title,
      author: article.data().author,
      alt: article.data().alt,
      hook: article.data().hook,
      text: article.data().text,
    };
  }
});

const submitForm = async () => {
  if (article) {
    await useUpdateDocument(
      "articles",
      formData.value,
      imageFile.value,
      article.id
    );
    emit("update");
  } else {
    await useUploadDocument("articles", formData.value, imageFile.value);
    emit("update");
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(doc(db, "articles", article.id));
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
