<script setup>

import TopWitge from "./TopWitge.vue";
import {downloadParser} from "../utils/api.js";


let value=ref('')


let download = ()=>{
  downloadParser(value.value).then(value=>{
    if (value.data.code === 200) {
      window.$message.success("操作成功")
    }else{
      window.$message.error("操作失败："+value.data.msg)
    }
  })
}

</script>

<template>
  <TopWitge/>
  <n-space vertical>
    <n-input :autosize="true"
        v-model:value="value"
        type="textarea"
        placeholder="请输入解析的歌单信息"
    />
  </n-space>
  <n-divider>注释:转换请参考：https://yyrcd.com/n2s/</n-divider>
  <div class="page">
    <n-button @click="download">提交</n-button>
  </div>
</template>

<style scoped>
.page{
  display: flex;
  place-items: center;
  flex-direction: row;
  justify-content: center ;
}
</style>