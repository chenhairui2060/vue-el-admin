<template>
	<el-dialog title="商品规格选择" :visible.sync="createModel" width="80%">
		<el-container style="position: relative;height: 60vh; margin: -30px -20px;">
			<el-container>
				<!-- 侧边 相册列表-->
				<el-aside width="200px" class="bg-white border-right" style="position: absolute;top:0;left: 0;bottom: 0;">
					<!-- 侧边，规格卡片标题 -->
					<ul class="list-group list-group-flush">
						<li class="list-group-item list-group-item-action " 
						v-for="(item,index) in skuList" 
						:class="skuIndex==index?'sku-active':''"
						@click="changeSku(index)"
						:key="index">{{item.name}}</li>
					</ul>
				</el-aside>
				<el-container>
					<!-- 头部 -->
					<el-header style="position: absolute;top: 0;left: 200px;right: 0;height: 60px;line-height: 60px;" class="border-top border-bottom">
						<el-button 
						@click="doChooseAll"
						type="primary" size="mini">
							{{isAllChoose?"取消全选":"全选"}}
							</el-button>
					</el-header>
					<!-- 主布局 -->
					<el-main style="position: absolute;top:60px;bottom: 0;right: 0;left: 200px;">
						<div class="d-flex flex-wrap">
							<span 
							v-for="(item,index) in skuItem"
							:key="index"
							:class="item.ischeck?'sku-active':''"
							@click="choose(item)"
							class="border rounded py-1 px-2 m-1 " style="cursor: pointer;">{{item.name}}</span>
						</div>
					</el-main>
				</el-container>
			</el-container>
		</el-container>
		<div slot="footer" class="dialog-footer">
			<el-button @click="hide">取 消</el-button>
			<el-button type="primary" @click="confirm">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
	data() {
		return {
			createModel: false,
			callback: false,
			//选中列表
			chooseList: [],
			skuIndex:0,
			//数据
			skuList: [
				{
					name: '颜色', //规格名称
					type: 0, //规格类型 0无 1颜色 2图片
					list: [
						{
							id:0,
							name: '黄色',
							image: '',
							color: '',
							ischeck:false
						},
						{
							id:1,
							name: '红色',
							image: '',
							color: '',
							ischeck:false
						}
					]
				},
				{
					name: '规格', //规格名称
					type: 0, //规格类型 0无 1颜色 2图片
					list: [
						{
							id:2,
							name: 'xl',
							image: '',
							color: '',
							ischeck:false
						},
						{
							id:3,
							name: 'xxl',
							image: '',
							color: '',
							ischeck:false
						}
					]
				}
			]
		};
	},
	computed:{
		//当前规格下的规格列表
		skuItem(){
			return this.skuList[this.skuIndex].list
		},
		isAllChoose(){
			return this.skuItem.length==this.chooseList.length
		}
	},
	methods: {
		//隐藏弹窗
		hide() {
			this.createModel = false;
			this.callback = false;
			this.unChooseAll();
		},
		//打开弹窗  callback传过来的函数  空函数
		chooseSkus(callback) {
			this.callback = callback;
			this.createModel = true;
		},
		//确定
		confirm() {
			//选中的sku
			if (typeof this.callback === 'function') {
				let item=this.skuList[this.skuIndex];
				this.callback({
					name:item.name,
					type:item.type,
					list:this.chooseList
				});
			}
			//隐藏
			this.hide();
		},
		//切换规格卡片
		changeSku(index){
			this.unChooseAll();
			this.skuIndex=index;
		},
		//选中规格属性
		choose(item){
			//之前没有选中
			if(!item.ischeck){
				this.chooseList.push(item);
				return item.ischeck=true
			}
			//之前没有选中
			//找到当前对象在chooseList中的索引
			let index=this.chooseList.findIndex(v=>v.id===item.id);
			if(index<0) return;
			this.chooseList.splice(index,1);
			item.ischeck=false;
		},
		doChooseAll(){
			//是否已经全选
			if(this.isAllChoose){
			    this.unChooseAll()
				return
			}
			this.chooseList=this.skuItem.map(v=>{
				v.ischeck=true;
				return v
			})		
		},
		//取消选中
		unChooseAll(){
			//取消选中状态
			this.skuItem.forEach(v=>{
				v.ischeck=false
			})
			//清空选中列表
			this.chooseList=[];
		}
	}
};
</script>

<style scoped>
.sku-active {
	color: #ffffff;
	background-color: teal;
	border-color: teal;
}
</style>
