// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define('getFbId', function(request, response) {
    Parse.Cloud.useMasterKey();
    var userId=request.object.get('userId');
    var query=new Parse.Query(Parse.User);
    query.select('fbId');
    query.equalTo('objectId',userId);
    response.success(query.first().then(function(result){
        return result;
    }));
    
});
// var processWeb = function(result) {
//     console.log('started processWeb');
//     aryCnt = [];
//     console.log('Count of result is: ' + result);
//     result.forEach(function(req, index) {
//         var Request = Parse.Object.extend('Request');
//         var newQ = new Parse.Query(Request);
//         console.log('processing' + req.singer + '***' + req.songName);
//         newQ.equalTo('singer', req.singer);
//         newQ.equalTo('songName', req.songName);
//        return newQ.count();
   

   
        
        
//     });


// };
Parse.Cloud.define('endOfNight', function(req, res) {
            Parse.Cloud.useMasterKey();


            var query3 = new Parse.Query('RequestListEntry');
            return query3.find().then(function(results) {
                var promises = [];
                results.forEach(function(result) {
                    // Start this delete immediately and add its promise to the list.
                    promises.push(result.destroy());
                });
                // Return a new promise that is resolved when all of the deletes are finished.
                return Parse.Promise.when(promises);

            })
            .then(function() {
                var query2 = new Parse.Query('Request');
                query2.find().then(function(results){
                    var promises2 = [];
                    results.forEach(function(result){
                        // Start this delete immediately and add its promise to the list.
                        result.set('delete', true);
                        promises2.push(result.save());
                    });
                    // Return a new promise that is resolved when all of the deletes are finished.
                    return Parse.Promise.when(promises2);

                })
                .then(function() {
                    var query = new Parse.Query('RequestFromWeb');
                    query.find().then(function(results){
                        var promises3 = [];
                        results.forEach(function(object) {
                            // Start this delete immediately and add its promise to the list.
                            console.log('creating histpry)');
                            var song=object.get('song');
                            var singer=object.get('singer');
                            var relation=singer.relation('history');
                            relation.add(song);
                            promises3.push(singer.save());
                            var HistoryEntry = Parse.Object.extend('History');
                            var historyEntry = new HistoryEntry();
                            historyEntry.set('song',song );
                            historyEntry.set('singer', singer);
                            historyEntry.addUnique('dateSung', object.createdAt);

                            promises3.push(historyEntry.save());
                            console.log('saving history');
                            promises3.push(object.destroy());

                           
                        });
                         return Parse.Promise.when(promises3);
                        })
                        .then(function(){
                            return res.success('EON SUCCESS');
                        });
                    
                });
            });
});
        


                        // Return a new promise that is resolved when all of the deletes are finished.
                    

    

//     var query = new Parse.Query('RequestFromWeb');
//     query.include('request');
//     console.log('QUERYING****');
//     query.find({
//         success: function(webRequests) {
//             webRequests.forEach(function(webRequest, index) {
//                 console.log('****REQUEST #' + index);
//                 if (webRequest.get('request').get('singer') === null) {
//                     webRequest.destroy();
//                     console.log('DESTROYED***');
//                 }
//             });

//         },
//         error: function(err) {
//             console.log('**ERROR***' + err);
//             res.error(err);
//         }
//     });
//     res.success('Success');
// });
// Parse.Cloud.define('storeHistory',function(req,res){
//  Parse.Cloud.useMasterKey();
//         var message='';
//     var query=new Parse.Query('RequestFromWeb');
//     query.include('song');
//     query.include('singer');
//     query.find().then(function(result){
//         message=message+ " found result: " + result;
//         if(result){
//                 var results=result.map(function(obj){
//                     return {
//                         'singer':obj.get('singer').get('nick'),
//                         'songName':obj.get('song').get('bareFile')
//                     };
//                 });

