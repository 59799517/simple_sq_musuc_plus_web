import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { ConfigProvider,Button, DropdownMenu, DropdownItem ,Col, Row,Search ,List,Cell, CellGroup} from 'vant';
var app = createApp(App);
app.use(ConfigProvider).use(Button).use(DropdownMenu).use(DropdownItem).use(Col).use(Row).use(Search)
.use(List).use(List).use(List);
app.mount('#app')
