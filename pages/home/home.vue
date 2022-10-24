<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" circular :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<!-- <navigator :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id"> -->
				<navigator :url="item.navigator_url.replace('pages','subpkg').replace('main','goods_detail')">
					<!-- /subpkg/goods_detail/goods_detail -->
					<image :src="item.image_src" class="swiperimg"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<view class="nav_list">
			<view class="nav_item" @click="toCate(item)" v-for="(item,index) in navList" :key="index">
				<image class="nav_img" :src="item.image_src" ></image>
			</view>
		</view>
		<!-- 遍历的区域 -->
		<view  class="img_list" v-for="(item,index) in floorList" :key="index">
			<!-- 顶部标题图片 -->
			<image class="title_img" :src="item.floor_title.image_src" ></image>
			<view class="list_box" >
				<!-- 左侧大图 -->
				<view >
					<image mode="widthFix" :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}"></image>
				</view>
				<!-- 右侧小图盒子 -->
				<view class="right_box">
					<!-- 右侧小图 -->
					<view @click="gotoGoodsList(ite)" v-show="idx!=0" v-for="(ite,idx) in item.product_list" :key="idx">
						<image mode="widthFix" :src="ite.image_src" :style="{width:ite.image_width+'rpx'}"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList:[],
				// 分类导航数据
				navList:[],
				//楼层列表数据
				floorList:[]
			};
		},
		mounted(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			//跳转商品列表页
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list'+item.navigator_url.substring(17)
				})
			},
			async getFloorList(){
				let {data:res} = await uni.$http.get('/home/floordata')
				if(res.meta.status!=200) return uni.$showMsg()
				this.floorList = res.message
				console.log(res)
			},
			//请求轮播图 数据
			async getSwiperList(){
				let {data:res} = await uni.$http.get('/home/swiperdata')
				if(res.meta.status!=200) return uni.$showMsg()
				this.swiperList = res.message
			},
			//请求 分类导航
			async getNavList(){
				let {data:res} = await uni.$http.get('/home/catitems')
				if(res.meta.status!=200) return uni.$showMsg()
				this.navList = res.message
			},
			// 跳转到分类页
			toCate(item){
				// 只有分类图标可以跳转到分类页
				if(item.name=="分类"){
					uni.navigateTo({
						url:"/pages/cate/cate",
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiperimg{
		width:100%;
		height:330rpx;
	}
	.nav_list{
		display: flex;
		justify-content: space-around;
		.nav_item{
			padding:15rpx 0;
			.nav_img{
				width:128rpx;
				height: 140rpx;
			}
		}
	}
	.title_img{
		height: 60rpx;
	}
	.list_box{
		display: flex;
	}
	.right_box{
		display: flex;
		flex-wrap: wrap;
	}
	.img_list{
		image{
			margin-left:15rpx;
		}
	}
</style>
