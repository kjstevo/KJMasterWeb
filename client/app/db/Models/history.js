'use strict';
// we isolate our data module so we can reuse them independently
angular.module('kjmApp')
    .factory('History', function($q, SongFile, User) {

        // --------------------------
        // Monster Object Definition
        // --------------------------

        // Under the hood, everytime you fetch a Monster thisect from Parse,
        // the SDK will natively use this extended class, so you don't have to 
        // worry about thisects instantiation if you fetch them from a Parse query for instance


        var History = Parse.Object.extend('History', {
            attrs: [
                'song',
                'dateSung',
                'singer'

            ],
            name: function() {
                return this.get('song').get('bareFile');
            },
            type: function() {
                return 'history';
            },
            addDate: function(date) {
                this.addUnique('dateSung', date);
                this.save();
            },
            getSongPtr: function() {
                var query = new Parse.Query('Song');

                var defer = $q.defer();
                query.get(this.get('song').id).then(function(results) {
                    defer.resolve(results);
                }, function(error) {
                    console.log(error);
                    defer.reject(error);
                });
                return defer.promise;
            }


        });
        //     // Instance methods


        //     key: function() {
        //         return this.get('key');
        //     },
        //     bareFile: function() {
        //         return this.get('bareFile');
        //     },
        //     filepath: function() {
        //         return this.get('filepath');
        //     },
        //     discNo: function() {
        //         return this.get('discNum');
        //     },
        //     track: function() {
        //         return this.get('track');
        //     },
        //     artist: function() {
        //         return this.get('artist');
        //     },
        //     title: function() {
        //         return this.get('title');
        //     },
        // }, {});
        // Class methods

        return History;
    });
