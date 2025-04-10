<template>
  <div class="p-1 mb-12">
    <LayoutPageHeader header="Events"></LayoutPageHeader>

    <div class="max-w-screen-lg px-3 mx-auto">
      <div class="md:grid grid-cols-12 px-auto my-12 gap-12">
        <h2 class="mb-3 text-2xl col-span-3">Upcoming</h2>
        <div class="col-span-9">
          <LayoutEvent
            v-for="(event, index) in upcomingEvents"
            :key="index"
            :event="event"
          />
          <p v-if="pastEvents.length === 0">No upcoming events to show</p>
        </div>
        <h2 class="mb-3 text-2xl col-span-3">Past</h2>
        <div class="col-span-9">
          <LayoutEvent
            v-for="(event, index) in pastEvents"
            :key="index"
            :event="event"
          />
          <p v-if="pastEvents.length === 0">No past events to show</p>
        </div>
      </div>
    </div>
    <div class="max-w-screen-lg px-3 mx-auto">
      <div class="md:grid grid-cols-12 px-auto my-12 gap-12">
        <h2 class="mb-3 text-2xl col-span-3">Submit</h2>
        <div class="col-span-9">
          <div class="border bg-backgroundAccent p-3 rounded-lg">
            <div v-if="!isContactFormSubmitted" class="flex flex-col gap-2">
              <label class="hidden" for="eventName">Event Name</label>
              <input
                v-model="eventName"
                placeholder="Event Name"
                id="eventName"
                required
                type="text"
                class="placeholder-dark bg-inherit"
              />
              <label class="hidden" for="email">Your Email</label>
              <input
                v-model="email"
                type="text"
                placeholder="Email"
                id="email"
                required
                class="placeholder-dark bg-inherit"
              />
              <label class="hidden" for="location">Location</label>
              <input
                v-model="location"
                type="text"
                placeholder="Location"
                id="location"
                required
                class="placeholder-dark bg-inherit"
              />
              <label class="hidden" for="date">Date</label>
              <input
                v-model="date"
                type="text"
                placeholder="Date"
                id="date"
                required
                class="placeholder-dark bg-inherit"
              />
              <label class="hidden" for="time">Time</label>
              <input
                v-model="time"
                type="text"
                placeholder="Time"
                id="time"
                required
                class="placeholder-dark bg-inherit"
              />
              <label class="hidden" for="externalLink">External Link</label>
              <input
                v-model="externalLink"
                type="text"
                placeholder="https://..."
                id="externalLink"
                required
                class="placeholder-dark bg-inherit"
              />

              <label class="hidden" for="description">Description</label>
              <textarea
                placeholder="Description"
                v-model="description"
                class="placeholder-dark border px-3 my-3"
                id="description"
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
const eventName = ref("");
const email = ref("");
const time = ref("");
const date = ref("");
const location = ref("");
const externalLink = ref("");
const description = ref("");
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
    eventName: eventName.value,
    email: email.value,
    location: location.value,
    time: time.value,
    date: date.value,

    description: description.value,
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
