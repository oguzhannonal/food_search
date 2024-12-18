<template>
  <ClientOnly>
<div class="flex items-center justify-center bg-gray-100 h-full">
  <UCard class="w-full max-w-md">
    <UForm :state="formState" @submit="onSubmit">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <UFormGroup label="Email" name="email">
        <UInput v-model="email" type="email" placeholder="Enter your email" />
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="password" type="password" placeholder="Enter your password" />
      </UFormGroup>
      <UButton type="submit" color="primary" class="w-full" style="margin-top: 10px">
        Login
      </UButton>
    </UForm>
  </UCard>
</div>
</ClientOnly>
</template>

<script setup >
import { ref } from 'vue'
const supabase = useSupabaseClient()
const formState = ref({

})
const email = ref('')
const password = ref('')

const onSubmit = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    // Handle error case - you might want to show an error message
    console.error('Login error:', error.message)
    return
  }

  navigateTo('/search')
}
</script>
