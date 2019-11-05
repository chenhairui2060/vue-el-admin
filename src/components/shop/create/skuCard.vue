<template>
	<div class="card mb-3"  style="line-height: 1.2;">
		<div class="card-header d-flex align-items-center">
			规格项：
			<el-input :value="item.name" @input="vModel('name', index, $event)" class="w-25" size="mini">
				<el-button slot="append" style="border: none;" class="el-icon-more"></el-button>
			</el-input>
			<el-radio-group :value="item.type" @input="vModel('type', index, $event)" style="margin-bottom: -12px;" size="mini" class="ml-2">
				<el-radio :label="0">无</el-radio>
				<el-radio :label="1">颜色</el-radio>
				<el-radio :label="2">图片</el-radio>
			</el-radio-group>
			<!-- 上移 -->
			<el-button size="mini" @click="skuCard('moveUp', index)" :disabled="index === 0" style="border: none;" class="el-icon-top ml-auto"></el-button>
			<!-- 下移 -->
			<el-button :disabled="index + 1 === total" @click="skuCard('moveDown', index)" size="mini" style="border: none;" class="el-icon-bottom"></el-button>
			<el-button type="text" @click="delSkuCardItem(index)">删除</el-button>
		</div>
		<div class="card-body">
			<!-- 规格属性列表 -->
			<div class="d-flex align-items-center flex-wrap">
				<skuCardItem :item="item"></skuCardItem>
			</div>
			<!-- 增加规格属性 -->
			<el-tooltip class="item" effect="dark" content="增加规格值" placement="bottom-end">
				<el-button class="mt-2" type="text" size="mini" icon="el-icon-plus">增加规格值</el-button>
			</el-tooltip>
		</div>
	</div>
</template>

<script>
import skuCardItem from "./skuCardItem.vue";
import { mapState, mapMutations } from 'vuex';
export default {
	props:{
		item:Object,
		index:Number,
		total:Number
	},
	data() {
		return {};
	},
	components:{
		skuCardItem
	},
	methods: {
		...mapMutations(['delSkuCard', 'vModelSkuCard', 'sortSkuCard']),
		vModel(key, index, value) {
			this.vModelSkuCard({ key, index, value });
		},
		//排序上移下移
		skuCard(action, index) {
			this.sortSkuCard({ action, index });
		},
		//删除该卡片
		delSkuCardItem(index) {
			this.$confirm('是否删除该卡片?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.delSkuCard(index);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		}
	}
};
</script>

<style scoped>

	
</style>
