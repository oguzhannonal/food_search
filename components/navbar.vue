<template>
    <div class=" flex flex-col">
      <div class="mb-auto border-t">
        <div class="container mx-auto p-4">
          <div class="flex justify-between items-center">
            <div class="flex gap-4">
              <UButton to="/search" variant="ghost">
                <Icon name="uil:search" class="mr-1" />
                Search
              </UButton>
              <UButton to="/api-management" variant="ghost">
                <Icon name="uil:setting" class="mr-1" />
                API Management
              </UButton>
            </div>
            <UButton color="primary" @click="onLogout">
              <Icon name="uil:signout" class="mr-1" />
              Sign Out
            </UButton>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>

const onLogout = async () => {
    const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Logout error:', error.message)
    return
  }

  navigateTo('/')

}

</script>

