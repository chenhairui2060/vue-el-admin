<template>
	<div id="app">
		<router-view></router-view>
		<image-dialog ref="imageDialog" :max="maxChooseImg"></image-dialog>
		<skus-dialog ref="skusDialog"></skus-dialog>
	</div>
</template>

<script>
	import imageDialog from "@/components/image/imageDialog.vue";
	import skusDialog from "@/components/skus/skusDialog.vue";
export default {
	name: 'app',
	components:{
		imageDialog,
		skusDialog
	},
	provide(){
		return{
			app:this
		}
	},
	data(){
		return{
			maxChooseImg:9
		}
	},
	methods:{
		//选择图片
		chooseImage(callback,max){
			console.log(max)
			this.maxChooseImg=max;
			this.$refs.imageDialog.chooseImage(callback)
		},
		//选择规格
		chooseSkus(callback){
			this.$refs.skusDialog.chooseSkus(callback)
		}
	}
	
};
</script>

<style>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar{
    width: 2px;
    height: 7px;
    background-color: #FFFFFF;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    background-color: #FFFFFF;
  }
</style>
