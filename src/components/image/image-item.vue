<template>
	<div>
		<li
			v-for="(item, index) in ablums"
			:key="index"
			style="cursor: pointer;"
			:class="{ active: ablumsIndex == index }"
			@click.stop="changeAblums(index)"
			class="list-group-item list-group-item-action d-flex align-items-center"
		>
			{{ item.name }}
			<span class="btn btn-light btn-sm border ml-auto" v-if="!showOptions">
				{{ item.order }}
			</span>
			<el-dropdown class="ml-auto" v-else>
				<span class="btn btn-light btn-sm border">
					{{ item.order }}
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.stop.native="openAblumModal({ item, index })">修改</el-dropdown-item>
					<!-- 阻止默认行为，使用原生点击事件 native-->
					<el-dropdown-item @click.stop.native="delAblums(index)">删除</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</li>
	</div>
</template>

<script>
export default {
	name:"imageItem",
	props: {
		ablums: {
			type: Array,
			default: () => []
		},
		ablumsIndex: {
			type: Number,
			default: 0
		},
		showOptions:{
			type:Boolean,
			default:true
		}
	},
	data() {
		return {
		
		};
	},
	methods: {
		changeAblums(index){
			this.$emit('changeAblums',index)
		},
		openAblumModal(options){
			this.$emit('openAblumModal',options)
		},
		delAblums(index){
			this.$emit('delAblums',index)
		}
	}
};
</script>

<style scoped>
.list-group-item.active {
	color: #67c23a !important;
	background-color: #f0f9eb !important;
	border-color: #c2e7b0 !important;
}
</style>
