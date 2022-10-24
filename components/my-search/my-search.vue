<template>
	<view class="search">
		<view @click='gotoSearch'>
			<icon type="search" size='14'></icon>
			搜索
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>
<style lang="scss">
	.search{
		height:40px;
		background-color: #c00000;
		display: flex;
		justify-content: center;
		align-items: center;
		padding:10px;
		view{
			height:30px;
			width:100%;
			border-radius: 15px;
			background-color: #fff;
			text-align: center;
			line-height: 30px;
		}
	}
</style>