<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1.5rem;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane :label="tab.name" v-for="(tab, tabIdx) in tabbars" :key="tabIdx">
				<button-search :superSearch="superSearch" @searchEvent="searchEvent" placeholder="要搜索的商品名称">
					<template #left>
						<!-- 左边 -->
						<el-button size="mini" type="success">发布商品</el-button>
						<el-button size="mini" type="danger">批量删除</el-button>
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
			}
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		//清空搜索
		clearSearch() {
			this.form = {
				name: '',
				code: '',
				type: '',
				category: ''
			};
			this.superSearch = false;
		},
		//搜索事件
		searchEvent(e) {
			console.log(e);
		}
	}
};
</script>

<style></style>
