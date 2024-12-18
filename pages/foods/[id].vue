<template>
  <Navbar></Navbar>

  <div class="container p-4 mx-auto">
    <UTable :rows="food"> </UTable>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
const route = useRoute();
const foodId = route.params.id;
let food = ref();

onBeforeMount(async () => {
  const res = await fetch(`/api/foods/${foodId}`).then((res) => res.json());
  food.value = [res.body];
});
</script>
