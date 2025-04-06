<template>
  <div>
    <select
      id="voice"
      :value="modelValue"
      class="text-black"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option class="text-black" v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
const { options, modelValue } = defineProps(["label", "options", "modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<style scoped>
label {
  @apply block text-gray-700 text-sm font-bold my-2;
}
</style>
