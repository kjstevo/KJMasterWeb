// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define('hello', function(request, response) {
    response.success('Hello world!');
});
Parse.Cloud.afterDelete('RequestFromWeb',function(request,response){
    console.log('req object:  '+ request.object);
    var req=Parse.Object.extend('Request');
    req.id=request.object.get('request').id;
    var query=new Parse.Query('Request');
    query.get(req.id,{
        success:function(req){   
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
           return query.first().then(function(requests){       
                    if (requests) {
                        requests.remove('requests', song);
                      return requests.save().then(function(res) {
                        if(!(requests.get('requests'))[0]){
                            requests.destroy();
                        }
                            return res;      
                    });
                } else {
                  return;
                }
                });
           response.success();

     }, error: function(error){
            console.log(error.message);
            response.error(error);
     }
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
                    console.log("found requests" + requests);
				    requests.addUnique('requests', {
				        'filePath': filepath,
				        'singer': singer,
				        'songId': songId,
				        'songName': songName,

				    });
				    return requests.save().then(function(reqs) {
				    	return reqs;
				    	   }, function(error) {
				        return error;
				    });
	            } else {
                    console.log("creating new request");
                   var qu=new Parse.Query('RequestListEntry');
                    qu.count().then(function(cnt){
                           var RequestListEntry = Parse.Object.extend('RequestListEntry');
                    var req = new RequestListEntry();
                    
                    console.log('setting variables singer:' + singer + '  singerOrder:' + cnt + '  filePath:' + filepath + '  name:' + songName + '   songId:' + songId);
                    req.set('singer',singer);
                    req.set('singerOrder',cnt);
                    req.addUnique('requests', {
                        'filePath': filepath,
                        'singer': singer,
                        'songId': songId,
                        'songName': songName,
                        
                    });
                    console.log('saving');
                    return req.save().then(
                        function(reqs) {
                            console.log('returning: ' + reqs);
                                return reqs;
                          }, 
                        function(error) {
                            console.log(error);
                            return error;
                        }
                    );          
                        });
                    };
                 
             

            },
            error: function(error) {
                console.error('Error finding related requests ' + error.code + ': ' + error.message);
            }
        });
    
    
});



require('cloud/app.js');
