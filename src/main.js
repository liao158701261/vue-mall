import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/base.css'
import './assets/fonts/iconfont.css'
import img from './assets/img/Cube-1s-200px.gif'
import {
  Icon, Tabbar, TabbarItem, Swipe, SwipeItem,
  Grid, GridItem, PullRefresh, List, NavBar,
  GoodsAction, GoodsActionIcon, GoodsActionButton, Popup,
  Card, Stepper, Button, Image as VanImage,
  Tab, Tabs, Form, Field, SwipeCell, SubmitBar, Checkbox, CheckboxGroup
  , Overlay, Sidebar, SidebarItem, AddressEdit, ContactList, AddressList, ContactCard, Search
  , DropdownMenu, DropdownItem, Col, Row, Lazyload,Cell, CellGroup
} from 'vant'
//使用全局loading插件
import loading from 'plugins/loading'
Vue.use(loading)

Vue.use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(PullRefresh)
  .use(List)
  .use(NavBar)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Popup)
  .use(Card)
  .use(Stepper)
  .use(Button)
  .use(VanImage)
  .use(Tab)
  .use(Tabs)
  .use(Field)
  .use(Form)
  .use(SwipeCell)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Overlay)
  .use(Sidebar)
  .use(SidebarItem)
  .use(AddressEdit)
  .use(ContactList)
  .use(AddressList)
  .use(ContactCard)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Col)
  .use(Row)
  .use(Cell)
  .use(CellGroup)
  .use(Lazyload,{
    loading:img,
    error:"",
    preload:"1"
  })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
