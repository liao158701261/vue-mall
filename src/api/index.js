import request from 'utils/request'

//定义 请求 分类 model
const fetchCates=(params={})=>request.get('/shop/goods/category/all', { params })
//请求首页轮播图
const fetchHomeBanner=(params={})=>request.get('/banner/list',{params})
// 请求商品列表
const fetchItems =(params={})=>request.post('/shop/goods/list/v2', params)
//商品详情
const fetchItemDetail =(id)=>request.get('/shop/goods/detail',{
  params:{
    id
  }
})
//注册
const register= (params={})=>request.post('/user/username/register',params)
//登录
const doLogin =(params={})=>request.post('/user/username/login',params)
//读取购物车数据
const fetchCartItems=(params={})=>request.get('/shopping-cart/info',{params})
// 加入购物车
const addCart = (params = {}) => request.post('/shopping-cart/add', params)
// 修改购买数量
const setBuyNumber = (params = {}) => request.post('/shopping-cart/modifyNumber', params)
// 修改购物车商品选中状态
const switchCheck = (params = {}) => request.post('/shopping-cart/select', params)
const delCartItem = (params = {}) => request.post('/shopping-cart/remove', params)
// 添加联系人
const addContact =(params={})=> request.post('/user/shipping-address/add',params)
//获取联系人列表
const getContact =(params={})=> request.post('/user/shipping-address/list/v2',params)
//修改收货地址
const amendContact=(params={})=> request.post('/user/shipping-address/update',params)
//获取收货人的详情地址
const detailsContact=(params={})=> request.get('/user/shipping-address/detail/v2',{params})
//删除收货地址
const deleteContact=(params={})=> request.post('/user/shipping-address/delete',params)
//获取默认地址
const orderContact=(params={})=> request.get('/user/shipping-address/default/v2',{params})
export{
  fetchCates,
  fetchHomeBanner,
  fetchItems,
  fetchItemDetail,
  register,
  doLogin,
  fetchCartItems,
  addCart,
  setBuyNumber,
  switchCheck,
  delCartItem,
  addContact,
  getContact,
  amendContact,
  detailsContact,
  deleteContact,
  orderContact
}