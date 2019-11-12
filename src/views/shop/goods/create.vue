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
							<template v-if="!updateAllStatus">
								<el-button type="text" 
								@click="chooseItem(item)"
								v-for="(item,index) in updateList" :key="index">{{item.name}}</el-button>
							</template>
							<div v-else class="d-flex align-items-center">
								<el-input v-model="updateValue" type="number" size="mini" :placeholder="UpdateAllPlaceholder" style="width: 150px;" class="mr-2"></el-input>
								<el-button type="primary" @click="updateSubmit" size="mini">设置</el-button>
								<el-button size="mini" @click="closeUpdateAllStatus">取消</el-button>
							</div>
						</el-form-item>
						<el-form-item label="规格设置" class="mb-5"><sku-table ref="table"></sku-table></el-form-item>
					</el-form>
				</template>
			</el-tab-pane>

			<el-tab-pane label="商品属性">商品属性</el-tab-pane>
			<el-tab-pane label="媒体设置">
				<el-form  label-width="80px">
					<el-form-item label="商品大图">
						<div style="height: 150px;width: 150px;" class="border rounded d-flex align-items-center justify-content-center">
							<div class="el-icon-plus text-muted" style="font-size: 30px;"></div>
						</div>
					</el-form-item>
				</el-form>
			</el-tab-pane>
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
			msg: 'Welcome to Use Tinymce Editor',
			updateAllStatus:false,
			UpdateAllPlaceholder:'',
			updateValue:'',
			updateList:[
				{
					name:'销售价',
					key:'pprice'
				},
				{
					name:'市场价',
					key:'oprice'
				},
				{
					name:'成本价',
					key:'cprice'
				},
				{
					name:'库存',
					key:'stock'
				},
				{
					name:'体积',
					key:'volume'
				},{
					name:'重量',
					key:'weight'
				},
				
			]
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
		},
		//修改全局设置状态
		chooseItem(item){
			console.log(item)
			this.updateAllStatus=item.key;
			this.UpdateAllPlaceholder=item.name;
		},
		//取消批量设置状态
		closeUpdateAllStatus(){
			this.updateAllStatus=false;
			this.updateValue='';
		},
		//提交批量设置
		updateSubmit(){
			// console.log(this.$refs.table.list)
			if(this.updateValue){
				this.$refs.table.list.forEach(v=>{
					v[this.updateAllStatus]=this.updateValue
				})
			}else{
			    this.$message.error('不能设置为空！');
			}
			
		}
	}
};
</script>

<style></style>
