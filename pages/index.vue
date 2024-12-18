<script setup>
import { ref, onBeforeMount } from "vue";
import Login from "../views/login.vue";


const isAuth = ref(false);
const isLoading = ref(false);
onBeforeMount(async () => {
  const supabase = useSupabaseClient();
  isLoading.value = true;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  isLoading.value = false;
  if (user) {
    isAuth.value = true;
    navigateTo("/search");
  }
});
</script>

<template>
  <div v-if="isLoading"></div>
  <div v-else>
    <Login v-if="!isAuth" />
  </div>
</template>
