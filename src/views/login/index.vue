<template>
	<div class="container">
		<div class="row ">
			<div class="col-12 m-auto col-sm-9 col-md-7 col-lg-5 ">
				<div class="card ">
					<div class="card-header bg-white"><h3 class="text-center">后台管理系统登录</h3></div>
					<div class="card-body">
						<el-form ref="login" :rules="rules" :model="form">
							<el-form-item prop="username"><el-input v-model="form.username" placeholder="请输入用户名"></el-input></el-form-item>
							<el-form-item prop="password"><el-input v-model="form.password" placeholder="请输入用户密码"></el-input></el-form-item>
							<el-form-item><el-button type="primary" class="w-100" @click="submitForm('login')">立即登录</el-button></el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				username: '',
				password: ''
			},
			rules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
				password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }, { min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: 'blur' }]
			}
		};
	},
	methods: {
		submitForm(formName) {
			// console.log(this.$refs)
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$router.push({name:'index'})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
};
</script>

<style scoped>
.container {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
