'use strict';

angular.module('kjmApp')
    .factory('RequestFromWeb', function($q) {
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
            create:function(singer,song,request,singerNames){
              var _this=this;
              _this.set('singer',singer);
              _this.set('song',song);
              _this.set('request',request);
              _this.set('singerNames',singerNames);
              return _this.save().then(function(object){
                return object;
              });
            },
            addSinger: function(singerName) {
                var _this=this;
                _this.addUnique('singerNames', singerName);
                return this.save().then(
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
              var _this=this;
                _this.remove('singerNames', singerName);
                return _this.save().then(function(result) {
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
            }

        });
        return RequestFromWeb;
    });
