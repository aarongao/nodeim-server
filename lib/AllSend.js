var server = require("../index.js").server ;

module.exports = {
	
	layout: "controlpanel"
	, view: "nodeim-server/templates/AllSend.html"
	, process: function(seed,nut)
	{
		return true ;
	}
	, actions: {
		submit: function(seed,nut)
		{

			if(!seed.text)
			{
				nut.message("发送内容不能为空。",[],"error") ;
				return true ;
			}
			
			var manageDoc = null;
			/**
			 * 找管理员
			 */
//			helper.db.coll("users")
//			.findOne({username:"root"},this.hold(function(err,userDoc){
//				manageDoc = userDoc;
//			}))
			
			
			
			/**
			 * 所有用户
			 */
			var release = this.hold() ;
			helper.db.coll("users")
			.find({"id":{"$gt":0}})
			.each(function(err,docs){

				server.message({id:0,username:'admin'},docs.id,seed.text,undefined,(new Date()).getTime(),undefined,this.hold())
				if(!docs){
					 release() ;
				}
				
			}) ;
			
			
		}
	}
	
}

module.exports.__as_controller = true ;