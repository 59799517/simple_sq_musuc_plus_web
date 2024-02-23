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
<n-form @keyup.enter.native="loginp">
  <div class=" ">
    <div class="">
      <h2 class=" home ">登录</h2>
      <n-input class=""  size="large" type="text" v-model:value="username" placeholder="请输入用户名"  />
      <br/>
      <n-input class="" size="large" type="password" v-model:value="password" placeholder="请输入密码"  show-password-on="mousedown" />
      <div class="home" > <n-button class= "" type="primary" @click="loginp" :keyboard="true">Login</n-button>
      </div>
    </div>
  </div>
</n-form>

  <n-message-provider>
    <content />
  </n-message-provider>
</template>

<style scoped>
.home{
  display: flex;
  place-items: center;
  flex-direction: row;
  justify-content: center ;
}
</style>
