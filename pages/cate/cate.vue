<template>
	<view>
		<mySearch></mySearch>
		<view class="cate" >
			<!-- 左侧导航容器 可滚动容器-->
			<scroll-view scroll-y :style="{height:scrollHeight+'px',width:'120px'}">
				<!-- 遍历左侧导航 -->
				<view class="cate_nav" 
					:class="{active:active==index}" 
					@click="handler(index)" 
					v-for="(item,index) in cateList" :key="item.cat_id"
				>
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧列表容器 可滚动容器-->
			<scroll-view scroll-y :style="{backgroundColor:'#fff',height:scrollHeight+'px',width:'100%'}">
				<view  >
					<!-- 二级导航 区域 -->
					<view class="leveltwo">
						{{level2[0].cat_name}}
					</view>
					<!-- 三级列表区域 -->
					<view class="levelthree">
						<view @click="gotoList(item)" class="it" v-for="(item,index) in level2[0].children" :key='index'>
							<image style="width:60px;height:60px" :src="item.cat_icon" ></image>
							<text>{{item.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	
</template>

<script>
	// 引入 mySearch 组件
	import mySearch from '@/components/my-search/my-search.vue'
	export default {
		components:{
			mySearch
		},
		data() {
			return {
				// 分类数据
				cateList:[],
				//判断索引高亮的 变量
				active:0,
				// 滚动区域scroll-view的组件高度
				scrollHeight:0,
				// 二级导航
				level2:[]
			};
		},
		mounted(){
			this.getCateList()
			// 获取设备信息 同步方法
			let res = uni.getSystemInfoSync()
			// 设置 设备可使用高度
			this.scrollHeight = res.windowHeight
			
		},
		methods:{
			//跳转商品列表页
			gotoList(item){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?cid=" + item.cat_id
				})
			},
			// 一二导航联动 方法
			handler(index){
				// 控制索引高亮
				this.active=index
				// 二级导航 根据一级导航下标 赋新值
				this.level2 = this.cateList[index].children
			},
			// 请求分类列表方法
			async getCateList(){
				let {data:res} =await uni.$http.get('/categories')
				if(res.meta.status!=200) return uni.$showMsg()
				this.cateList = res.message
				// 默认显示是大家电的列表 数组下标0 
				this.level2 = res.message[0].children
			}
		}
	}
</script>

<style lang="scss">
	.cate{
		display:flex;
		.cate_nav{
			width:120px;
			line-height: 60px;
			text-align: center;
			&.active{
				background-color: #fff;
				position: relative;
				&::before{
					content:'';
					display:block;
					position: absolute;
					background-color: #c00000;
					width:3px;
					height:30px;
					top:50%;
					left:2px;
					transform: translateY(-50%);
				}
			}
		}
		.leveltwo{
			line-height:60px;
			background-color: #fff;
			text-align: center;
		}
		.levelthree{
			
			display: flex;
			flex-wrap: wrap;
			
			.it{
				width:33%;
				display: flex;
				flex-direction: column;
				align-items:center;
				justify-content: center;
			}
			text{
				font-size: 12px;
			}
		}
	}
</style>
