// we isolate our data module so we can reuse them independently
angular.module('brandid.models.Monsters', ['parse-angular.enhance'])
    .run(function() {

        // --------------------------
        // Monster Object Definition
        // --------------------------

        // Under the hood, everytime you fetch a Monster object from Parse,
        // the SDK will natively use this extended class, so you don't have to 
        // worry about objects instantiation if you fetch them from a Parse query for instance

        var SongFile = Parse.Object.extend({
            className: "Song",
            // Extend the object with getter and setters  (see parse-angular-patch GitHub repo)
            attrs: ['artist', 'title', 'discNum', 'track', 'key', 'bareFile', 'filepath', 'name']
        });

        // --------------------------
        // Monster Collection Definition
        // --------------------------
        var SongFiles = Parse.Collection.extend({
            model: SongFile,
            // We give a className to be able to retrieve the collection
            // from the getClass helper. See parse-angular-patch git repo
            className: "SongFile",
            comparator: function(model) {
                return -model.createdAt.getTime();
            },
            loadSongFilesWithArtist: function(artist) {
                this.query = (new Parse.Query(SongFile));
                this.query.equalTo('artist', artist);
                // use the enhanced load() function to fetch the collection
                return this.find();
            },
            loadSongFilesWithTitle: function(title) {
                this.query = (new Parse.Query(SongFile));
                this.query.equalTo('title', title);
                // use the enhanced load() function to fetch the collection
                return this.find();
            },
            loadAllSongFiles: function() {
                this.query = (new Parse.Query(SongFile));
                return this.find();
            },
            addSongFile: function(artist, title, discNum, track, key, bareFile, filepath) {
                // save request_id to Parse
                var _this = this;

                var songFile = new SongFile;
                songFile.setName(bareFile);
                songFile.setArtist(artist);
                songFile.setBareFile(bareFile);
                songFile.setFilepath(filepath);
                songFile.setTitle(title);
                songFile.setDiscNum(discNum);
                songFile.setTrack(track);
                songFile.setKey(key);
                // perform a save and return the promised object back into the Angular world
                return songFile.save().then(function(object) {
                    // here object === monster basically
                    _this.add(object);
                    return object;
                })
            },
            removeSongFile: function(songFile) {
                if (!this.get(songFile)) return false;
                var _this = this;
                return songFile.destroy().then(function() {
                    _this.remove(songFile);
                });
            }
        });


    });
