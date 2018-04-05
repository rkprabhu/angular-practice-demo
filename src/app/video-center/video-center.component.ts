import { Video } from '../video';
import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {
	videos: Array<Video>;

 selectedVideo = Video;
 test: boolean = false;
 public hideNewVideo: boolean = false;

  constructor( private _videoService: VideoService) { }

  ngOnInit() {
  	this._videoService.getVideos()
  	.subscribe(resVideoData => this.videos = resVideoData);
  }


  onSelectedVideo(video: any){
  	this.selectedVideo = video;
  	this.test = true;
    this.hideNewVideo = true;
  	console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video:Video) {
  	this._videoService.addVideo(video)
  	.subscribe(resNewVideo => {
      this.videos.push(resNewVideo);
      this.hideNewVideo = true;
  		this.selectedVideo = resNewVideo;
  	});
  }

  onUpdateVideoEvent(video: any) {
    this._videoService.updateVideo(video)
    .subscribe(resUpdateVideo => video = resUpdateVideo);
      
    
  }

  onDeleteVideoEvent(video: any) {
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
    .subscribe(resDeleteVideo => {
      for(let i=0; i < videoArray.length; i++){
        if(videoArray[i]._id === video._id){
          videoArray.splice(i,1);
        }
      }
    });   
  }

  newVideo(){
    this.hideNewVideo = false;
  }

  

}
