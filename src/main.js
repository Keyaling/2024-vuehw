//import './assets/main.css'  //讓畫面更好看

import { createApp } from 'vue'    //step1建構vue的方法
import { createPinia } from 'pinia'

import App from './App.vue'    //step2 取出vue的根元件
import router from './router'

const app = createApp(App)

app.use(createPinia())  
app.use(router)

app.mount('#app')          //生成vue環境 
