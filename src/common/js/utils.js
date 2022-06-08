export default {
	dateTime(date){
		//首页时间转化
		let old=new Date(date)
		let now=new Date()
		//获取旧具体时间
		let d=old.getTime()
		let h=old.getHours()
		let m=old.getMinutes()
		let Y=old.getFullYear()
		let M=old.getMonth()+1
		let D=old.getDate()
		//获取新具体时间
		let nd=now.getTime()
		let nh=now.getHours()
		let nm=now.getMinutes()
		let nY=now.getFullYear()
		let nM=now.getMonth()+1
		let nD=now.getDate()
		//当天时间
		if(D==nD&&M==nM&&Y==nY){
			if(h<10){
				h='0'+h
			}
			if(m<10){
				m='0'+m
			}
			return h+':'+m
		}
		//昨天时间
		if(D+1==nD&&M==nM&&Y==nY){
			if(h<10){
				h='0'+h
			}
			if(m<10){
				m='0'+m
			}
			return '昨天'+h+':'+m
		}else{
			//大于两天
			return Y+'/'+M+'/'+D
		}
		
		
	},
	//聊天时间
	dateTimeChat(date){
		//首页时间转化
		let old=new Date(date)
		let now=new Date()
		//获取旧具体时间
		let d=old.getTime()
		let h=old.getHours()
		let m=old.getMinutes()
		let Y=old.getFullYear()
		let M=old.getMonth()+1
		let D=old.getDate()
		//获取新具体时间
		let nd=now.getTime()
		let nh=now.getHours()
		let nm=now.getMinutes()
		let nY=now.getFullYear()
		let nM=now.getMonth()+1
		let nD=now.getDate()
		//当天时间
		if(D==nD&&M==nM&&Y==nY){
			if(h<10){
				h='0'+h
			}
			if(m<10){
				m='0'+m
			}
			return h+':'+m
		}
		//昨天时间
		if(D+1==nD&&M==nM&&Y==nY){
			if(h<10){
				h='0'+h
			}
			if(m<10){
				m='0'+m
			}
			return '昨天'+h+':'+m
		}else if(Y==nY){
			//今年的
			if(h<10){
				h='0'+h
			}
			if(m<10){
				m='0'+m
			}
			return M+'月'+D+'日 '+h+':'+m
		}else{
			//大于今年的
			if(h<10){
				h='0'+h
			}
			if(m<10){
				m='0'+m
			}
			return Y+'年'+M+'月'+D+'日 '+h+':'+m
		}
		
		
	},
	//间隔时间差
	spaceTime(old,now){
		old=new Date(old)
		now=new Date(now)
		var told=old.getTime()
		var tnow=now.getTime()
		if(told>(tnow+1000*60*5)){
			return now
		}else{
			return ''
		}
	}
}