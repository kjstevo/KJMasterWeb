'use strict';

// angular.module('kjmApp')
//   .factory('User', function ($resource) {
//     return $resource('/api/users/:id/:controller', {
//       id: '@_id'
//     },
//     {
//       changePassword: {
//         method: 'PUT',
//         params: {
//           controller:'password'
//         }
//       },
//       get: {
//         method: 'GET',
//         params: {
//           id:'me'
//         }
//       }
//    });
//   });
angular.module('kjmApp')
    .factory('User', function User($q) {


        var User = Parse.Object.extend('User', {
            logout: function() {
                return User.logOut();
            },
            listUsers: function() {
                var defer = $q.defer();

                var query = new Parse.Query('User');

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
        });
        Object.defineProperty(User.prototype, 'nick', {
            get: function() {
                return this.get('nick');
            },
            set: function(aValue) {
                this.set('nick', aValue);
            }
        });
        Object.defineProperty(User.prototype, 'role', {
            get: function() {
                return this.get('role');
            },

            set: function(aValue) {
                this.set('role', aValue);
            }
        });

        return User;
    });


// --------------------------
// Monster Collection Definition
// --------------------------




    
//     loadUserByUsername: function(username) {
//         this.query = (new Parse.Query(User));
//         this.query.equalTo('username', username);
//         // use the enhanced load() function to fetch the collection
//         return this.find();
//     },
//     addUser: function(email, password, nick) {
//         // save request_id to Parse
//         var _this = this;

//         var user = new User;
//         user.setUsername(email);
//         user.setEmail(email);
//         user.setNick(nick);
//         user.setPassword(password);
//         user.setRole('user');

//         // perform a save and return the promised object back into the Angular world
//         return user.signUp()
//             .then(function(object) {
//                 // here object === monster basically
//                 _this.add(object);
//                 return object;
//             })
//     },
//     changePassword: function(user, password) {
//         user.setPassword(password);
//         return user.save().then(function(object) {
//             return object;
//         })
//     },
//     removeUser: function(user) {
//         if (!this.get(user)) return false;
//         var _this = this;
//         return user.destroy().then(function() {
//             _this.remove(user);
//         });
//     }


// return User.current();

// return {

//     getCurrentUser: function getCurrentUser() {
//         if (Parse.User.current()) {
//             return Parse.User.current();
//         }
//         return new Parse.User;
//     },
//     getUsers: function getUsers() {

//         return Users;
//     },
//     addUser: function addUser(user,callback) {
//         // save request_id to Parse
//         var user = new User;
//         user.setUsername(user.email);
//         user.setEmail(user.email);
//         user.setNick(user.nick);
//         user.setPassword(user.password);
//         user.setRole('user');

//         // perform a save and return the promised object back into the Angular world
//         return user.signUp();

//     }
// };

// });