//                     message=message+results;
//                                 message=message+ 'Counts are:' + processWeb(results).then(function(res){
//                                     return res;
//                                 });
//               }
 //                newQ.first().then(function(fReq){
 //                    message=message+'FREQ: ' + fReq;     
 //                    return fReq;
 //                });
 //                message=message+match.toString();
            
 //                try{
 //                    if (match.get('singer')){
 // } else {
 //    message=message+ "ELSEIF MATCH";
 // }} catch(err){
 //    message=message+ ' NO MATCH ' + err;
 //    var HistoryEntry=Parse.Object.extend('History');
 //    var historyEntry=new HistoryEntry();
 //                        message=message+'creating history for: '+ song.get('bareFile') + ' : ' + singer.get('nick');

 //                   historyEntry.set('song',song);
 //                    historyEntry.set('singer',singer);
 //                    message=message+  ' SAVING HISTOY';
 //                    historyEntry.save();
 //                       message=message+'saved ' ;
 //                    req.destroy();    
 

                
                
 //             }   
        //     });
//             res.success(message);
//         // }

//     },function(error){
//         console.log(error);
//             res.error(error);
        
//     });
// });
Parse.Cloud.afterDelete('RequestFromWeb', function(request, response) {
    console.log('req object:  ' + request.object);
    var req = Parse.Object.extend('Request');
    req.id = request.object.get('request').id;
    var query = new Parse.Query('Request');
    query.get(req.id, {
        success: function(req) {
            var singer = req.get('singer');
            var filepath = req.get('filePath');
            var songId = parseInt(req.get('songId'));
            var songName = req.get('songName');

            var song = {
                'filePath': filepath,
                'singer': singer,
                'songId': songId,
                'songName': songName
            };
            var query = new Parse.Query('RequestListEntry');
            query.equalTo('singer', singer);
            return query.first().then(function(requests) {
                if (requests) {
                    requests.remove('requests', song);
                    return requests.save().then(function(res) {
                        if (!(requests.get('requests'))[0]) {
                            requests.destroy();
                        }
                        return res;
                    });
                } else {
                    return;
                }
            });
            response.success();

        },
        error: function(error) {
            console.log(error.message);
            response.error(error);
        }
    });

});

Parse.Cloud.afterSave('RequestListEntry', function(request, response) {
    var RequestListEntry=Parse.Object.extend('RequestListEntry');
    var requestListEntry=new RequestListEntry();
    requestListEntry.id=request.object.id;

    var query = new Parse.Query(RequestListEntry);
    var singer = request.object.get('singer');
    var singerRequests = request.object.get('requests');
    console.log('*************SINGERREQUESTS***********' + singer +  request.object);
    query.equalTo('singer', singer);
    query.notEqualTo('objectId',requestListEntry.id);
    return query.find().then(function(results){
        results.forEach(function(element, index){
            element.get('requests').forEach(function(song, index){
        requestListEntry.addUnique('requests',song);
        console.log("ADDING " + song);
            });
        
            element.destroy();
        });
        return requestListEntry.save().then(function(result){
            return result;
        });
    },function(error){
        console.log(error);
    }
    );
});

Parse.Cloud.afterSave('Request', function(request, response) {
    var songName = request.object.get('songName');
var singer = request.object.get('singer');

var updateWebRequest = function(request) {
    var RequestFromWeb = Parse.Object.extend('RequestFromWeb');
    var songName = request.object.get('songName');
    var singer = request.object.get('singer');
    var query2 = new Parse.Query(RequestFromWeb);
    var req = request.object;
    console.log('SEARCHING FOR SINGER: ' + singer);
    query2.containsAll('singerNames', [singer]);
    query2.include('song');
    var promises = [];


    return query2.find().then(
        function(result) {
    
            result.forEach(function(webRequest, index) {
    console.log('INDEX' + index);
                console.log('WEBREQUEST SONGNAME ' + webRequest.get('song').get('bareFile'));
                if (webRequest.get('song').get('bareFile') === songName) {
                    webRequest.set('request', req);
                    promises.push(webRequest.save());
                }
            });

        },
        function(error){
            console.log(error);
        });
    return Parse.Promise.when(promises);
};
updateWebRequest(request);

// ******
var query = new Parse.Query('RequestListEntry');
var count = 0;

var filepath = request.object.get('filePath');


var songId = parseInt(request.object.get('songId'));
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
        var qu = new Parse.Query('RequestListEntry');
        qu.count().then(function(cnt) {
            var RequestListEntry = Parse.Object.extend('RequestListEntry');
            var req = new RequestListEntry();

            console.log('setting variables singer:' + singer + '  singerOrder:' + cnt + '  filePath:' + filepath + '  name:' + songName + '   songId:' + songId);
            req.set('singer', singer);
            req.set('singerOrder', cnt);
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
