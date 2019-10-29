<template>
	<el-dialog :visible.sync="show">
		<img class="w-100" src="http://img4.imgtn.bdimg.com/it/u=2350302849,3323337377&fm=26&gp=0.jpg"/>
	</el-dialog>
</template>

<script>
	export default{
		props:{
			previewModel:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			previewModel(val){
				this.show=val
			},
			show(val){
				this.$emit('input', val);
			}
		},
		data() {
			return {
				show: false
			};
		},
	}
</script>

<style>
</style>
