<template>
	<view>
		<!-- 每条商品信息 -->
		<view @click="gotoDetail(item)" class="list_box" v-for="(item,index) in goodsList" :key="index">
			<!-- 左侧商品图片 -->
			<view >
				<image :src="item.goods_big_logo || defualtImg" ></image>
			</view>
			<!-- 右侧商品信息 -->
			<view>
				<view>{{item.goods_name}}</view>
				<text>￥{{item.goods_price | myprice }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 默认图片 当该条数据网络图片没有时 渲染默认图片
				defualtImg:"http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_800x800.jpg",
				// 列表数据 
				goodsList:[],
				// 请求商品列表的参数
				form:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				//记录商品总条数
				total:0,
				// 判断请求是否完毕
				isLoading:false
			};
		},
		
		mounted(){
			this.getGoodsList()
		},
		// 过滤器 配置项
		filters:{
			//自定义 价格过滤器 保留两位小数
			myprice(val){
				return val.toFixed(2)
			}
		},
		// 监听下拉刷新 重置当前页面
		onPullDownRefresh(){
			this.form.pagenum = 1
			this.goodsList = []
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		// 监听上拉加载事件触发
		onReachBottom(){
			// 判断请求是否完毕 未完毕 则return结束
			if(this.isLoading) return
			// 判断数据是否全部渲染完毕 如果是 return掉 不再触发请求接口
			if(this.form.pagenum*this.form.pagesize>this.total){
				return uni.showToast({
					title:'数据已经没有了！'
				})
			}
			// 当前页码加一
			this.form.pagenum+=1
			// 重新调用页面数据渲染
			this.getGoodsList()
		},
		methods:{
			// 携带参数 跳转商品详情
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 请求商品列表
			async getGoodsList(callback){
				// true表示 正在发送请求
				this.isLoading = true
				let {data:res} = await uni.$http.get('/goods/search',this.form)
				// false表示 请求完毕
				this.isLoading = false
				// 当参数中有这个回调函数时 执行它 否则不执行
				callback && callback()
				// 数组 拼接
				this.goodsList = [...this.goodsList,...res.message.goods]
				// 数据总条数
				this.total = res.message.total
			},
		},
		onLoad(obj){
			console.log(obj)
			this.form.cid = obj.cid
		}
	}
</script>

<style lang="scss">
	.list_box{
		display: flex;
		margin-top:10px;
		border-bottom: 1px solid gray;
		image{
			width:100px;
			height:100px;
		}
		text{
			color:#c00000;
		}
	}
</style>
