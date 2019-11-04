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
					<el-form label-width="80px">
						<el-form-item label="添加规格">
							<div class="card" style="line-height: 1.2;">
								<div class="card-header d-flex align-items-center">
									规格项：
									<el-input class="w-25" size="mini"><el-button slot="append" style="border: none;" class="el-icon-more"></el-button></el-input>
									<el-radio-group style="margin-bottom: -12px;" size="mini" class="ml-2">
										<el-radio :label="3">无</el-radio>
										<el-radio :label="6">颜色</el-radio>
										<el-radio :label="9">图片</el-radio>
									</el-radio-group>
									<el-button size="mini" style="border: none;" class="el-icon-top ml-auto"></el-button>
									<el-button size="mini" style="border: none;" class="el-icon-bottom"></el-button>
									<el-button type="text">删除</el-button>
								</div>
								<div class="card-body"><el-button type="text" size="mini" icon="el-icon-plus">增加规格值</el-button></div>
							</div>
							<el-button type="success" size="mini">增加规格</el-button>
						</el-form-item>
					</el-form>
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
export default {
	data() {
		return {
			tabIndex: 0,
			selectedOptions: []
		};
	},
	components: {
		baseCreate,
		singleAttrs
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
