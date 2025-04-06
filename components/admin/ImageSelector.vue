<template>
  <div class="mb-4 flex gap-2 flex-wrap">
    <div class="w-32">
      <img
        v-if="imageFilePreview"
        :src="imageFilePreview"
        class="image-container"
        alt=""
      />
      <div v-else class="bg-gray-300 border flex items-center p-2">
        <p class="text-center dark:text-darkMuted">No Image Selected</p>
      </div>
    </div>
    <div>
      <label class="block font-bold mb-2" for="image"> Select Image </label>
      <input
        required
        id="image"
        accept=".jpg,.jpeg,.webp"
        type="file"
        @change="handleSelectImage"
      />
      <p class="text-xs italic dark:text-dark">
        File name must end in .jpg, .jpeg, or .webp. Maximum file size: 1MB
      </p>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const imageFilePreview = ref(null);

const handleSelectImage = (event) => {
  emit("update:modelValue", event.target.files[0]);

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      imageFilePreview.value = e.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  } else {
    imageFilePreview.value = null;
  }
};
</script>

<style scoped></style>
