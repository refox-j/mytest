//引入 vue
import Vue from 'vue'
//引入 vuex
import Vuex from 'vuex'
//use vuex
Vue.use(Vuex)

// 导出 vuex的 store实例
export default new Vuex.Store({
	state:{
		// 购物车 数据 (本地存储中读取 如果没有 为 空数组)
		carts:JSON.parse(uni.getStorageSync('carts') || '[]')
	},
	mutations:{
		// 持久化方法
		saveCarts(state){
			// 小程序的本地存储方法 (注意数据要是 json 格式的)
			uni.setStorageSync('carts',JSON.stringify(state.carts))
		},
		//购物车添加数据的方法
		add(state,value){
			//购物车商品 添加逻辑判断
			var index = state.carts.findIndex(item=>item.goods_id==value.goods_id)
			if(index==-1){
				state.carts.push(value)
			}else{
				state.carts[index].goods_count+=1
			}
			// 调用本地存储的方法
			this.commit('saveCarts')
		},
		// 修改 商品选中状态
		changeFlag(state,value){
			//找到要修改的数据对象
			let obj = state.carts.find(item=>item.goods_id==value)
			// 单选框状态 取反即可
			obj.goods_flag = !obj.goods_flag
			// 调用本地存储的方法
			this.commit('saveCarts')
		},
		// 修改 商品数量
		changeCount(state,payload){
			if(payload.k==1){
				state.carts[payload.index].goods_count++
			}else{
				state.carts[payload.index].goods_count--
			}
			// 调用本地存储的方法
			this.commit('saveCarts')
		},
		// 删除商品
		delCart(state,index){
			state.carts.splice(index,1)
			// 调用本地存储的方法
			this.commit('saveCarts')
		},
		// 全选的方法
		changeAll(state,value){
			state.carts.forEach(item=>item.goods_flag = value)
		}
		
	},
	getters:{
		// 统计选中状态的商品数量
		allCheckCount(state){
			return state.carts.filter(item=>item.goods_flag).reduce((tmp,itm)=>tmp+itm.goods_count,0)
		},
		// 统计选中状态的商品总价格
		allCheckPrice(state){
			return state.carts.filter(item=>item.goods_flag).reduce((tmp,itm)=>tmp+itm.goods_count*itm.goods_price,0)
		}
	},
	actions:{},
	modules:{}
})