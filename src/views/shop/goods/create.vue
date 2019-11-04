<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1.5rem;">
		<router-link :to="{ name: 'goodslist' }">
			<el-button style="position: absolute;top: 12px;left: 180px;" type="text" size="mini" plain icon="el-icon-arrow-left">返回商品列表</el-button>
		</router-link>
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<!-- 基础设置 -->
			<el-tab-pane label="基础设置"><base-create></base-create></el-tab-pane>
			<!-- 商品规格 -->
			<el-tab-pane label="商品规格">
				<!-- 规格选择 -->
				<el-form ref="form" label-width="80px">
					<el-form-item label="商品规格">
						<el-radio-group @input="vModel('sku_type', $event)" size="mini" :value="sku_type">
							<el-radio-button :label="0">统一规格</el-radio-button>
							<el-radio-button :label="1">多规格</el-radio-button>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<!-- 单规格 -->
				<template v-if="sku_type === 0">
					<single-attrs></single-attrs>
				</template>
				<!-- 多规格 -->
				<template v-else>
					<!-- 规格卡片 -->
					<sku-card></sku-card>
					<el-form label-width="80px">
						<el-form-item label="批量添加">
							<el-button type="text">销售价</el-button>
							<el-button type="text">市场价</el-button>
							<el-button type="text">成本价</el-button>
							<el-button type="text">库存</el-button>
							<el-button type="text">体积</el-button>
							<el-button type="text">重量</el-button>
						</el-form-item>
						<el-form-item label="规格设置">规格设置</el-form-item>
					</el-form>
				</template>
			</el-tab-pane>

			<el-tab-pane label="商品属性">角色管理</el-tab-pane>
			<el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
			<el-tab-pane label="商品详情">媒体设置</el-tab-pane>
			<el-tab-pane label="折扣设置">媒体设置</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import baseCreate from '@/components/shop/create/baseCreate.vue';
import singleAttrs from '@/components/shop/create/singleAttrs.vue';
import skuCard from "@/components/shop/create/skuCard.vue";
export default {
	data() {
		return {
			tabIndex: 0,
			selectedOptions: []
		};
	},
	components: {
		baseCreate,
		singleAttrs,
		skuCard
	},
	computed: {
		...mapState({
			sku_type: state => state.goods_create.sku_type //单规格，多规格
		})
		//其他计算属性
	},
	mounted() {
		// console.log(this.$store.state.goods_create.sku_type)
	},
	methods: {
		...mapMutations(['vModelState']),
		//修改表单的值
		vModel(key, value) {
			console.log(key);
			this.vModelState({ key, value });
		},
		handleClick(tab, event) {
			console.log(tab, event);
		}
	}
};
</script>

<style></style>
