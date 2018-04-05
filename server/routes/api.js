const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

const db = "mongodb://admin:admin123@ds227119.mlab.com:27119/videoplayer";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
	if(err){
		console.error("Error! "+err);
	}
})
router.get("/", function(req, res){
	res.send('api works');
})

router.get("/videos", function(req, res){
	console.log('Get request for all videos');
	Video.find({})
	.exec(function(err, data){
		if(err){
			console.log("error retrieving video");
		}else{
			res.json(data);
		}
	})
})

router.get("/videos/:id", function(req, res){
	console.log('Get request for single video');
	Video.findById(req.params.id)
	.exec(function(err, data){
		if(err){
			console.log("error retrieving video");
		}else{
			res.json(data);
		}
	})
})

router.post('/video', function(req, res){
	console.log('post a video');
	var newVideo = new Video();
	newVideo.title = req.body.title;
	newVideo.url = req.body.url;
	newVideo.description = req.body.description;
	newVideo.save(function(err, insertVideo){
		if(err){
			console.log('error saving video');
		}else{
			res.json(insertVideo);
		}
	});
});

router.put("/video/:id", function(req, res){
	console.log('Get request for single video');
	Video.findByIdAndUpdate(req.params.id, {
			$set: {title :req.body.title, url :req.body.url, description :req.body.description }
		},
		{
			new: true
		}, function(err, updateVideo){
			if(err){
				console.log("error updating video");
			}else{
				res.json(updateVideo);
			}
		}
	)
});

router.delete("/video/:id", function(req, res){
	console.log('delete request for single video');
	Video.findByIdAndRemove(req.params.id, function(err, updateVideo){
			if(err){
				console.log("error deleting video");
			}else{
				res.json(updateVideo);
			}
		}
	)
});


module.exports = router;