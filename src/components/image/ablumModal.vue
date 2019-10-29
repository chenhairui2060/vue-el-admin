<template>
	<!-- 模态框 修改或者创建相册-->
	<el-dialog :title="modalTitle" :visible.sync="show">
		<el-form :model="ablumForm">
			<el-form-item label="相册名称" :label-width="formLabelWidth">
				<el-input size="medium" placeholder="请输入相册名称" v-model="ablumForm.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="相片张数" :label-width="formLabelWidth"><el-input-number v-model="ablumForm.order" :disabled="numdisabled" :min="0" :step="1"></el-input-number></el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="clickCancel">取 消</el-button>
			<el-button type="primary" @click="clickConfirm">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
	props: {
		ablumModal: {
			type: Boolean,
			default: false
		},
		modalTitle: {
			type: String,
			default:'修改相册'
		},
		ablumForm: {
			name: '',
			order: 0
		},
		formLabelWidth: {
			type: String,
			default: '120px'
		},
		numdisabled:{
			type:Boolean,
			default:false
		}
	},
	watch: {
		ablumModal(val) {
			this.show = val;
		},
		show(val) {
			//监听show的值，当show的值发生改变的时候val即为当前show的值，把该值传给父组件的v-model属性（v-model绑定的是input事件，出发Input事件）
			this.$emit('input', val);
		}
	},
	data() {
		return {
			show: false
		};
	},
	methods: {
		clickCancel() {
			this.show = false;
			this.$emit('clickCancel');
		},
		clickConfirm() {
			this.show = false;
			this.$emit('oncilckConfirm',this.ablumForm);
		}
	}
};
</script>

<style></style>
