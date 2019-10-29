// vue的mixins的使用
// mixins就是混入。
// 一个混入对象可以包含任意组件选项。
// 同一个生命周期，混入对象会比组件的先执行。
export default{
	filters:{
		//数字转字符串方法
		numToString(val){
			return val.toString()
		}
	}
}
