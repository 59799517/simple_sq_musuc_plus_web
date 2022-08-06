import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { ConfigProvider,Button, DropdownMenu, DropdownItem ,Col, Row,Search ,List,Cell, CellGroup,Icon,Tab, Tabs ,Collapse, CollapseItem} from 'vant';
var app = createApp(App);
app.use(ConfigProvider).use(Button).use(DropdownMenu).use(DropdownItem).use(Col).use(Row).use(Search)
.use(List).use(List).use(List).use(Icon).use(Tab).use(Tabs).use(Collapse).use(CollapseItem);
app.mount('#app')
