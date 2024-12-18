<template>
  <Navbar></Navbar>

  <div class="container p-4 mx-auto">
    <UInput
      color="primary"
      variant="outline"
      placeholder="Search..."
      v-model="name"
    />
    <UTable :rows="foods" :loading="loading" :columns="columns" @select="onSelect">
      <template #loading-state>
        <div class="flex items-center justify-center h-32">
          <i class="loader --6" />
        </div>
      </template>
    </UTable>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const name = ref("");
const foods = ref([]);
const loading = ref(false);

const columns = [
  {
    key: "Food_Id",
    label: "Food Id",
  },
  {
    key: "FoodName",
    label: "Food Name",
  },
  {
    key: "FoodNameEn",
    label: "Food Name En",
  },
];

watch(name, async (newName) => {
  if (newName.length < 3) {
    foods.value = [];
    return;
  }
  loading.value = true;
  const encodedName = encodeURIComponent(newName);
  const res = await fetch(`/api/search?foodName=${encodedName}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) =>
    res.json(),
  );
  loading.value = false;
  foods.value = res.body;
});


const onSelect = (food) => {
  navigateTo(`/foods/${food.Food_Id}`);
};
</script>
<style scoped>
.loader {
  --color: rgb(var(--color-primary-400));
  --size-mid: 6vmin;
  --size-dot: 1.5vmin;
  --size-bar: 0.4vmin;
  --size-square: 3vmin;

  display: block;
  position: relative;
  width: 50%;
  display: grid;
  place-items: center;
}

.loader::before,
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
}

/**
loader --6
**/
.loader.--6::before {
  width: var(--size-square);
  height: var(--size-square);
  background-color: var(--color);
  top: calc(50% - var(--size-square));
  left: calc(50% - var(--size-square));
  animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-6 {
  0%,
  100% {
    transform: none;
  }

  25% {
    transform: translateX(100%);
  }

  50% {
    transform: translateX(100%) translateY(100%);
  }

  75% {
    transform: translateY(100%);
  }
}
</style>
