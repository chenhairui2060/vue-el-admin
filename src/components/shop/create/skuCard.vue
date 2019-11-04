<template>
	<el-form label-width="80px">
		<el-form-item label="添加规格">
			<div class="card mb-3" 
			v-for="(item,index) in sku_card"
			:key="index"
			style="line-height: 1.2;">
				<div class="card-header d-flex align-items-center">
					规格项：
					<el-input
					 :value="item.name"
					 @input="vModel('name',index,$event)"
					 class="w-25" size="mini"><el-button slot="append" style="border: none;" class="el-icon-more"></el-button></el-input>
					<el-radio-group 
					:value="item.type"
					@input="vModel('type',index,$event)"
					style="margin-bottom: -12px;" size="mini" class="ml-2">
						<el-radio :label="0">无</el-radio>
						<el-radio :label="1">颜色</el-radio>
						<el-radio :label="2">图片</el-radio>
					</el-radio-group>
					<el-button size="mini" 
					@click="skuCard('moveUp',index)"
					style="border: none;" class="el-icon-top ml-auto"></el-button>
					<el-button 
					@click="skuCard('moveDown',index)"
					size="mini" style="border: none;" class="el-icon-bottom"></el-button>
					<el-button type="text" @click="delSkuCard(index)">删除</el-button>
				</div>
				<div class="card-body">
					<!-- 规格属性列表 -->
					<!-- 增加规格 -->
					<el-button type="text" size="mini" icon="el-icon-plus">增加规格值</el-button></div>
			</div>
			<el-button type="success" @click="addSkuCard" size="mini">增加规格</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import {mapState,mapMutations} from "vuex";
	export default{
		data(){
			return{
				
			}
		},
		computed:{
			...mapState({
				sku_card:state=>state.goods_create.sku_card
			})
		},
		methods:{
			...mapMutations(['addSkuCard','delSkuCard','vModelSkuCard','sortSkuCard']),
			vModel(key,index,value){
				this.vModelSkuCard({key,index,value})
			},
			//排序上移下移
			skuCard(action,index){
				this.sortSkuCard({action,index})
			}
		}
	}
</script>

<style>
</style>
