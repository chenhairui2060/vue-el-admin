<template>
	<table class="table table-sm table-bordered">
		<thead>
			<tr>
				<th scope="col" :rowspan="th.rowspan" style="vertical-align: middle;" v-for="(th, thIndex) in tableThs" :key="thIndex" :colspan="th.colspan" class="text-center">
					{{ th.name }}
				</th>
			</tr>
			<tr>
				<th scope="col" v-for="(th, thIndex) in skuLables" :key="thIndex" style="vertical-align: middle;" class="text-center">{{ th.name }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, index) in list" :key="index" class="text-center">
				<th scope="row" v-for="(sku, skuIndex) in item.skus" :key="skuIndex">{{ sku.name }}</th>
				<td width="100">
					<span v-if="!item.image" class="btn btn-light border mar-2"  @click="chooseImage(item)">
						<i class="el-icon-plus"></i>
					</span>
					<img @click="chooseImage(item)" v-else :src="item.image" style="height: 40px;width: 40px;" class="rounded"/>
				</td>
				<td width="100"><el-input type="number" size="mini" v-model="item.pprice"></el-input></td>
				<td width="100"><el-input type="number" size="mini" v-model="item.oprice"></el-input></td>
				<td width="100"><el-input type="number" size="mini" v-model="item.cprice"></el-input></td>
				<td width="100"><el-input type="number" size="mini" v-model="item.stock"></el-input></td>
				<td width="100"><el-input type="number" size="mini" v-model="item.volume"></el-input></td>
				<td width="100"><el-input type="number" size="mini" v-model="item.weight"></el-input></td>
				<td width="100"><el-input type="text" size="mini" v-model="item.code"></el-input></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
	inject:['app'],
	data(){
		return{
			list:[]
		}
	},
	computed: {
		...mapGetters(['tableThs', 'tableData', 'skuLables']),
		...mapState({
			sku_card: state => state.goods_create.sku_card
		})
	},
	watch:{
		tableData(newValue,oldValue){
			this.list=newValue
		}
	},
	mounted() {
		this.list=this.tableData
	},
	methods:{
		//选择图片
		chooseImage(item){
			this.app.chooseImage((res)=>{
				item.image=res[0].url
			},1)
		}
	}
};
</script>

<style></style>
