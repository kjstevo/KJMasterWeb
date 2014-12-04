'use strict';

angular.module('kjmApp')
    .factory('RequestFromWeb', function($q,Request,SongFile) {
        // Service logic
        // ...

        var RequestFromWeb = Parse.Object.extend('RequestFromWeb', {
            attrs: [
                'singer',
                'request',
                'song',
                'singerNames'
            ],
            // Public API here
            // getSong: function() {
            //     var defer = $q.defer();
            //     var song = this.get('song');
            //     song.fetch({
            //         success: function(result) {
            //             defer.resolve(result);
            //         },
            //         error: function(error) {
            //             defer.reject(error);
            //             console.log(error);
            //         }
            //     });
            //     return defer.promise;
            // },
            // getSinger: function() {
            //     var defer = $q.defer();
            //     var singer = this.get('singer');
            //     singer.fetch({
            //         success: function(result) {
            //             defer.resolve(result);
            //         },
            //         error: function(error) {
            //             defer.reject(error);
            //             console.log(error);
            //         }
            //     });
            //     return defer.promise;
            // },
            // getRequest: function() {
            //     var defer = $q.defer();
            //     var request = this.get('request');
            //     request.fetch({
            //         success: function(result) {
            //             defer.resolve(result);
            //         },
            //         error: function(error) {
            //             defer.reject(error);
            //             console.log(error);
            //         }
            //     });
            //     return defer.promise;
            // },
            addSinger: function(singerName) {
                this.addUnique('singerNames', singerName);
                this.save().then(
                    function(result) {
                        return result;
                    },
                    function(error) {
                        console.log(error);
                        return;
                    }
                );
            },
            removeSinger: function(singerName) {
                this.remove('singerNames', singerName);
                this.save().then(function(result) {
                    return result;
                }, function(error) {
                    console.log(error);
                    return;
                });
            },
            isSinger: function(singer) {
                try {
                    if (singer.id === this.get('singer').id) {
                        return true;
                    } else {
                        return false;
                    }
                } catch (error) {
                    console.log(error);
                    return error;
                }

            },
            isSong: function(song) {
                try {
                    if (song.id === this.get('song').id) {
                        return true;
                    } else {
                        return false;
                    }

                } catch (error) {
                    console.log(error);
                    return error;
                }
            },
            isRequest:function(request) {
                try {
                    if (request.id === this.get('request').id) {
                        return true;
                    } else {
                        return false;
                    }

                } catch (error) {
                    console.log(error);
                    return error;
                }
            },
            createRequest:function() {
                var defer = $q.defer();
                var query=new Parse.Query(SongFile);
                var song=this.get('song');     
                var singerNames=this.get('singerNames');
                query.get(song.id,{
                  success:function(result){
                      var songName=result.get('bareFile');
                      var filepath=result.get('filepath');
                      var singer=Parse.User.current();
                      var songId=result.get('key');
                      var request = (new Request());
                      var singerName=singer.get('nick');
                    
                      if(singerNames){
                        singerNames.forEach(function(name, index){
                          singerName=singerName+'-'+name;
                        });
                      }                      
                      request.set('singer',singerName);
                      request.set('songName',songName);
                      request.set('filePath',filepath);
                      request.set('songId',songId);
                      request.save();

                      defer.resolve(request);
                  },
                  error:function(error){
                      defer.reject(error);
                      }
                  });
                return defer.promise;
            }
        });
        return RequestFromWeb;
    });
