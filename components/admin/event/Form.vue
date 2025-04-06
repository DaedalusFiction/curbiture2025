<template>
  <div class="card">
    <div class="mb-4">
      <label for="title"> Title </label>
      <input id="title" v-model="formData.title" required type="text" />
    </div>
    <div class="mb-4">
      <label for="time"> Time </label>
      <input id="time" v-model="formData.time" required type="text" />
    </div>
    <div class="mb-4">
      <label for="location"> Location name </label>
      <input id="location" v-model="formData.location" required type="text" />
    </div>
    <div class="mb-4">
      <label for="address1"> Address line one </label>
      <input id="address1" v-model="formData.address1" required type="text" />
    </div>
    <div class="mb-4">
      <label for="address2"> Address line two </label>
      <input id="address2" v-model="formData.address2" required type="text" />
    </div>
    <div class="mb-4">
      <label for="href"> Link to external event site </label>
      <input
        id="href"
        v-model="formData.href"
        required
        type="text"
        placeholder="https://"
      />
      <p class="text-sm italic"></p>
    </div>
    <div class="mb-4">
      <label for="date"> Date </label>
      <input
        id="date"
        class="p-2 rounded cursor-pointer"
        v-model="formData.date"
        required
        type="date"
      />
    </div>
    <div class="mb-4">
      <label for="description"> Description of event </label>
      <textarea id="description" v-model="formData.description" rows="4" />
    </div>
    <AdminImageSelector v-model:model-value="imageFile" />
    <div class="mb-4">
      <label for="alt"> Image alternate text </label>
      <input
        id="alt"
        v-model="formData.alt"
        type="text"
        placeholder="Write a brief description of the image used for accessibility purposes"
      />
    </div>
    <div class="flex gap-2">
      <button class="btn" @click="submitForm">
        <p>{{ event ? "Update" : "Submit" }}</p>
      </button>
      <button v-if="event" class="btn" @click="handleDeleteDocument">
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
const { event } = defineProps(["event"]);
const emptyForm = {
  title: "",
  location: "",
  address1: "",
  address2: "",
  time: "",
  date: "",
  href: "",
  description: "",
};
const formData = ref(emptyForm);
const imageFile = ref(null);

onMounted(() => {
  if (event) {
    formData.value = {
      title: event.data().title || "",
      location: event.data().location || "",
      address1: event.data().address1 || "",
      address2: event.data().address1 || "",
      time: event.data().time || "",
      href: event.data().href || "",
      date: event.data().date || "",
      description: event.data().description || "",
    };
  }
});

const submitForm = async () => {
  if (!formData.value.title) {
    useSnackbar("Please enter a title for the event");
    return;
  }
  if (!formData.value.time) {
    useSnackbar("Please enter a time for the event");
    return;
  }
  if (!formData.value.date) {
    useSnackbar("Please enter a date for the event");
    return;
  }
  if (event) {
    await useUpdateDocument(
      "events",
      formData.value,
      imageFile.value,
      event.id
    );
    emit("update");
  } else {
    await useUploadDocument("events", formData.value, imageFile.value);
    emit("update");
  }
};
const handleDeleteDocument = async () => {
  try {
    await deleteDoc(doc(db, "events", event.id));
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
