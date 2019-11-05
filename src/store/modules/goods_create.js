import $Util from "@/common/util.js"
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
				list:[
					{
						name:'黄色',
						image:'',
						color:''
					},
					{
						name:'红色',
						image:'',
						color:''
					}
				]
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
		},
		//增加规格卡片
		addSkuCard(state){
			state.sku_card.push({
				name:'规格名称',
				type:0,
				list:[]
			})
		},
		//删除规格卡片
		delSkuCard(state,index){
			state.sku_card.splice(index,1)		
		},
		//修改规格卡片值
		vModelSkuCard(state,{key,index,value}){
			// console.log(key,index,value)
			state.sku_card[index][key]=value
		},
		//规格卡片排序
		sortSkuCard(state,{action,index}){
			console.log(action,index)
			//上移  操作 ，下标
			$Util[action](state.sku_card,index)
		},
		//增加指定规格卡片的规格属性
		addSkuVulue(state,index){
			state.sku_card[index].list.push({
				
			})
		}
	},
	actions: {

	}
}
