<template>
	<el-dialog :visible.sync="show" with="50vw" top="20vh">
		<div style="margin: -60px -20px; -30px -20px">
			<img class="w-100" :src="previewUrl"/>
		</div>
	</el-dialog>
</template>

<script>
	export default{
		props:{
			previewModel:{
				type:Boolean,
				default:false
			},
			previewUrl:String
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

<style scoped>
	
</style>
