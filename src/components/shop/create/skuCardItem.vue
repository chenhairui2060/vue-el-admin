<template>
	<div class="border py-2 px-4 rounded mr-2 position-relative d-flex align-items-center">
		<div v-if="type !== 0">
			<!-- 颜色选择器 -->
			<el-color-picker v-if="type == 1" size="mini"></el-color-picker>
			<!-- 图片选择器 -->
			<span v-else class="btn btn-light border mar-2"><i class="el-icon-plus"></i></span>
		</div>
		<input
		@input="inputChange"
		:value="item.name" style="width: 70px;font-size: 12px;" class="form-control border-0" />
		<!-- 删除 -->
		<span class="btn btn-light p-0" style="line-height: 1;right: -10px; z-index: 999; position: absolute; top: -10px;">
			<i @click="delSkuValue({cardIndex,valueIndex:index})" class="el-icon-circle-close"></i>
		</span>
	</div>
</template>

<script>
import {mapMutations} from "vuex"
export default {
	props: {
		type: {
			type: Number,
			default: 0
		},
		item: Object,
		index: Number,
		cardIndex: Number
	},
	methods:{
		...mapMutations(['delSkuValue','updateSkuValue']),
		vModel(key,value){
			this.updateSkuValue({
				cardIndex:this.cardIndex,
				valueIndex:this.index,
				key,
				value
			})
		},
		//监听input改变值
		inputChange(e){
			this.vModel('name',e.target.value)
		}
	}
};
</script>

<style></style>
