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
							<sku-card v-for="(item, index) in sku_card" :key="index" :item="item" :index="index" :total="skuCardTotal"></sku-card>
							<!-- 增加卡片 -->
							<el-tooltip class="item" effect="dark" content="增加规格" placement="bottom-end">
								<el-button type="success" @click="addSkuCard" size="mini">增加规格</el-button>
							</el-tooltip>
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
						<el-form-item label="规格设置" class="mb-5"><sku-table></sku-table></el-form-item>
					</el-form>
				</template>
			</el-tab-pane>

			<el-tab-pane label="商品属性">商品属性</el-tab-pane>
			<el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
			<el-tab-pane label="商品详情">
				<!-- 富文本编辑器 -->
				<tinymce ref="editor" v-model="msg"  @onClick="onClick" />
			</el-tab-pane>
			<el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import baseCreate from '@/components/shop/create/baseCreate.vue';
import singleAttrs from '@/components/shop/create/singleAttrs.vue';
import skuCard from '@/components/shop/create/skuCard.vue';
import skuTable from '@/components/shop/create/skuTable.vue';
import tinymce from '@/components/common/tinymce.vue';
export default {
	data() {
		return {
			tabIndex: 0,
			selectedOptions: [],
			msg: 'Welcome to Use Tinymce Editor'
		};
	},
	components: {
		baseCreate,
		singleAttrs,
		skuCard,
		skuTable,
		tinymce
	},
	computed: {
		...mapState({
			sku_type: state => state.goods_create.sku_type, //单规格，多规格
			sku_card: state => state.goods_create.sku_card
		}),
		//规格卡片总数 是否是最后一个
		skuCardTotal() {
			return this.sku_card.length;
		}
	},
	mounted() {
		// console.log(this.$store.state.goods_create.sku_type)
		//dragged  监听拖拽过程
		// this.$dragging.$on('dragged', ({ value }) => {
		// 	console.log(value.item);
		// 	// console.log(value.list);
		// });
		//dragend 监听拖拽结束
		// this.$dragging.$on('dragend', (e) => {
		// 	console.log(e)
		// 	console.log('拖拽结束')
		// });
	},
	methods: {
		...mapMutations(['vModelState', 'addSkuCard']),
		//修改表单的值
		vModel(key, value) {
			console.log(key);
			this.vModelState({ key, value });
		},
		handleClick(tab, event) {
			console.log(tab, event);
		},
		// 鼠标单击的事件
		onClick(e, editor) {
			console.log('Element clicked');
			console.log(e);
			console.log(editor);
		}
	}
};
</script>

<style></style>
