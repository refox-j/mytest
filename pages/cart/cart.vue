<template>
	<view style="padding-bottom: 50px;">
	 <uni-swipe-action >
		<view class="cart_box" v-for="(item,index) in carts" :key="index">
			 <uni-swipe-action-item :auto-close="false" :show="item.isShow" :right-options="options" @click="bindClick" @change="swipeChange($event, index)">
				<view class="left">
					<radio @click="changeF(item.goods_id)" color="red" :checked="item.goods_flag"></radio>
					<image :src="item.goods_pic"></image>
				</view>
				<view class="right">
					<view>{{item.goods_name}}</view>
					<view class="box">
						<text>￥{{item.goods_price}}</text>
						<view class="btn_group">
							<button class="btn" size="mini" @click="changeCount({k:2,index})">-</button>
							<input disabled :value="item.goods_count" class="ipt" placeholder="数量" type="text">
							<button class="btn" size="mini" @click="changeCount({k:1,index})">+</button>
						</view>
					</view>
				</view>
			 </uni-swipe-action-item>
		</view>
		</uni-swipe-action>
		
		<view class="bottom_box">
			<view class="">
				<radio :checked="allChose" @click="allChose = !allChose" color="red"></radio>全选
			</view>
			<view class="middle">
				<text>合计：</text>
				<text class="red">￥{{allCheckPrice}}</text>
			</view>
			<view class="right">
				结算({{allCheckCount}})
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				i:'',
				options:[
				        {
				            text: '取消',
				            style: {
				                backgroundColor: '#007aff'
				            }
				        }, {
				            text: '确认',
				            style: {
				                backgroundColor: '#dd524d'
				            }
				        }
				      ]
			};
		},
		methods:{
			...mapMutations(['changeFlag','changeCount','delCart','changeAll']),
			// 单选框 选中状态切换
			changeF(id){
				this.changeFlag(id)
			},
			// 判断是否确认是删除 并删除此条下标的数据
			bindClick(e){
				console.log(e)
				if(e.content.text=='确认'){
					this.delCart(this.i)
				}
			},
			// 获取当前数据的下标 保存在变量里
			swipeChange(e,index){
				this.i = index
				// console.log(e)
				// console.log(index)
			}
		},
		computed:{
			...mapState(['carts']),
			...mapGetters(['allCheckCount','allCheckPrice']),
			// 反选计算属性
			allChose:{
				get(){
					return this.carts.filter(item=>item.goods_flag).length == this.carts.length
				},
				set(val){
					this.changeAll(val)
				}
			}
		}
	}
</script>

<style lang="scss">
	.bottom_box{
		display:flex;
		border-top:1px solid gray;
		justify-content: space-between;
		align-items: center;
		padding:0 0 0 10px;
		position: fixed;
		bottom:0;
		left:0;
		width:100%;
		.middle{
			.red{
				color:#c00000;
			}
		}
		.right{
			text-align: center;
			width:100px;
			background-color: #c00000;
			color:#fff;
			line-height:50px;
		}
	}
.cart_box{
	display: flex;
	font-size:14px;
	padding:10rpx;
	border-bottom:1px solid gray;
	.left{
		display:flex;
		align-items: center;
	}
	.right{
		padding-left:10rpx;
		display:flex;
		flex-direction: column;
		justify-content: space-between;
	}
	image{
		width:200rpx;
		height:200rpx;
	}
	.box{
		display: flex;
		justify-content: space-between;
		align-items:center;
		text{
			color:#c00000;
		}
		.btn_group{
			display: flex;
			.ipt{
				width:100rpx;
				height:50rpx;
			}
			.btn{
				width:100rpx;
			}
		}
	}
}
</style>
