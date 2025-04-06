<template>
  <div>
    <LayoutPageHeader header="Charlottesville" />
    <div class="max-w-screen-xl mx-auto px-3">
      <h2 class="text-2xl md:text-5xl max-w-full text-center uppercase">
        How it works
      </h2>
      <br />
      <div class="flex flex-col md:grid grid-cols-12 gap-6 p-3">
        <div class="col-span-6">
          <p class="max-w-full md:text-right font-bold text-3xl uppercase">
            Step 1: Choose Your Protein
          </p>
        </div>
        <div class="col-span-6">
          <div v-for="(protein, index) in proteins" :key="index">
            <p class="font-bold text-xl">
              {{ protein.name }}<span v-if="protein.isVegan"> (V)</span
              ><span class="align-super text-xs" v-if="protein.isRaw"
                >&sect;</span
              >
            </p>
            <p class="ml-3">{{ protein.description }}</p>
          </div>
        </div>
      </div>
      <br />
      <div class="flex flex-col md:grid grid-cols-12 gap-6 p-3">
        <div class="col-span-6">
          <p class="max-w-full md:text-right font-bold text-3xl uppercase">
            Step 2: Choose Your Rice
          </p>
        </div>
        <div class="col-span-6">
          <p
            class="font-bold text-xl"
            v-for="(rice, index) in rices"
            :key="index"
          >
            {{ rice.name }}<span v-if="rice.isVegan"> (V)</span
            ><span class="align-super text-xs" v-if="rice.isRaw">&sect;</span>
          </p>
        </div>
      </div>
      <br />
      <div class="flex flex-col md:grid grid-cols-12 gap-6 p-3">
        <div class="col-span-6">
          <p class="max-w-full md:text-right font-bold text-3xl uppercase">
            Step 3: Add Sides
          </p>
        </div>
        <div class="col-span-6">
          <div v-for="(side, index) in sides" :key="index">
            <p class="font-bold text-xl">
              {{ side.name }}<span v-if="side.isVegan"> (V)</span
              ><span class="align-super text-xs" v-if="side.isRaw">&sect;</span>
            </p>
            <p class="ml-3">{{ side.description }}</p>
          </div>
        </div>
      </div>
      <br />
      <div class="flex flex-col md:grid grid-cols-12 gap-6 p-3">
        <div class="col-span-6">
          <p class="max-w-full md:text-right font-bold text-3xl uppercase">
            Step 4: Choose Add-ons
          </p>
        </div>
        <div class="col-span-6">
          <div v-for="(addOn, index) in addons" :key="index">
            <p class="font-bold text-xl">
              {{ addOn.name }}<span v-if="addOn.isVegan"> (V)</span
              ><span class="align-super text-xs" v-if="addOn.isRaw"
                >&sect;</span
              >
            </p>
            <p class="ml-3">{{ addOn.description }}</p>
          </div>
        </div>
      </div>
      <br />

      <p class="max-w-full text-center btn mx-auto">
        <NuxtLink to="/">Order Now</NuxtLink>
      </p>
      <br />
      <section>
        <h3 class="text-2xl md:text-5xl max-w-full text-center uppercase">
          Bowls
        </h3>
        <p class="max-w-full text-center italic">Served with choice of rice</p>
        <br />
        <div class="flex flex-col md:grid grid-cols-9 lg:grid-cols-12 gap-3">
          <div
            class="col-span-3"
            v-for="(pokeBowl, index) in pokeBowls"
            :key="index"
          >
            <LayoutCard :card="pokeBowl" />
          </div>
        </div>
      </section>
      <br />
      <section>
        <h3 class="text-2xl md:text-5xl max-w-full text-center uppercase">
          Kids' Meals
        </h3>
        <p class="max-w-full text-center italic">
          Served with white rice and one vegetable side
        </p>
        <br />
        <div class="flex flex-col md:grid grid-cols-9 lg:grid-cols-12 gap-3">
          <div
            class="col-span-3"
            v-for="(kidsMeal, index) in kidsMeals"
            :key="index"
          >
            <LayoutCard :card="kidsMeal" />
          </div>
        </div>
      </section>
      <br />
      <section>
        <h3 class="text-2xl md:text-5xl max-w-full text-center uppercase">
          Desserts
        </h3>
        <br />
        <div class="flex flex-col md:grid grid-cols-9 lg:grid-cols-12 gap-3">
          <div
            class="col-span-3"
            v-for="(dessert, index) in desserts"
            :key="index"
          >
            <LayoutCard :card="dessert" />
          </div>
        </div>
      </section>
      <br />
      <section>
        <h3 class="text-2xl md:text-5xl max-w-full text-center uppercase">
          Extras
        </h3>
        <br />
        <div class="flex flex-col md:grid grid-cols-9 lg:grid-cols-12 gap-3">
          <div class="col-span-3" v-for="(extra, index) in extras" :key="index">
            <LayoutCard :card="extra" />
          </div>
        </div>
      </section>
    </div>
    <div class="flex justify-center">
      <div class="max-w-[35ch]">
        <p class="text-center italic text-sm">* Gluten-free soy sauce</p>
        <p class="text-center italic text-sm">(V) Vegan</p>
        <p class="text-center italic text-sm">
          &sect; Consuming raw or undercooked meats, poultry, seafood,
          shellfish, or eggs may increase your risk of foodborne illness
        </p>
      </div>
    </div>
    <br />
  </div>
</template>

<script setup>
import {
  addons,
  desserts,
  extras,
  kidsMeals,
  pokeBowls,
  proteins,
  rices,
  sides,
} from "~/content/menu";
</script>

<style scoped></style>
