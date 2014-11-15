// 'use strict';

// angular.module('kjmApp')
//   .factory('Auth', function Auth($http, User, $cookieStore, $q) {
//     /**
//      * Return a callback or noop function
//      *
//      * @param  {Function|*} cb - a 'potential' function
//      * @return {Function}
//      */
//     var safeCb = function(cb) {
//       return (angular.isFunction(cb)) ? cb : angular.noop;
//     },

//     currentUser = {};

//     if (User.get()) {
//       currentUser = User.get();
//     }

//     return {

//       /**
//        * Authenticate user and save token
//        *
//        * @param  {Object}   user     - login info
//        * @param  {Function} callback - optional, function(error)
//        * @return {Promise}
//        */
//       login: function(user, callback) {
//         return Parse.User.logIn({
//           username: user.email,
//           password: user.password
//         },{
//         success: function(res) {
//           currentUser = User.get();
//           safeCb(callback)();
//           return currentUser;
//         }, 
//         error: function(err) {
//           this.logout();
//           safeCb(callback)(err.data);
//           return $q.reject(err.data);
//         }
//       });
//       },

//       /**
//        * Delete access token and user info
//        */
//       logout: function() {
//         $cookieStore.remove('token');
//         currentUser = {};
//       },

//       /**
//        * Create a new user
//        *
//        * @param  {Object}   user     - user info
//        * @param  {Function} callback - optional, function(error, user)
//        * @return {Promise}
//   //      */
//   //     createUser: function(user, callback) {
//   //        var user=new Parse.User;
//   //     user.set("username",$scope.user.email);
//   //     user.set("password",$scope.user.password);
//   //     user.set("email",$scope.user.email);
//   //     user.set("nick",$scope.user.nick);
//   //     user.set("role","user");
//   //     return user.signUp(null, {
//   // success: function(user) {
//   //    currentUser = User.get();
//   //           return safeCb(callback)(null, user);
//   // },
//   // error: function(user, error) {
//   //   // Show the error message somewhere and let the user try again.
//   //   this.logout();
//   //           return safeCb(callback)(err);
//   //         }}).bind(this)).$promise;

  
//  createUser: function(nick,email,password, callback) {
// var user=new Parse.User;
//       user.set("username",email);
//       user.set("password",password);
//       user.set("email",email);
//      user.set("nick",nick);
//      user.set("role","user");

//         return user.signUp(null,
//           function(data) {
//             //$cookieStore.put('token', data.token);
//             currentUser = User.get();
//             return safeCb(callback)(null, user);
//           },
//           function(err) {
//             this.logout();
//             return safeCb(callback)(err);
//           }.bind(this)).$promise;
//       },
//       /**
//        * Change password
//        *
//        * @param  {String}   oldPassword
//        * @param  {String}   newPassword
//        * @param  {Function} callback    - optional, function(error, user)
//        * @return {Promise}
//        */
//       changePassword: function(oldPassword, newPassword, callback) {
//         return User.changePassword({ id: currentUser._id }, {
//           oldPassword: oldPassword,
//           newPassword: newPassword
//         }, function(user) {
//           return safeCb(callback)(null, user);
//         }, function(err) {
//           return safeCb(callback)(err);
//         }).$promise;
//       },

//       /**
//        * Gets all available info on a user
//        *   (synchronous|asynchronous)
//        *
//        * @param  {Function|*} callback - optional, funciton(user)
//        * @return {Object|Promise}
//        */
//       getCurrentUser: function(callback) {
//         if (arguments.length === 0) {
//           return currentUser;
//         }

//         var value = (currentUser.hasOwnProperty('$promise')) ? currentUser.$promise : currentUser;
//         return $q.when(value)
//           .then(function(user) {
//             safeCb(callback)(user);
//             return user;
//           }, function() {
//             safeCb(callback)({});
//             return {};
//           });
//       },

//       /**
//        * Check if a user is logged in
//        *   (synchronous|asynchronous)
//        *
//        * @param  {Function|*} callback - optional, function(is)
//        * @return {Bool|Promise}
//        */
//       isLoggedIn: function(callback) {
//         if (arguments.length === 0) {
//           return currentUser.hasOwnProperty('role');
//         }

//         return this.getCurrentUser(null)
//           .then(function(user) {
//             var is = user.hasOwnProperty('role');
//             safeCb(callback)(is);
//             return is;
//           });
//       },

//        /**
//         * Check if a user is an admin
//         *   (synchronous|asynchronous)
//         *
//         * @param  {Function|*} callback - optional, function(is)
//         * @return {Bool|Promise}
//         */
//       isAdmin: function(callback) {
//         if (arguments.length === 0) {
//           return currentUser.role === 'admin';
//         }

//         return this.getCurrentUser(null)
//           .then(function(user) {
//             var is = user.role === 'admin';
//             safeCb(callback)(is);
//             return is;
//           });
//       },

//       /**
//        * Get auth token
//        *
//        * @return {String} - a token string used for authenticating
//        */
//       getToken: function() {
//         return $cookieStore.get('token');
//       }
//     };
//   });
