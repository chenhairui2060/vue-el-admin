<template>
	<div class="border py-2 px-4 rounded mr-2 position-relative d-flex align-items-center">
		<div v-if="type !== 0">
			<!-- 颜色选择器 -->
			<el-color-picker :value="item.color" v-if="type == 1" size="mini" @change="colorChange"></el-color-picker>
			<!-- 图片选择器 -->
			<template v-else>
				<span v-if="!item.image" class="btn btn-light border mar-2"  @click="chooseImage">
					<i class="el-icon-plus"></i>
				</span>
				<img @click="chooseImage" v-else :src="item.image" style="height: 40px;width: 40px;" class="rounded"/>
			</template>
			
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
	inject:['app'],
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
		},
		//选择图片
		chooseImage(){
			this.app.chooseImage((res)=>{
				// console.log(res[0].url)
				this.vModel('image',res[0].url)
			},1)
		},
		//修改颜色
		colorChange(e){
			this.vModel('color',e)
		}
	}
};
</script>

<style></style>
