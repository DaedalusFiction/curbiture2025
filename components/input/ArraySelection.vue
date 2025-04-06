<template>
  <div>
    <div class="flex w-full gap-3">
      <input
        type="text"
        class="input-text mb-2"
        v-model="tagInput"
        @input="filterTags"
        @change="addTag"
        :placeholder="'Add ' + fkey"
        :list="fkey + '-options'"
      />
      <datalist :id="fkey + '-options'">
        <option
          v-for="option in props.inputOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </datalist>
      <!-- <button @click="addTag">
                <IconsAddCircle color="white" />
            </button> -->
    </div>
    <div class="flex my-2 gap-2 flex-wrap">
      <div v-for="tag in modelValue" :key="tag" class="chip">
        <span>{{ tag }}</span>
        <button
          type="button"
          @click="removeTag(tag)"
          class="hover:rotate-90 transition"
        >
          <IconsCancelCircle />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps(["modelValue", "inputOptions", "fkey"]);
const emit = defineEmits(["update:modelValue"]);
const tagInput = ref("");
const filteredTags = computed(() =>
  props.inputOptions.filter((option) =>
    option.toLowerCase().includes(tagInput.value.toLowerCase())
  )
);

const addTag = () => {
  if (
    filteredTags.value.includes(tagInput.value) &&
    !props.modelValue.includes(tagInput.value)
  ) {
    emit("update:modelValue", [...props.modelValue, tagInput.value]);
    tagInput.value = "";
  }
};

const removeTag = (tag) => {
  emit(
    "update:modelValue",
    props.modelValue.filter((t) => t !== tag)
  );
};
const filterTags = () => {
  filteredTags.value = props.inputOptions.filter((option) =>
    option.toLowerCase().includes(tagInput.value.toLowerCase())
  );
};
</script>

<style scoped>
.chip {
  @apply p-1 pl-2 flex gap-1 items-center border border-black bg-primary dark:bg-primaryDarkMode rounded-full;
}
</style>
