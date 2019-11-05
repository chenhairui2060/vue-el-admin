<template>
	<el-form label-width="80px">
		<el-form-item label="添加规格">
			<div class="card mb-3" v-for="(item, index) in sku_card" :key="index" style="line-height: 1.2;">
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
					<el-button :disabled="index + 1 === skuCardTotal" @click="skuCard('moveDown', index)" size="mini" style="border: none;" class="el-icon-bottom"></el-button>
					<el-button type="text" @click="delSkuCardItem(index)">删除</el-button>
				</div>
				<div class="card-body">
					<!-- 规格属性列表 -->
					<div class="d-flex align-items-center flex-wrap">
						<div class="border py-2 px-4 rounded mr-2 position-relative">内容
						<span class="btn btn-light p-0" style="line-height: 1;right: -10px; z-index: 999; position: absolute; top: -10px;">
							<i class="el-icon-circle-close"></i>
						</span>
						</div>
					</div>
					<!-- 增加规格属性 -->
					<el-tooltip class="item" effect="dark" content="增加规格值" placement="bottom-end">
						<el-button class="mt-2" type="text" size="mini" icon="el-icon-plus">增加规格值</el-button>
					</el-tooltip>
				</div>
			</div>
			   
			<!-- 增加卡片 -->
			<el-tooltip class="item" effect="dark" content="增加规格" placement="bottom-end">
			    <el-button type="success" @click="addSkuCard" size="mini">增加规格</el-button>
			</el-tooltip>
		</el-form-item>
	</el-form>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState({
			sku_card: state => state.goods_create.sku_card
		}),
		//规格卡片总数 是否是最后一个
		skuCardTotal() {
			return this.sku_card.length;
		}
	},
	methods: {
		...mapMutations(['addSkuCard', 'delSkuCard', 'vModelSkuCard', 'sortSkuCard']),
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
