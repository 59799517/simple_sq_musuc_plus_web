<script setup>


import {getAllSet, isLogin, modifySet} from "../utils/api.js";
import TopWitge from "./TopWitge.vue";

let setinfodata = window.localStorage.getItem("setinfo");
let setinfo = ref(JSON.parse(setinfodata));
// onBeforeMount(()=>{
//
//   getAllSet().then((value)=>{
//       console.log("alei：",JSON.stringify(value.data.data))
//       window.localStorage.setItem("setinfo",JSON.stringify(value.data.data))
//
//   })
//
// })
let showModal = ref(false)
let selectValue =ref("")
let selectType =ref("input")
let selectName =ref("")
let selectConfigKey =ref("")
let openDialog = (type,name,oldValue,configKey)=>{
  showModal.value=true
  selectType.value=type
  if(type==="switch"){
      selectValue=ref(oldValue==="true")
  }else{
    selectValue.value=oldValue
  }
  selectName.value=name
  selectConfigKey.value=configKey
}

let  closeDialog = ()=>{
  showModal.value=false
  selectValue.value=''
  selectType.value='input'
  selectName.value=''
  selectConfigKey.value=''
}

let setData=()=>{
  showModal.value=false
  modifySet(selectConfigKey.value,selectValue.value).then(cv=>{
    if (cv.data.code===200){
      showModal.value=false
      selectValue.value=''
      selectType.value='input'
      selectName.value=''
      selectConfigKey.value=''
      getAllSet().then((value)=>{
        window.localStorage.setItem("setinfo",JSON.stringify(value.data.data))
        setinfo.value =value.data.data
      })
    }else{
      window.$message.error("错误信息："+cv.data.msg)
    }
  })

}
</script>

<template>
  <TopWitge/>
  <n-card title="设置">
    <n-list v-for="(item, index) in setinfo">
      <n-list-item>
        <n-thing :title="item.configName" :description="item.configValue" />
        <template #suffix>
          <n-button @click="openDialog(item.type,item.configName,item.configValue,item.configKey)"> 修改</n-button>
        </template>
      </n-list-item>
    </n-list>
  </n-card>

  <n-modal v-model:show="showModal">
    <n-card
        style="width: 600px"
        title="设置(谨慎操作)"
        :bordered="false"
        size="huge"
        role="card"
        aria-modal="true"
    >
      <div>
        <n-form-item :label="selectName+':'" >
        <br/>
          <br/>
          <br/>
        <div v-if="selectType==='input'" >
          <n-input v-model:value="selectValue" />
        </div>
        <div v-if="selectType==='switch'" >
          <n-switch v-model:value="selectValue" />
        </div>
        <div v-if="selectType==='number'" >
          <n-input-number v-model:value="selectValue" clearable />
        </div>
        </n-form-item>
      </div>
      <template #action>
        <div style="display: flex;flex-direction: row;justify-content: flex-end">
          <n-button @click="setData">确定</n-button>
          <div style="width: 30px;"></div>
          <n-button @click="closeDialog">取消</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>
<style scoped>

</style>