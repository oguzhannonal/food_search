export default defineNuxtRouteMiddleware(async to =>{
    const user = useSupabaseUser()

    if(to.path === '/' || to.path === '/api'){
        return
    }

    if(!user.value){
      return navigateTo('/')
    }
})