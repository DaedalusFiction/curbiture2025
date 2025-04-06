<template>
  <div class="card">
    <div class="mb-4">
      <label for="name"> Name </label>
      <input id="name" v-model="formData.name" required type="text" />
    </div>

    <div class="mb-4">
      <label for="text"> Bio </label>
      <textarea
        id="bio"
        v-model="formData.bio"
        rows="4"
        class="block p-2.5 w-full bg-gray-50 shadow rounded-lg border"
      />
    </div>

    <AdminImageSelector v-model:model-value="imageFile" />

    <div class="flex gap-2">
      <button class="btn" @click="submitForm">
        <p>{{ contributor ? "Update" : "Submit" }}</p>
      </button>
      <button v-if="contributor" class="btn" @click="handleDeleteDocument">
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
const { contributor } = defineProps(["contributor"]);
const emptyForm = {
  name: "",
  bio: "",
};
const formData = ref(emptyForm);
const imageFile = ref(null);

onMounted(() => {
  if (contributor) {
    formData.value = {
      name: contributor.data().name,
      bio: contributor.data().bio,
    };
  }
});

const submitForm = async () => {
  if (contributor) {
    await useUpdateDocument(
      "contributors",
      formData.value,
      imageFile.value,
      contributor.id
    );
    emit("update");
  } else {
    await useUploadDocument("contributors", formData.value, imageFile.value);

    emit("update");
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(doc(db, "contributors", contributor.id));
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
