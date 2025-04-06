<template>
  <div class="pb-3 mb-3 border-b">
    <h4 class="text-3xl">{{ event.title }}</h4>
    <p>{{ new Date(event.date).toLocaleDateString() }}, {{ event.time }}</p>
    <p>{{ event.location }}</p>
    <p>{{ event.address1 }}</p>
    <p>{{ event.address2 }}</p>
    <br />
    <p class="whitespace-pre-wrap">{{ event.description }}</p>
    <br />
    <p class="underline link">
      <a :href="event.href" rel="noreferrer" target="_blank"
        >More Information</a
      >
    </p>
  </div>
</template>

<script setup>
const { event } = defineProps(["event"]);
</script>

<style lang="scss" scoped></style>
