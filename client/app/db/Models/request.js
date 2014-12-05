'use strict';
// we isolate our data module so we can reuse them independently
angular.module('kjmApp')
    .factory('Request', function() {

        // --------------------------
        // Monster Object Definition
        // --------------------------

        // Under the hood, everytime you fetch a Monster thisect from Parse,
        // the SDK will natively use this extended class, so you don't have to 
        // worry about thisects instantiation if you fetch them from a Parse query for instance


        var Request = Parse.Object.extend('Request', {
            attrs: [
                'songName',
                'singer',
                'filePath',
                'songId'

            ],
            create:function(songName,singerName,filePath,songId){
                var _this=this;
                _this.set('songName',songName);
                _this.set('singer',singerName);
                _this.set('filePath',filePath);
                _this.set('songId',songId);
                _this.set('new',true);
                return _this.save().then(function(object){
                        return _this;
                });
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

        return Request;
    });
