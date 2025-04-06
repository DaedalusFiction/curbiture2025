<template>
  <div>
    <LayoutPageHeader header="Get in Touch" />
    <div
      class="flex flex-col md:grid grid-cols-12 px-3 gap-6 mx-auto max-w-screen-2xl"
    >
      <div class="col-span-6">
        <p class="md:text-3xl mb-3 md:mb-12">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta,
          harum. Id, asperiores.
        </p>

        <div class="flex flex-col md:grid grid-cols-12 gap-6">
          <div class="col-span-6">
            <h6 class="text-xs font-medium text-darkMuted dark:text-lightMuted">
              Call us
            </h6>

            <p class="text-xl link">
              <a :href="`tel:` + telephone">{{
                useFormatTelephone(telephone)
              }}</a>
            </p>
          </div>
          <div class="col-span-6">
            <h6 class="text-xs font-medium text-darkMuted dark:text-lightMuted">
              Email us
            </h6>
            <p class="text-xl">hello@fictionalweb.com</p>
          </div>
          <div class="col-span-6">
            <h6 class="text-xs font-medium text-darkMuted dark:text-lightMuted">
              Follow us
            </h6>
            <div>
              <p class="text-xl">Instagram</p>
            </div>
            <div>
              <p class="text-xl">Facebook</p>
            </div>
            <div>
              <p class="text-xl">Twitter</p>
            </div>
          </div>
          <div class="col-span-6">
            <h6 class="text-xs font-medium text-darkMuted dark:text-lightMuted">
              Fax us
            </h6>
            <p class="text-xl">please don't</p>
          </div>
        </div>
      </div>
      <div class="col-span-6">
        <h3>Contact Form</h3>
        <div v-if="!isContactFormSubmitted" class="flex flex-col gap-2">
          <label class="hidden" for="name">Name</label>
          <input
            v-model="name"
            placeholder="Name"
            id="name"
            required
            type="text"
            class="placeholder-dark dark:placeholder-light bg-inherit"
          />
          <label class="hidden" for="email">Email</label>
          <input
            v-model="email"
            type="text"
            placeholder="Email"
            id="email"
            required
            class="placeholder-dark dark:placeholder-light bg-inherit"
          />
          <label class="hidden" for="email">Email</label>
          <textarea
            placeholder="Tell us a bit about what's on your mind..."
            v-model="comment"
            class="placeholder-dark border px-3 my-3"
            id="comment"
          />
          <button
            @click="handleSubmitContactForm"
            :disabled="isButtonDisabled"
            class="btn"
          >
            Submit
          </button>
        </div>
        <p v-else>Thank you! We'll be in touch soon</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const isContactFormSubmitted = ref(false);
const isButtonDisabled = ref(false);
const name = ref("");
const email = ref("");
const comment = ref("");
import emailjs from "@emailjs/browser";
import useFormatTelephone from "~/composables/formatting/formatTelephone";
import { siteName, telephone } from "~/data";

const handleSubmitContactForm = () => {
  isButtonDisabled.value = true;
  const templateParams = {
    website: siteName,
    name: name.value,
    email: email.value,
    comment: comment.value,
  };
  email.value = "";
  try {
    emailjs
      .send(
        "service_t1yo7dn",
        "template_pfang7n",
        templateParams,
        "aMDOy4kUud9rd0Yg9"
      )
      .then(function () {
        isContactFormSubmitted.value = true;
      });
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<style scoped></style>
