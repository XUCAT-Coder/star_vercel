export default {
	friends:function(){
		let friendArr=[
			{
			  id:1,
			  imgUrl:'title.png',
			  tip:2,
			  name:'xwl',
			  email:'1',
			  time:new Date(),
			  info:'wo shi 1'
		    },
			{
			  id:2,
			  imgUrl:'adds.png',
			  tip:0,
			  name:'2',
			  email:'2',
			  time:new Date(),
			  info:'wo shi 2'
			},
			{
			  id:3,
			  imgUrl:'reqFri.png',
			  tip:33,
			  name:'3',
			  email:'3',
			  time:new Date(),
			  info:'wo shi 3'
			},
			{
			  id:4,
			  imgUrl:'search.png',
			  tip:44,
			  name:'4',
			  email:'4',
			  time:new Date(),
			  info:'wo shi 4'
			},
			{
			  id:5,
			  imgUrl:'search.png',
			  tip:5,
			  name:'5',
			  email:'5',
			  time:new Date(),
			  info:'wo shi 5'
			},
			{
			  id:6,
			  imgUrl:'search.png',
			  tip:6,
			  name:'6',
			  email:'6',
			  time:new Date(),
			  info:'wo shi 6'
			},
			{
			  id:7,
			  imgUrl:'search.png',
			  tip:7,
			  name:'7',
			  email:'7',
			  time:new Date(),
			  info:'wo shi 7'
			},
			{
			  id:8,
			  imgUrl:'search.png',
			  tip:8,
			  name:'8',
			  email:'8',
			  time:new Date(),
			  info:'wo shi 8'
			},
			{
			  id:9,
			  imgUrl:'search.png',
			  tip:9,
			  name:'9',
			  email:'9',
			  time:new Date(),
			  info:'wo shi 9'
			},
			{
			  id:10,
			  imgUrl:'search.png',
			  tip:10,
			  name:'10',
			  email:'10',
			  time:new Date(),
			  info:'wo shi 10'
			},
			{
			  id:11,
			  imgUrl:'search.png',
			  tip:11,
			  name:'11',
			  email:'11',
			  time:new Date(),
			  info:'wo shi 11'
			},
			{
			  id:12,
			  imgUrl:'search.png',
			  tip:12,
			  name:'12',
			  email:'12',
			  time:new Date(),
			  info:'wo shi 12'
			}
		]
		return friendArr
	},
	isFriend:function () {
		let isFriend=[
			{
				userid:1,
				friend:2
			},
			{
				userid:1,
				friend:5
			},
			{
				userid:1,
				friend:6
			},
			{
				userid:1,
				friend:8
			},
			{
				userid:1,
				friend:9
			},
		]
		return isFriend
	},
	message:function() {
		let msgs=[
			{
				id:'a',
				imgUrl:'out.jpg',
				message:'我是a发出的消息',
				types:0,
				time:new Date()-1000,
				tip:0
			},
			{
				id:'a',
				imgUrl:'out.jpg',
				message:'test.jpg',
				types:1,
				time:new Date()-1000*16,
				tip:1
			},
			{
				id:'a',
				imgUrl:'out.jpg',
				message:'eat.jpg',
				types:1,
				time:new Date()-1000*16*256*256*256,
				tip:2
			},
			{
				id:'a',
				imgUrl:'out.jpg',
				message:'out.jpg',
				types:1,
				time:new Date()-1000*16*256*256*256,
				tip:3
			},
			{
				id:'a',
				imgUrl:'out.jpg',
				message:'out.jpg',
				types:1,
				time:new Date()-1000*16*256*256*256,
				tip:4
			},
			{
				id:'a',
				imgUrl:'out.jpg',
				message:{
					voice:'a',
					time:60
				},
				types:2,
				time:new Date(),
				tip:5
			},
			{
				id:'a',
				imgUrl:'out.jpg',
				message:{
					voice:'a',
					time:60
				},
				types:2,
				time:new Date(),
				tip:6
			},
			{
				id:'a',
				imgUrl:'out.jpg',
				message:{
					voice:'a',
					time:60
				},
				types:2,
				time:new Date(),
				tip:7
			},
			{
				id:'a',
				imgUrl:'out.jpg',
				message:{
					voice:'a',
					time:60
				},
				types:2,
				time:new Date(),
				tip:8
			},
			{
				id:'a',
				imgUrl:'out.jpg',
				message:{
					voice:'a',
					time:60
				},
				types:2,
				time:new Date(),
				tip:9
			},
			{
				id:'b',
				imgUrl:'test.jpg',
				message:'我是b发出的消息',
				types:0,
				time:new Date()-1000,
				tip:10
			},
			
			{
				id:'b',
				imgUrl:'test.jpg',
				message:{
					voice:'b',
					time:20
				},
				types:2,
				time:new Date(),
				tip:11
			},
			{
				id:'b',
				imgUrl:'test.jpg',
				message:'我是b发出的消息',
				types:0,
				time:new Date()-1000,
				tip:12
			},
			{
				id:'b',
				imgUrl:'test.jpg',
				message:'我是b发出的消息',
				types:0,
				time:new Date()-1000,
				tip:13
			},
			{
				id:'b',
				imgUrl:'test.jpg',
				message:'我是b发出的消息',
				types:0,
				time:new Date()-1000,
				tip:14
			},
			{
				id:'b',
				imgUrl:'test.jpg',
				message:'我是b发出的消息',
				types:0,
				time:new Date()-1000,
				tip:15
			},
			{
				id:'b',
				imgUrl:'test.jpg',
				message:'我是b发出的消息',
				types:0,
				time:new Date()-1000,
				tip:16
			},
			{
				id:'b',
				imgUrl:'test.jpg',
				message:'我是b发出的消息',
				types:0,
				time:new Date()-1000,
				tip:17
			},
			{
				id:'b',
				imgUrl:'test.jpg',
				message:'我是b发出的消息',
				types:0,
				time:new Date()-1000,
				tip:19
			},
			{
				id:'b',
				imgUrl:'test.jpg',
				message:'我是b发出的消息',
				types:0,
				time:new Date()-1000,
				tip:20
			},
		]
		return msgs;
	}
}