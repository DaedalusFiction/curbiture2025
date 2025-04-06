<template>
  <div>
    <LayoutPageHeader header="Events"
      ><p class="text-center text-dark">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
        voluptatem dolores error architecto quo placeat voluptatum sed quasi
        aliquid obcaecati.
      </p></LayoutPageHeader
    >

    <div class="max-w-screen-lg px-3 mx-auto">
      <h3 class="text-3xl font-serif uppercase">Calendar of Events</h3>
      <div class="md:grid grid-cols-12 px-auto my-12 gap-12">
        <h2 class="mb-3 col-span-3">Upcoming</h2>
        <div class="col-span-9">
          <LayoutEvent
            v-for="(event, index) in upcomingEvents"
            :key="index"
            :event="event"
          />
        </div>
        <h2 class="mb-3 col-span-3">Past</h2>
        <div class="col-span-9">
          <LayoutEvent
            v-for="(event, index) in pastEvents"
            :key="index"
            :event="event"
          />
        </div>
      </div>
      <h4 class="text-3xl font-serif uppercase">Header Three</h4>
      <div class="py-12 mx-auto max-w-2xl">
        <iframe
          class="youtube-video mb-3 rounded-xl"
          src="https://www.youtube.com/embed/k2dlJQwZYQ0"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
      <h5 class="text-3xl font-serif uppercase">Inquiry Form</h5>
      <br />
      <p class="max-w-xl mx-auto text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi eius
        veniam harum perspiciatis, sit maiores.
      </p>
      <br />
      <div class="max-w-xl mx-auto border bg-backgroundAccent p-3 rounded-lg">
        <div v-if="!isContactFormSubmitted" class="flex flex-col gap-2">
          <label class="hidden" for="name">Name</label>
          <input
            v-model="name"
            placeholder="Name"
            id="name"
            required
            type="text"
            class="placeholder-dark bg-inherit"
          />
          <label class="hidden" for="email">Email</label>
          <input
            v-model="email"
            type="text"
            placeholder="Email"
            id="email"
            required
            class="placeholder-dark bg-inherit"
          />
          <label class="hidden" for="phoneNumber">Phone Number</label>
          <input
            v-model="phoneNumber"
            type="text"
            placeholder="Telephone"
            id="phoneNumber"
            required
            class="placeholder-dark bg-inherit"
          />
          <label class="hidden" for="organizationName">Organization Name</label>
          <input
            v-model="organizationName"
            type="text"
            placeholder="Organization Name"
            id="organizationName"
            required
            class="placeholder-dark bg-inherit"
          />
          <label class="hidden" for="positionName">Your Position</label>
          <input
            v-model="positionName"
            type="text"
            placeholder="Your Position"
            id="positionName"
            required
            class="placeholder-dark bg-inherit"
          />
          <label class="hidden" for="budget">Budget</label>
          <input
            v-model="budget"
            type="text"
            placeholder="Budget"
            id="budget"
            required
            class="placeholder-dark bg-inherit"
          />
          <label class="hidden" for="comment">Comment</label>
          <textarea
            placeholder="Additional Information"
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
        <div v-else>
          <p>Thank you so much!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import emailjs from "@emailjs/browser";
import { collection, getDocs } from "firebase/firestore";
import { siteName } from "~/data";
import { db } from "~/firebase.config";
const events = ref([]);
const upcomingEvents = ref([]);
const pastEvents = ref([]);
const name = ref("");
const email = ref("");
const phoneNumber = ref("");
const organizationName = ref("");
const positionName = ref("");
const budget = ref("");
const isButtonDisabled = ref(false);
const isContactFormSubmitted = ref(false);

onMounted(async () => {
  const eventsRef = collection(db, "events");
  const snapshot = await getDocs(eventsRef);
  events.value = snapshot.docs;
  const result = sortEvents(snapshot.docs);
  upcomingEvents.value = result.upcomingEvents;
  pastEvents.value = result.pastEvents;
});

function sortEvents(events) {
  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Initialize result objects
  const result = {
    upcomingEvents: [],
    pastEvents: [],
  };

  // Helper function to convert date string to comparable date object
  const getDateObject = (dateString) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
  };

  // Sort events into appropriate arrays
  events.forEach((event) => {
    const eventDate = getDateObject(event.data().date);

    if (eventDate.getTime() === today.getTime()) {
      // Today's events go to upcoming
      result.upcomingEvents.push({ ...event.data(), isToday: true });
    } else if (eventDate > today) {
      // Future events
      result.upcomingEvents.push({ ...event.data(), isToday: false });
    } else {
      // Past events
      result.pastEvents.push(event.data());
    }
  });

  // Sort upcoming events: today's events first, then by date
  result.upcomingEvents.sort((a, b) => {
    if (a.isToday && !b.isToday) return -1;
    if (!a.isToday && b.isToday) return 1;
    return new Date(a.date) - new Date(b.date);
  });

  // Sort past events by date (most recent first)
  result.pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Clean up temporary isToday property
  result.upcomingEvents = result.upcomingEvents.map(
    ({ isToday, ...event }) => event
  );

  return result;
}

const handleSubmitContactForm = () => {
  isButtonDisabled.value = true;
  const templateParams = {
    website: siteName,
    name: name.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    organizationName: organizationName.value,
    positionName: positionName.value,
    budget: budget.value,
    comment: comment.value,
  };
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

<style lang="scss" scoped></style>
