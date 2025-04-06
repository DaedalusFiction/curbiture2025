<template>
  <div class="card">
    <div class="mb-4">
      <label for="message"> Message </label>
      <input id="message" v-model="formData.message" required type="text" />
    </div>

    <div class="flex gap-2">
      <button class="btn" @click="submitForm">Set</button>
      <button v-if="video" class="btn" @click="handleDeleteDocument">
        Clear
      </button>
    </div>
  </div>
</template>

<script setup>
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { jsx } from "vue/jsx-runtime";
const emit = defineEmits(["update"]);
import useSnackbar from "~/composables/showSnackbar";
import { db } from "~/firebase.config";
const { video } = defineProps(["video"]);
const emptyForm = {
  message: "",
};
const formData = ref(emptyForm);

const submitForm = async () => {
  try {
    const docRef = doc(db, "restaurant", "banner");
    const uploadTask = await setDoc(docRef, {
      message: formData.value.message,
    });
    emit("update");
    useSnackbar("Banner set!");
  } catch (error) {
    console.log(error.message);
    useSnackbar("Error creating banner message.");
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(doc(db, "restaurant/banner/message", video.id));
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
