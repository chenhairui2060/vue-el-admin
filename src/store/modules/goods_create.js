// 创建商品
export default {
	state: {
		sku_type: 0, //单规格，多规格
		title: '',//商品名称
		category: [],//商品分类
		desc: '',//商品描述
		unit: '',//商品单位
		stock: 0,//总库存
		min_stock: 0,//预警库存
		display_stock: 0,//库存显示
		status: 0,//是否上架
		express: '',//运费模块
		oprice:0,//市场价格
		pprice:0,//销售价格
		cprice:0,//成本价格
		weight:0,//重量
		volume:0,//体积
		//增加卡片
		sku_card:[
			{
				name:"颜色",//规格名称
				type:0,//规格类型 0无 1颜色 2图片
				list:[]
			}
		]
	},
	getters: {

	},
	mutations: {
		//修改state
		vModelState(state,{key,value}){
			console.log(key,value)
			// console.log(state)
			state[key]=value
		}
	},
	actions: {

	}
}
