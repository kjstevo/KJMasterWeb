'use strict';
// we isolate our data module so we can reuse them independently
angular.module('kjmApp')
    .factory('WebRequest', function($q) {

        // --------------------------
        // Monster Object Definition
        // --------------------------

        // Under the hood, everytime you fetch a Monster thisect from Parse,
        // the SDK will natively use this extended class, so you don't have to 
        // worry about thisects instantiation if you fetch them from a Parse query for instance


        var WebRequest = Parse.Object.extend('WebRequest', {
            attrs: [
                'singer'
            ],
            addRequest: function(song) {
                var relation = this.relation('requests');
                relation.add(song);
                this.save();
            },
            removeRequest: function(song) {
                var relation = this.relation('requests');
                relation.remove(song);
                this.save();
            },
            name: function() {
                return this.get('singer').get('nick');
            },
            type: function() {
                return 'webRequest';
            },
            getRequestArray: function() {
                var relation = this.relation('requests');
                var defer = $q.defer();
                relation.query().find({
                    success: function(results) {
                        var res = results.map(function(obj) {
                            return {
                                filePath: obj.get('filepath'),
                                singer: this.get('singer').get('nick'),
                                songId: obj.get('songId'),
                                songName: obj.get('bareFile'),
                                autoReqNum:obj.get('autoreqnum')
                            };
                        });
                        defer.resolve(res);
                    },
                    error: function(error) {
                        console.log(error);
                        defer.reject(error);
                    }

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

        return WebRequest;
    });
