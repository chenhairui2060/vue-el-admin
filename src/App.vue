<template>
	<div id="app">
		<router-view></router-view>
		<el-dialog title="标题" :visible.sync="imageModel">
			
			<div slot="footer" class="dialog-footer">
				<el-button @click="hide">取 消</el-button>
				<el-button type="primary" @click="confirm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'app',
	provide(){
		return{
			app:this
		}
	},
	data() {
		return {
			imageModel:false,
			callback:false
		};
	},
	methods:{
		//隐藏弹窗
		hide(){
			this.imageModel=false;
			this.callback=false;
		},
		//打开弹窗  callback传过来的函数  空函数
		chooseImage(callback){
			this.callback=callback;
			this.imageModel=true;
		},
		//确定
		confirm(){
			//拿到图片路径
			if(typeof this.callback==='function'){
				this.callback('拿到图片路径url')
			}
			//隐藏弹窗
			this.hide()
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
