<script setup>

import {getAllSet, isLogin, login} from "../utils/api.js";
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
let loginp =()=>{
  login(username.value,password.value).then((value)=>{
    window.localStorage.setItem("token", JSON.stringify(value.data.tokenValue))
    if(value.data.code===200){
      window.localStorage.setItem("token",value.data.data.tokenValue)

      getAllSet().then((value)=>{
        window.localStorage.setItem("setinfo",JSON.stringify(value.data.data))
      })
      router.push({path:"/search"});
    }else{
      window.$message.error(value.data.msg)
    }
  })
}
let username = ref("");
let password = ref("");
onBeforeMount(()=>{
  isLogin().then((value)=>{
    if (value.data.code===200){
      router.push({path:"/search"});
    }
  })
})

</script>

<template>
<!--  <n-modal :show="showModal">-->
<!--    <n-card style="width: 600px" title="登录成功" size="huge" :bordered="false" role="dialog" aria-modal="true">-->
<!--      返回-->
<!--    </n-card>-->
<!--  </n-modal>-->

  <div class="flex flex-col w-screen h-screen  bg-gray-50  items-center justify-center ">
    <div class="w-100 h-70 p-8 flex flex-col items-center bg-gray-300 rounded-lg border border-gray-400">
      <h2 class="text-2xl md:text-3xl font-bold text-indigo-900">登录</h2>
      <n-input class="h-10 my-3 w-9/4" type="text" v-model:value="username" placeholder="请输入用户名" required />
      <n-input class="h-10 my-3 w-9/12" type="password" v-model:value="password" placeholder="请输入密码" required/>
      <n-button class="h-10 w-3/4 my-3  rounded-lg" type="primary" @click="loginp">Login</n-button>
    </div>
  </div>
  <n-message-provider>
    <content />
  </n-message-provider>
</template>

<style scoped>

</style>