<template>
	<view>
		<!-- 搜索栏区域 -->
		<view class="top">
			<uni-search-bar @input="input"></uni-search-bar>
		</view>
		<!-- 搜索历史 -->
		<view v-if="shopList.length==0 || !shopList">
			<view class="middle">
				<text>搜索历史</text>
				<uni-icons type="trash" size="20"></uni-icons>
			</view>
			<view class="bottom">
				<text>abc</text>
				<text>add</text>
				<text>bsds</text>
			</view>
		</view>
		<!-- 列表区域 -->
		<view v-else>
			<view  class="list" v-for="item in shopList" :key="item.goods_id">
					<text >{{item.goods_name}}</text>
					<uni-icons type="forward" size="20"></uni-icons>
			</view>
		</view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 搜索的列表数据
				shopList:[],
				// 防抖的计时器对象
				timer:null
			};
		},
		methods:{
			// 输入内容 搜索 （设置防抖）
			input(query){
				// 防抖的逻辑代码
				// 当有定时器在执行时 则清除掉
				this.timer && clearTimeout(this.timer)
				// 防抖的逻辑代码
				// 0.5秒后 执行调用接口的方法 并将返回的对象赋值给timer变量
				this.timer = setTimeout(()=>{
					this.getShopList(query)
				},500)
			},
			async getShopList(query){
				let {data:res} = await uni.$http.get('/goods/qsearch',{query})
				console.log(res)
				this.shopList = res.message
			}
		}
	}
</script>
<style lang="scss">
.bottom{
	display:flex;
	flex-wrap:wrap;
	margin-top:10px;
	text{
		margin-left: 10px;
	}
}
.top{
	background-color: #c00000;
}
.middle{
	display:flex;
	justify-content: space-between;
	padding:0 10px;
	border-bottom:1px solid gray;
	line-height:40px;
}
.list{
	display: flex;
	line-height: 40px;
	justify-content: space-between;
	padding:0 10px;
	border-bottom:1px solid gray;
	text{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
