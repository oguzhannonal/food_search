<template>
  <Navbar></Navbar>

  <div class="container p-4 mx-auto">
    <div class="mb-6">
      <UFormGroup label="Token Name">
        <UInput v-model="tokenName" placeholder="Enter token name..." />
      </UFormGroup>
      <UButton
        color="primary"
        class="mt-2"
        @click="createToken"
        :loading="creating"
      >
        Create Token
      </UButton>
    </div>

    <UTable :rows="tokens" :columns="columns" :loading="loading">
      <template #actions-data="{ row }">
        <UButton
          color="red"
          variant="soft"
          icon="i-heroicons-trash"
          :loading="deletingId === row.id"
          @click="deleteToken(row)"
        />
      </template>
    </UTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const supabase = useSupabaseClient();
const tokenName = ref("");
const tokens = ref([]);
const loading = ref(true);
const creating = ref(false);
const deletingId = ref(null);

const columns = [
  {
    key: "name",
    label: "Token Name",
  },
  {
    key: "token",
    label: "API Token",
  },
  {
    key: "created_at",
    label: "Created At",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

const fetchTokens = async () => {
  loading.value = true;
  debugger;
  const data = await fetch("/api/token").then((res) => res.json());
  tokens.value = data.body;
  loading.value = false;
};

const createToken = async () => {
  if (!tokenName.value) return;

  creating.value = true;

  const response = await fetch("/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: tokenName.value }),
  }).then((res) => res.json());
  if (response) {
    tokenName.value = "";
    await fetchTokens();
  }
  creating.value = false;
};

const deleteToken = async (row) => {
  deletingId.value = row.id;
  const response = await fetch(`/api/token`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: row.id }),
  })
  debugger
  if (response.status === 200) {
    await fetchTokens();
  }
  deletingId.value = null;
};

onMounted(() => {
  fetchTokens();
});
</script>
