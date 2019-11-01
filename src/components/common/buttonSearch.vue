<template>
	<div>
		<div class="d-flex align-items-center">
			<!-- 左边 -->
			<slot name="left"></slot>
			<!-- 右边 -->
			<slot name="right">
				<div class="ml-auto" v-show="!superShow">
					<el-input v-model="keywords" size="mini" class="mr-2" style="width: 150px;" :placeholder="placeholder"></el-input>
					<el-button type="info" size="mini" @click="$emit('searchEvent', keywords)">搜索</el-button>
					<el-button size="mini" @click="clooseSearch">高级搜索</el-button>
				</div>
			</slot>
		</div>
		<!-- 表单 -->

		<el-card class="box-card bg-light my-3" v-show="superShow">
			<div slot="header" class="clearfix" style="margin: -10px;">
				<span>高级搜索</span>
				<el-button style="float: right; padding: 3px 0" @click="clooseSearch" type="text">收起</el-button>
			</div>
			<slot name="form"></slot>
		</el-card>
	</div>
</template>

<script>
export default {
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		superSearch:{
			type:Boolean,
			default:false
		}
	},
	data() {
		return {
			keywords: '',
			superShow:this.superSearch
		};
	},
	methods: {
		clooseSearch() {
			this.superShow = !this.superShow;
		}
	}
};
</script>

<style></style>
