<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1.5rem;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane :label="tab.name" v-for="(tab,tabIdx) in tabbars" :key="tabIdx">
				<div class="d-flex align-items-center">
					<!-- 左边 -->
					<el-button size="mini" type="success" >发布商品</el-button>
					<el-button size="mini" type="danger" >批量删除</el-button>
					<!-- 右边 -->
					<div class="ml-auto" v-show="!superSearch">
						<el-input v-model="form.keyword"  
						size="mini"
						class="mr-2"
						style="width: 150px;"
						placeholder="要搜索的商品名称"></el-input>
						<el-button type="info" size="mini">搜索</el-button>
						<el-button  size="mini" @click="superSearch=!superSearch" >高级搜索</el-button>
					</div>
				</div>
				<el-card class="box-card bg-light my-3" v-show="superSearch">
					<div slot="header" class="clearfix" style="margin: -10px;">
						<span>高级搜索</span>
						<el-button style="float: right; padding: 3px 0" @click="superSearch=!superSearch" type="text">收起</el-button>
					</div>
					<div class="text item">
						<!-- 表单-->
						<el-form inline ref="form" :model="form" label-width="80px">
							<el-form-item label="商品名称" class="mb-0">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							<el-form-item label="商品名称" class="mb-0">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							<el-form-item label="商品名称" class="mb-0">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							<el-form-item label="商品名称" class="mb-0">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							<el-form-item class="mb-0">
								<el-button type="info" size="mini">搜索</el-button>
								<el-button  size="mini">清空搜索条件</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tabIndex:0,
			tabbars:[
				{name:'审核中'},
				{name:'出售中'},
				{name:'已下架'},
				{name:'库存预警'},
				{name:'回收站'}
			],
			superSearch:false,
			form:{
				keyword:'',
				name:''
			}
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		}
	}
};
</script>

<style></style>
