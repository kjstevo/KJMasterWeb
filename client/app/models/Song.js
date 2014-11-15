angular.module('kjmApp.models.Song', ['parse-angular.enhance'])
.run(function() {
	// --------------------------
	// Monster Object Definition
	// --------------------------


	// Under the hood, everytime you fetch a Monster object from Parse,
	// the SDK will natively use this extended class, so you don't have to 
	// worry about objects instantiation if you fetch them from a Parse query for instance

	var Song = Parse.Object.extend({
		className:'fish2_Catalog',
		// Extend the object with getter and setters  (see parse-angular-patch GitHub repo)
		attrs: ['artist','title','filepath','bareFile','discNo','track']
	});


	// --------------------------
	// Monster Collection Definition
	// --------------------------
	var Songs = Parse.Collection.extend({
		model: Song,
		// We give a className to be able to retrieve the collection
		// from the getClass helper. See parse-angular-patch git repo
		className: 'fish2_Catalog',
		comparator: function(model) {
			return -model.createdAt.getTime();
		},
		loadSongsWithName: function(artist,title) {
			this.query = (new Parse.Query(Song));
			this.query.equalTo('artist', artist);
			this.query.equalTo('title', title);
			// use the enhanced load() function to fetch the collection
			var list=this.find();
			return list;
		},
		addSong: function(artist,title,filepath,bareFile,autoreqNum,discNo,track) {
	 		// save request_id to Parse
	 		var _this = this;

			var song = new Song;
			song.setArtist(artist);
			song.setTitle(title);
			song.setFilepath(filepath);
			song.setBareFile(bareFile);
		//	song.setAutoReqNum(autoReqNum);
			song.setDiscNo(discNo);
			song.setTrack(track);

			// perform a save and return the promised object back into the Angular world
			return song.save().then(function(object){
				// here object === monster basically
				_this.add(object);
				return object;
			})
	 	},
	 	removeSong:function(song) {
	 		if (!this.get(song)) return false;
	 		var _this = this;
	 		return song.destroy().then(function(){
	 			_this.remove(song);
	 		});
	 	}
	});


});