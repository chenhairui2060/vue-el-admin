<template>
	<el-dialog title="上传图片" :visible.sync="show">
		<el-upload
		  class="upload-demo text-center"
		  drag
		  action="https://jsonplaceholder.typicode.com/posts/"
		  multiple>
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	</el-dialog>
</template>

<script>
	export default{
		props:{
			uploadModal:{
				type:Boolean,
				default:false
			}	
		},
		data() {
			return {
				show: false
			};
		},
		watch:{
			uploadModal(val) {
				this.show = val;
			},
			show(val) {
				//监听show的值，当show的值发生改变的时候val即为当前show的值，把该值传给父组件的v-model属性（v-model绑定的是input事件，出发Input事件）
				this.$emit('input', val);
			}
		}
	}
</script>

<style>
</style>
