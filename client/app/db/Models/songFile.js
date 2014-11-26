'use strict';
// we isolate our data module so we can reuse them independently
angular.module('kjmApp')
    .factory('SongFile', function() {

        // --------------------------
        // Monster Object Definition
        // --------------------------

        // Under the hood, everytime you fetch a Monster thisect from Parse,
        // the SDK will natively use this extended class, so you don't have to var props=[]
        // worry about thisects instantiation if you fetch them from a Parse query for instance
        var SongFile = Parse.Object.extend({
            className: 'Song',
            attrs: [
                'key',
                'bareFile',
                'filepath',
                'discNum',
                'track',
                'artist',
                'title'
            ],
            name: function() {
                return this.get('bareFile');
            },
            type: function() {
                return 'song';
            },
            getFromId: function(id) {
                var query = (new Parse.Query(SongFile));

                query.get(id).then(function(results) {
                    var song = new SongFile();
                    song = results;
                    return song;
                }, function(error) {
                    console.log(error);
                });
            },
            getSerial: function() {
                return {
                    key: this.get('key'),
                    bareFile: this.get('bareFile'),
                    filepath: this.get('filepath'),
                    discNo: this.get('discNo'),
                    track: this.get('track'),
                    artist: this.get('artist'),
                    title: this.get('title')

                };
            }
        });
        //     // Instance methods
        var props = ['key',
            'bareFile',
            'filepath',
            'discNo',
            'track',
            'artist',
            'title'
        ];

        var defineProp = function(prop) {
            Object.defineProperty(SongFile.prototype, prop, {
                get: function() {
                    return this.get(prop);
                },
                set: function(aValue) {
                    this.set(prop, aValue);
                }
            });
        };
        for (var i = 0; i < props.length; i++) {
            defineProp(props[i]);
        }



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

        return SongFile;
    });
