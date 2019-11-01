<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1.5rem; margin-bottom: 0 !important;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane :label="tab.name" v-for="(tab, tabIdx) in tabbars" :key="tabIdx">
				<button-search :superSearch="superSearch" ref="buttonSearch" @searchEvent="searchEvent" placeholder="要搜索的商品名称">
					<template #left>
						<!-- 左边 -->
						<el-button size="mini" type="success">发布商品</el-button>
						<el-button size="mini" type="warning">恢复商品</el-button>
						<el-button size="mini" type="danger">批量删除</el-button>

						<el-button size="mini">上架</el-button>
						<el-button size="mini">下架</el-button>
						<el-button size="mini">推荐</el-button>
					</template>
					<template #form>
						<div class="text item">
							<!-- 表单-->
							<el-form inline ref="form" :model="form" label-width="80px">
								<el-form-item label="商品名称" class="mb-0"><el-input placeholder="要搜索的商品名称" size="mini" v-model="form.name"></el-input></el-form-item>
								<el-form-item label="商品编码" class="mb-0"><el-input placeholder="要搜索的商品编码" size="mini" v-model="form.code"></el-input></el-form-item>
								<el-form-item label="商品类型" class="mb-0">
									<el-select size="mini" v-model="form.type" placeholder="请选择商品类型">
										<el-option label="区域一" value="shanghai"></el-option>
										<el-option label="区域二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="商品分类" class="mb-0"><el-input size="mini" placeholder="商品分类" v-model="form.category"></el-input></el-form-item>
								<el-form-item class="mb-0">
									<el-button type="info" @click="searchEvent" size="mini">搜索</el-button>
									<el-button @click="clearSearch" size="mini">清空搜索条件</el-button>
								</el-form-item>
							</el-form>
						</div>
					</template>
				</button-search>
				<!-- 表格 -->
				<el-table :data="tableData[tabIdx].list" @selection-change="handleSelectionChange" style="width: 100%" border class="mt-3  pb-5">
					<el-table-column type="selection" width="45" align="center"></el-table-column>
					<el-table-column width="380" label="商品信息">
						<template slot-scope="scope">
							<!-- {{scope.$index}} -->
							<div class="media">
								<img class="mr-3" style="height: 60px;width: 60px;" :src="scope.row.cover" :alt="scope.row.title" />
								<div class="media-body">
									<h6 class="mb-0">{{ scope.row.title }}</h6>
									<p class="mb-1">分类：{{ scope.row.category }}</p>
									<p class="mb-0">时间：{{ scope.row.create_time }}</p>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="type" label="商品类型"></el-table-column>
					<el-table-column align="center" prop="sale_count" label="实际销量"></el-table-column>
					<el-table-column align="center" prop="order" label="商品排序"></el-table-column>
					<el-table-column align="center" label="商品状态">
						<template slot-scope="scope">
							<el-button type="primary" size="mini" plain>审核通过</el-button>
							<el-button type="danger" class="ml-0 mt-2" size="mini" plain>审核失败</el-button>
							<!-- <el-button :type="scope.row.status==0?'primary':'danger'"
							 @click="changeStatus(scope.row)"
							 size="mini" plain>{{scope.row.status?"下架":"上架"}}</el-button> -->
						</template>
					</el-table-column>
					<el-table-column align="center" prop="stock" label="总库存"></el-table-column>
					<el-table-column align="center" prop="pprice" label="价格(元)"></el-table-column>
					<el-table-column align="center" width="150" label="操作">
						<template slot-scope="scope">
							<el-button-group>
								<el-button size="mini" type="primary" plain>修改</el-button>
								<el-button size="mini" type="danger" @click="delItem(scope.$index)" plain>删除</el-button>
							</el-button-group>
						</template>
					</el-table-column>
				</el-table>
				<div style="height: 60px;width: 100%;">
					<el-footer
					style="bottom: 0;left: 200px;z-index: 99;"
					class="d-flex 
					mt-1
					w-100
					bg-white
					position-fixed
					 align-items-center px-0">
						<div style="flex: 1;" class="px-3">
							<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="tableData[tabIdx].currentPage"
								:page-sizes="[100, 200, 300, 400]"
								:page-size="100"
								layout="total, sizes, prev, pager, next, jumper"
								:total="400"
							></el-pagination>
						</div>
					</el-footer>
				</div>	
			</el-tab-pane>
		</el-tabs>
		
	</div>
</template>

<script>
import buttonSearch from '@/components/common/buttonSearch.vue';
export default {
	components: {
		buttonSearch
	},
	data() {
		return {
			tabIndex: 0,
			tabbars: [{ name: '审核中' }, { name: '出售中' }, { name: '已下架' }, { name: '库存预警' }, { name: '回收站' }],
			superSearch: false,
			form: {
				name: '',
				code: '',
				type: '',
				category: ''
			},
			tableData: [],
			multipleSelection: []
		};
	},
	created() {
		this.getData();
		console.log(this.tableData);
	},
	methods: {
		handleClick(tab, event) {
			// console.log(tab, event);
		},
		//删除当前商品
		delItem(index) {
			this.$confirm('此操作将删除该行, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.tableData[this.tabIndex].list.splice(index, 1);
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
		},
		//清空搜索
		clearSearch() {
			this.form = {
				name: '',
				code: '',
				type: '',
				category: ''
			};
			this.$refs.buttonSearch[this.tabIndex].clooseSearch();
		},
		//搜索事件
		searchEvent(e) {
			if (typeof e === 'string') {
				console.log('简单搜索', e);
				return;
			}
			console.log('高级搜索');
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		//改变上架下架状态
		changeStatus(item){
			item.status=item.status==1?0:1
		},
		handleSelectionChange(val) {
			console.log(val);
			this.multipleSelection = val;
		},
		getData() {
			for (let i = 0; i < this.tabbars.length; i++) {
				this.tableData.push({
					currentPage: 1,
					list: []
				});
				for (let j = 0; j < 20; j++) {
					this.tableData[i].list.push({
						id: j,
						title: '荣耀 V10全网通 标配版 4BG+64GB 魅力红' + i + '-' + j,
						cover: 'http://e.hiphotos.baidu.com/image/h%3D300/sign=005ac80783b1cb1321693a13ed5656da/1ad5ad6eddc451dab539af03b8fd5266d116320e.jpg',
						create_time: '2019-07-17 18:34:14',
						category: '手机',
						type: '普通商品',
						sale_count: 20,
						order: 100,
						status: 1,//0上架 1下架
						stock: 200, //库存
						pprice: 1000,
						ischeck: 1 //0未审核，1通过，2不通过
					});
				}
			}
		}
	}
};
</script>

<style></style>
