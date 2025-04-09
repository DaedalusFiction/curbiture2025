<template>
  <div class="card">
    <AdminImageSelector v-model:model-value="imageFile" />
    <div class="mb-4">
      <label for="alt"> Alternate Text (for accessiblity) </label>
      <input
        id="alt"
        v-model="formData.alt"
        placeholder="Write a brief description"
        required
        type="text"
      />
    </div>

    <div class="flex gap-2">
      <button class="btn" @click="submitForm">
        {{ image ? "Update" : "Submit" }}
      </button>
      <button v-if="image" class="btn" @click="handleDeleteDocument">
        Delete
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
const { image } = defineProps(["image"]);
const emptyForm = {
  alt: "",
};
const formData = ref(emptyForm);
const imageFile = ref(null);

onMounted(() => {
  if (image) {
    formData.value = {
      alt: image.data().alt,
    };
  }
});

const submitForm = async () => {
  if (image) {
    await useUpdateDocument(
      "images",
      formData.value,
      imageFile.value,
      image.id
    );
    emit("update");
  } else {
    await useUploadDocument("images", formData.value, imageFile.value);

    emit("update");
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(doc(db, "images", image.id));
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
