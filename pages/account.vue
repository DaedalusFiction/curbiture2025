<template>
  <div>
    <h2 class="page-header">Account</h2>
    <div v-if="firebaseUser">
      <div class="max-w-3xl flex flex-col gap-6 mx-auto">
        <h4 class="setting-header">Details</h4>
        <div class="setting">
          <div>
            <p>Email Address</p>
            <p class="text-xs text-[var(--color-text-muted)]">
              Sign out to sign in with another email address.
            </p>
          </div>
          <p>{{ googleUser.email }}</p>
        </div>
        <div class="setting">
          <div>
            <p>Total Contributions</p>
            <p class="text-xs text-[var(--color-text-muted)]">
              Sign out and back in to update
            </p>
          </div>
          <p>{{ firebaseUser.contributions || "0" }}</p>
        </div>
        <h4 class="setting-header">Settings</h4>
        <div class="setting">
          <div>
            <p>Display Name</p>
          </div>
          <div class="flex gap-2">
            <input maxlength="25" type="text" v-model="displayName" /><button
              @click="handleUpdateFirebaseProfile"
              class="btn"
              :class="displayName === firebaseUser.displayName && 'bg-gray-400'"
              :disabled="displayName === firebaseUser.displayName"
            >
              Update
            </button>
          </div>
        </div>
        <div class="setting">
          <div>
            <p>Hide Profile</p>
            <p class="text-xs text-[var(--color-text-muted)]">
              Hidden profiles will not show up under Top Contributors
            </p>
          </div>
          <input
            type="checkbox"
            v-model="profileHidden"
            @change="handleUpdateFirebaseProfile"
          />
        </div>
        <h4 class="setting-header">Account actions</h4>
        <div class="setting">
          <p>Sign out</p>
          <button @click="handleLogout">
            <p class="underline">Sign out</p>
          </button>
        </div>
        <div class="setting">
          <div>
            <p>Delete Account</p>
            <p class="text-xs text-[var(--color-text-muted)]">
              This action is permanent. You will not be able to recover your
              information.
            </p>
          </div>
          <ButtonConfirm
            :action="handleLogout"
            title="Delete"
            text="Are you sure you want to delete your profile? You will not be able to recover it."
            :critical="true"
            @confirm="handleDeleteFirebaseProfile"
          />
        </div>
      </div>
    </div>
    <p v-else>
      Please
      <button class="underline" @click="handleLogin">
        sign in with Google
      </button>
      to view your account settings.
    </p>
  </div>
</template>

<script setup>
import { deleteUser, getAuth } from "firebase/auth";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import useLogin from "~/composables/login";
import useSnackbar from "~/composables/showSnackbar";
import { db } from "~/firebase.config";

const firebaseUser = useState("firebaseUser");
const googleUser = useState("googleUser");
const firebaseID = useState("firebaseID");
const updateButtonDisabled = ref(false);

const profileHidden = ref(false);
const displayName = ref("");

const handleLogin = async () => {
  await useLogin("in");
  profileHidden.value = firebaseUser.value.profileHidden || false;
  displayName.value = firebaseUser.value.displayName || "BSDB User";
};
const handleLogout = () => {
  firebaseUser.value = null;
  googleUser.value = null;
};
const handleUpdateFirebaseProfile = async () => {
  const userDocRef = doc(db, "users", firebaseID.value);
  updateButtonDisabled.value = true;
  try {
    await updateDoc(userDocRef, {
      displayName: displayName.value,
      profileHidden: profileHidden.value,
    });
    const user = await getDoc(userDocRef);
    firebaseUser.value = user.data();

    updateButtonDisabled.value = false;
  } catch {
    useSnackbar(
      "Error Updating Profile. Please reload this page and try again."
    );
    updateButtonDisabled.value = false;
  }
};

const handleDeleteFirebaseProfile = async () => {
  const userDocRef = doc(db, "users", firebaseID.value);
  const auth = getAuth();
  const user = auth.currentUser;

  await deleteUser(user)
    .then(async () => {
      await deleteDoc(userDocRef);
      handleLogout();
      // User deleted.
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
};
</script>

<style scoped>
.setting {
  @apply flex justify-between;
}

.setting-header {
  @apply border-t  pt-2;
}
</style>
