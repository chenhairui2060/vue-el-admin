<template>
	<div class="border py-2 px-4 rounded mr-2 position-relative d-flex align-items-center">
		<div v-if="item.type!==0">
			<!-- 颜色选择器 -->
			<el-color-picker 
			 v-if="item.type==1"
			 size="mini">
			</el-color-picker>
			<!-- 图片选择器 -->
			<span v-else class="btn btn-light border mar-2">
				<i class="el-icon-plus"></i>
			</span>
		</div>
		<input value="内容" 
		style="width: 60px;font-size: 12px;"
		class="form-control border-0" />
	<span class="btn btn-light p-0" style="line-height: 1;right: -10px; z-index: 999; position: absolute; top: -10px;">
		<i class="el-icon-circle-close"></i>
	</span>
	</div>
</template>

<script>
	export default{
		props:{
			item:Object
		},
		created(){
			console.log('shdhhg',this.item)
		}
			
	}
</script>

<style>
</style>
