<template>
	<view style="padding-bottom:50px;">
		<swiper class="swip" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in detail.pics" :key="index">
				<image @click="preview(index)" :src="item.pics_big_url"></image>
			</swiper-item>
		</swiper>
		<view>
			<text style="color:#c00000">￥{{detail.goods_price}}</text>
			<view>{{detail.goods_name}}</view>
		</view>
		
		<!-- <view v-html="detai.goods_introduce"></view> -->
		<rich-text :nodes="detail.goods_introduce"></rich-text>
		<!-- 底部商品导航按钮组 -->
		<view class="bottomNav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
		
		
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {options: [{
			icon: 'shop',
			text: '店铺',
			info: 2,
			infoBackgroundColor:'#007aff',
			infoColor:"red"
		}, {
			icon: 'cart',
			text: '购物车',
			info: 2
		}],
	    buttonGroup: [{
	      text: '加入购物车',
	      backgroundColor: '#ff0000',
	      color: '#fff'
	    },
	    {
	      text: '立即购买',
	      backgroundColor: '#ffa200',
	      color: '#fff'
	    }
	    ],
				detail:{},
				goods_id:''
			};
		},
		onLoad(obj){
			// 接收商品id参数
			this.goods_id = obj.goods_id
		},
		mounted(){
			this.getDetail()
		},
		methods:{
			...mapMutations(['add']),
			//商品导航 左侧图标的点击事件
			onClick (e) {
				if(e.content.text == '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			//商品导航 右侧按钮组的点击事件
			buttonClick (e) {
				if(e.content.text=='加入购物车'){
					// 购物车商品对象
					let obj = {
						goods_id : this.detail.goods_id, //id 
						goods_price : this.detail.goods_price,//价格
						goods_name : this.detail.goods_name,//商品描述
						goods_pic: this.detail.goods_small_logo,//商品小图片
						goods_count : 1, //商品数量初次添加为 1
						goods_flag : false //商品是否选中 默认未选中
					}
					// 调用vuex 中的 mutations下 add方法来修改carts 并传参
					this.add(obj)
				}
			},
			// 图片预览
			preview(index){
				// 图片预览API
				uni.previewImage({
					// current 当前图片索引
					current:index,
					// 图片路径数组
					urls:this.detail.pics.map(item=>item.pics_big_url)
				})
			},
			// 获取商品详情信息
			async getDetail(){
				let {data:res} = await uni.$http.get('/goods/detail',{goods_id:this.goods_id})
				console.log(res)
				this.detail = res.message
			}
		}
	}
</script>

<style lang="scss">
	.swip{
		height:500px;
		image{
			width:100%;
			height:100%;
		}
	}
	.bottomNav{
		position: fixed;
		bottom:0;
		left:0;
		width:100%;
	}
	
</style>
