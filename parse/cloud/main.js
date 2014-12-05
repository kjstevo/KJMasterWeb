// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define('hello', function(request, response) {
    response.success('Hello world!');
});
Parse.Cloud.beforeDelete('RequestFromWeb',function(request,response){
    var req=request.object.get('request');
    req.fetch().then(function(){
            var singer=req.get('singer');
            var filepath=req.get('filePath');
            var songId=parseInt(req.get('songId'));
            var songName=req.get('songName');
           
            var song = {
                        'filePath': filepath,
                        'singer': singer,
                        'songId': songId,
                        'songName': songName
                        };
            var query=new Parse.Query('RequestListEntry');
            query.equalTo('singer',singer);
            query.first().then(function(requests){       
                    if (requests) {
                        requests.remove('requests', song);
                        requests.save().then(function() {
                            response.success();
                               }, function(error) {
                            response.error(error.message);
                        });
                    }
                });
        });


});
Parse.Cloud.afterSave('Request', function(request, response) { 
        var query = new Parse.Query('RequestListEntry');
        var count=0;

        var filepath = request.object.get('filePath');
    	var songName = request.object.get('songName');
    	var singer = request.object.get('singer');
        var songId=parseInt(request.object.get('songId'));
        query.equalTo('singer', singer);
        query.first({
            success: function(requests) {    	
                if (requests) {
				    requests.addUnique('requests', {
				        'filePath': filepath,
				        'singer': singer,
				        'songId': songId,
				        'songName': songName,

				    });
				    requests.save().then(function() {
				    	response.success();
				    	   }, function(error) {
				        response.error(error.message);
				    });
	            } else {
                    var RequestListEntry = Parse.Object.extend('RequestListEntry');
                    var req = new RequestListEntry();
                    var count=function(){
                    	var qu=new Parse.Query('RequestListEntry');
                    	qu.count().then(function(cnt){
                    		return cnt;
                    	});
                    };
                    req.set('singer',singer);
                    req.set('singerOrder',count);
                    req.addUnique('requests', {
				        'filePath': filePath,
				        'singer': singer,
				        'songId': 0,
				        'songName': songName,
				        
				    });
				    req.save().then(
				    	function() {
								return;
				    	  }, 
				    	function(error) {
				        	return error;
				    	}
				    );
                }

            },
            error: function(error) {
                console.error('Error finding related requests ' + error.code + ': ' + error.message);
            }
        });
    
    
});



require('cloud/app.js');
