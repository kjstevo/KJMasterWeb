'use strict';

angular.module('kjmApp')
    .factory('AuthDb', function AuthDb($rootScope, $cookieStore, $q, ParseSDK, User, SongFile, Queue, WebRequest, History,Request,Facebook,RequestFromWeb) {
        // Service logic
        // ...

        /**
         * Return a callback or noop function
         *
         * @param  {Function|*} cb - a 'potential' function
         * @return {Function}
         */


        var currentUser = {};
        var safeCb = function(cb) {
            return (angular.isFunction(cb)) ? cb : angular.noop;
        };

        $rootScope.sessionUser = function() {
            return currentUser;
        };


        if (angular.isDefined($cookieStore.get('token'))) {
            try {
                var token = $cookieStore.get('token');
                Parse.User.become(token);
                currentUser = Parse.User.current();

            } catch (error) {
                console.log(error);
            }
        }



        return {
            /**
             * Authenticate user with saved token
             *
             * @param  {Object}   token     - saved token
             * @param  {Function} callback - optional, function(error)
             * @return {Promise}
             */


            loginToken: function(token, callback) {
                return Parse.User.become(token,
                    function(data) {
                        currentUser = Parse.User.current();
                        return safeCb(callback)(data);
                    },
                    function(err) {
                        return safeCb(callback)(err);
                    }.bind(this)).$promise;


            },
            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional, function(error)
             * @return {Promise}
             */
            login: function(email, password) {
                var defer = $q.defer();
                Parse.User.logIn(email, password, {
                    success: function() {
                        try {
                            currentUser = Parse.User.current();
                            $cookieStore.put('token', currentUser.getSessionToken());
                            $rootScope.sessionUser = currentUser;
                            defer.resolve(currentUser);

                        } catch (error) {
                            defer.reject(error);
                        }


                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });

                return defer.promise;
            },
            logout: function() {
                var defer = $q.defer();
                Parse.User.logOut();
                try {
                    $cookieStore.remove('token');
                    currentUser = {};
                    $rootScope.sessionUser = null;

                } catch (error) {
                    defer.reject(error);
                }
                defer.resolve(true);
                return defer.promise;
            },

            /**
             * Delete access token and user info
             */

            getUsers: function() {
                if (this.isAdmin()) {


                    var defer = $q.defer();

                    var query = new Parse.Query(User);

                    query.find({

                        success: function(aUsers) {
                            defer.resolve(aUsers);

                        },
                        error: function(aError) {
                            defer.reject(aError);
                        }
                    });

                    return defer.promise;
                }
            },
            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional, function(error, user)
             * @return {Promise}
             */
            createUser: function(username, password, attr, callback) {
                // var mUser = new User();
                // mUser.setUsername(username);
                // mUser.setPassword(password);
                var defer = $q.defer();



                Parse.User.signUp(username, password, attr, {
                    success: function() {
                        try {
                            currentUser = Parse.User.current();
                            $cookieStore.put('token', currentUser.getSessionToken());

                        } catch (error) {
                            defer.reject(error);
                        }
                        defer.resolve(currentUser);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;



            },
            deleteUser: function(user, callback) {

                return user.destroy(function() {

                        return safeCb(callback)(true);
                    },
                    function(err) {
                        return safeCb(callback)(err);
                    }.bind(this)).$promise;

            },
            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional, function(error, user)
             * @return {Promise}
             */
            changePassword: function(oldPassword, newPassword, callback) {
                return User.setPassword(newPassword,
                    function(user) {
                        return safeCb(callback)(null, user);
                    },
                    function(err) {
                        return safeCb(callback)(err);
                    }).$promise;
            },

            /**
             * Gets all available info on a user
             *   (synchronous|asynchronous)
             *
             * @param  {Function|*} callback - optional, funciton(user)
             * @return {Object|Promise}
             */
             getHistoryForDates:function(dt1,dt2){
                var defer=$q.defer();
                var query=new Parse.Query(History);
                query.greaterThanOrEqualTo('createdAt',dt1);
                query.lessThanOrEqualTo('createdAt',dt2);
                query.equalTo('singer',Parse.User.current());
                query.include('song');
                query.find({
                    success:function(results){
                        defer.resolve(results);
                    },
                    error:function(error){
                        defer.reject(error);
                    }
                });
                return defer.promise;
             },
            getCurrentUser: function(callback) {

                return safeCb(callback)(currentUser);

                //   var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
                // return $q.when(value)
                //     .then(function(currentUser) {
                //         safeCb(callback)($rootScope.sessionUser);
                //         return $rootScope.sessionUser;
                //     }, function() {
                //         safeCb(callback)({});
                //         return {};
                //     });

            },

            /**
             * Check if a user is logged in
             *   (synchronous|asynchronous)
             *
             * @param  {Function|*} callback - optional, function(is)
             * @return {Bool|Promise}
             */
            isLoggedIn: function(callback) {
                if (currentUser) {
                    if (callback !== null) {
                        return safeCb(callback)(true);
                    }
                    return true;
                }
                if (callback !== null) {
                    return safeCb(callback)(false);
                }
                return false;


            },

            /**
             * Check if a user is an admin
             *   (synchronous|asynchronous)
             *
             * @param  {Function|*} callback - optional, function(is)
             * @return {Bool|Promise}
             */
            // isAdmin: function(callback) {
            //     if (arguments.length === 0) {
            //         return currentUser.get('role') === 'admin';
            //     }

            //     return this.getCurrentUser(null)
            //         .then(function(user) {
            //           if (User.current()){
            //             var is = user.get('role') === 'admin';
            //             safeCb(callback)(is);
            //             return is;
            //         });
            //         return false;
            // },
            isAdmin: function(callback) {
                try {
                    // if (!this.isLoggedIn()) {
                    //     safeCb(callback)(false);
                    //     return false;
                    // }
                    var user = Parse.User.current();
                    if (user.get('role') === 'admin') {
                        safeCb(callback)(true);
                        return true;
                    } else {
                        safeCb(callback)(false);
                        return false;
                    }
                } catch (err) {
                    safeCb(callback)(false);
                    return false;
                }
            },
            /**
             * Get auth token
             *
             * @return {String} - a token string used for authenticating
             */
            getToken: function() {
                return $cookieStore.get('token');
            },

            searchSongs: function(searchTerms) {
                var toLowerCase = function(w) {
                    return w.toLowerCase();
                };
                var words = searchTerms.split(/\b/);
                words = _.map(words, toLowerCase);
                var stopWords = ['the', 'in', 'and', 'of', 'an', 'a', 'i'];
                words = _.filter(words, function(w) {
                    return w.match(/^\w+$/) && !_.contains(stopWords, w);
                });

                var Catalog = Parse.Object.extend({
                    className: 'fish2_Catalog',
                    // Extend the object with getter and setters  (see parse-angular-patch GitHub repo)
                    attrs: ['artist',
                        'title',
                        'name'
                    ]
                });

                var query = new Parse.Query(Catalog);
                var defer = $q.defer();
                query.containsAll('searchTerms', words);
                query.select('artist', 'title', 'name');
                query.find({
                    success: function(results) {
                        defer.resolve(results);

                        // $scope.$apply(function() {
                        //     $scope.results = results;
                        // });

                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            },
            loadSongsByLetter: function(letter, type) {
                var lcType = type.toLowerCase();

                var query = new Parse.Query(type);
                query.limit(1000);
                var defer = $q.defer();

                query.startsWith(lcType, letter);
                query.select(lcType);
                query.find({
                    success: function(results) {
                        defer.resolve(results);

                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            },
            loadSongsByType: function(name, type) {
                var lcType = type.toLowerCase();
                var query = new Parse.Query(SongFile);
                var defer = $q.defer();
                query.equalTo(lcType, name);
                query.find({
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            },
            addToSongbook: function(id) {
                var user = Parse.User.current();
                var relation = user.relation('songbook');
                var defer = $q.defer();
                var query = new Parse.Query('Song');
                query.get(id, {
                    success: function(results) {
                        relation.add(results);
                        user.save();
                        defer.resolve(relation);

                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            },
            retrieveSongbook: function() {
                var user = Parse.User.current();
                var relation = user.relation('songbook');
                var defer = $q.defer();
                relation.query().find({
                    success: function(list) {
                        defer.resolve(list);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            loadSongById: function(id) {

                var query = new Parse.Query('Song');
                var defer = $q.defer();

                query.get(id, {
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            },
            loadSongByName: function(name) {

                var query = new Parse.Query('Song');
                var defer = $q.defer();
                query.equalTo('bareFile', name);
                query.first({
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            },
            isInSongbook: function(songId) {
                var user = Parse.User.current();
                var relation = user.relation('songbook');
                var defer = $q.defer();
                relation.query().get(songId, {
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
            isInQuickList: function(songId) {
                var user = Parse.User.current();
                var relation = user.relation('quickList');
                var defer = $q.defer();
                relation.query().get(songId, {
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },
             isInRequestList: function(songId){
           var user = Parse.User.current();
                
                var defer = $q.defer();
                var song=new SongFile();
                song.id=songId;
                song.fetch({
                    success:function(song){
                        var query = new Parse.Query(Request);
                        query.equalTo('songName',song.get('bareFile'));
                        query.notEqualTo('delete',true);
                        query.count({
                            success: function(results) {
                                defer.resolve(results);
                            },
                            error: function(error) {
                                defer.reject(error);
                            }
                        });
                    },error:function(error){
                        defer.reject(error);
                    }
                });
                        return defer.promise;
                
            },
            isInSelfRequestList: function(songId){
            var user = Parse.User.current();
                
                var defer = $q.defer();
                var song=new SongFile();
                song.id=songId;
                var query = new Parse.Query(RequestFromWeb);
                query.equalTo('song',song);
                query.equalTo('singer',Parse.User.current());
                query.first({
                    success: function(results) {                          
                        defer.resolve(results);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                    
                return defer.promise;
            },
            addToQuickList: function(id) {
                var user = Parse.User.current();
                var relation = user.relation('quickList');
                var defer = $q.defer();
                var query = new Parse.Query('Song');
                query.get(id, {
                    success: function(results) {
                        relation.add(results);
                        user.save();
                        defer.resolve(relation);

                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            },
            retrieveQuickList: function() {
                var user = Parse.User.current();
                var relation = user.relation('quickList');
                var defer = $q.defer();
                relation.query().find({
                    success: function(list) {
                        defer.resolve(list);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;
            },

            loginFacebook:function(nick){
                var defer=$q.defer();
                Parse.FacebookUtils.logIn(null, {
                 success: function(user) {
                            currentUser = user;
                            $cookieStore.put('token', currentUser.getSessionToken());
                            $rootScope.sessionUser = currentUser;
                    if(!user.existed){
                        user.set('nick',nick);
                        user.set('role','user');
                        user.save();
                    }
                     
                    defer.resolve(user);
                 },
                 error: function(user, error) {
                     defer.reject(error);
                 }
             });
                return defer.promise;
             },

            delFromQuickList: function(id) {
                var user = Parse.User.current();
                var relation = user.relation('quickList');
                var defer = $q.defer();
                var query = new Parse.Query('Song');
                query.get(id, {
                    success: function(results) {
                        relation.remove(results);
                        user.save();
                        defer.resolve(relation);

                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            },

             delFromRequestList: function(requestFromWeb) {
                var user = Parse.User.current();       
                var defer = $q.defer();
                var request=requestFromWeb.get('request');
                request.set('delete',true);
                defer.resolve(request.save().then(function(res){
                    return requestFromWeb.destroy().then(function(result){
                        return result;    
                    });
                
                }));
                return defer.promise;
               
            },
            getQueueCount: function() {
                var query = new Parse.Query(Queue);
                var defer = $q.defer();
                query.count({
                    success: function(count) {
                        defer.resolve(count);
                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }
                });
                return defer.promise;

            },
            getQueue: function(size) {
                var query = new Parse.Query(Queue);
                var defer = $q.defer();
                if (size !== 'large') {
                    query.limit(5);
                }
                query.ascending('singerOrder');
                query.find({
                    success: function(results) {
                        defer.resolve(results);
                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            },
            addToQueue: function(song) {
             var user = Parse.User.current();
             var request = (new Request())
                 .create(
                     song.get('bareFile'),
                     user.get('nick'),
                     song.get('filepath'),
                     parseInt(song.get('key'))
                 ).then(function(request) {
                     var requestFromWeb = (new RequestFromWeb())
                         .create(
                             user,
                             song,
                             request, [user.get('nick')]
                         );
                     return requestFromWeb.save()
                         .then(function(object) {
                             return object;
                         });


                 });
            },
            // addToQueue: function(id) {
            //     var user = User.current();
            //     var requestListEntry=user.requestListEntry;
                
            //     var checkWebRequest = function() {
            //         var defer = $q.defer();
            //         var query = new Parse.Query(WebRequest);
            //         query.equalTo('singer', user);

            //         query.first({
            //             success: function(result) {
            //                 if (result) {
            //                     defer.resolve(result);
            //                 } else {
            //                     defer.resolve((new WebRequest()));
            //                 }
            //             },
            //             error: function(error) {
            //                 console.log(error);
            //                 defer.resolve((new WebRequest()));
            //             }
            //         });
            //         return defer.promise;
            //     };

            //     var checkHistory = function(songFile) {
            //         var defer = $q.defer();
            //         var query = new Parse.Query(History);
            //         query.equalTo('song', songFile);
            //         query.equalTo('singer', Parse.User.current());
            //         query.first({
            //             success: function(result) {
            //                 if (result) {
            //                     defer.resolve(result);
            //                 } else {
            //                     var hist = (new History());
            //                     hist.set('song', songFile);
            //                     hist.set('singer', user);
            //                     defer.resolve(hist);
            //                 }
            //             },
            //             error: function(error) {

            //                 console.log(error);
            //                 var hist = (new History());
            //                 hist.set('song', songFile);
            //                 hist.set('singer', user);
            //                 defer.resolve(hist);
            //             }
            //         });
            //         return defer.promise;
            //     };
            //     var getWebRequest=function(){
            //         var query=new Parse.Query('WebRequest');
            //         var defer=$q.defer();
            //         query.equalTo('singer',Parse.User.current());
            //         query.first({
            //             success: function(result) {

            //                 defer.resolve(result);
            //             },
            //             error: function(error) {
            //                 console.log(error);
            //                 defer.reject(error);
            //             }
            //         });
            //         return defer.promise;
            // };
            //  var getQueueCount= function() {
            //     var query = new Parse.Query(Queue);
            //     var defer = $q.defer();
            //     query.count({
            //         success: function(count) {
            //             defer.resolve(count);
            //         },
            //         error: function(error) {
            //             console.log(error);
            //             defer.reject(error);
            //         }
            //     });
            //     return defer.promise;

            // };
            //     var addWebRequestToQueue=function(webrequest){
                  
            //         getWebRequest().then(function(result){
            //                 var queue=new Queue();
            //                  var webRequests=queue.relation('webRequests');
            //                 var singerName=Parse.User.current().get('nick');
            //                 queue.set('singer',singerName);
            //                  webRequests.add(result);
            //                 getQueueCount().then(function(result){
            //                     queue.set('singerOrder',result);
            //                     queue.save();
            //                 }, function(error){
            //                     console.log(error);
            //                 });

                            
                           
                           
                            
            //         },function(error){
            //             console.log(error);
            //         });
                    
            //     };
            //     checkWebRequest().then(function(webRequest) {
            //         webRequest.set('singer', user);
            //         var query = new Parse.Query(SongFile);
            //         query.get(id, {
            //             success: function(results) {
            //                 var relation = webRequest.relation('requests');
            //                 relation.add(results);
            //                 webRequest.save().then(
            //                     function(results){
            //                         addWebRequestToQueue(results);
            //                     },function(error){
            //                         console.log(error);
            //                     });

            //                 var userRel = Parse.User.current().relation('history');
            //                 userRel.add(results);
            //                 Parse.User.current().save();
            //                 checkHistory(results).then(function(history) {
            //                     history.addUnique('dateSung', new Date());
            //                     history.save().then(function(obj) {

            //                         // user.addUnique('history',)
            //                         // hisRelation.add(obj);
            //                         // user.save();
            //                     }, function(error) {
            //                         console.log(error);
            //                     });
            //                 });
            //                 // queue.save();
            //             },
            //             error: function(error) {
            //                 console.log(error);
            //             }
            //         });
            //     });
            // },
            
            getHistory: function() {
                var user = Parse.User.current();
                var relation = Parse.User.current().relation('history');
                var defer = $q.defer();
                relation.query().ascending('artist');
                relation.query().find({
                    success: function(result) {
                        defer.resolve(result);
                    },
                    error: function(error) {
                        defer.reject(error);
                    }
                });
                return defer.promise;

            },
            fetchSong: function(song) {
                var defer = $q.defer();

                song.fetch({
                    success: function(result) {

                        defer.resolve(result);
                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }
                });
                return defer.promise;


            },

            delFromSongbook: function(id) {
                var user = Parse.User.current();
                var relation = user.relation('songbook');
                var defer = $q.defer();
                var query = new Parse.Query('Song');
                query.get(id, {
                    success: function(results) {
                        relation.remove(results);
                        user.save();
                        defer.resolve(relation);

                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

                });
                return defer.promise;
            }
        }; //end return

    }); //end factory
