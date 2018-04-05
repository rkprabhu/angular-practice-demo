import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  inputs:[`video`],
  outputs:['UpdateVideoEvent','deleteVideoEvent']
})
export class VideoDetailComponent implements OnInit {
video: any;
 private editTitle: boolean = false;
 private UpdateVideoEvent = new EventEmitter();
 private deleteVideoEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  	this.editTitle = false;
  }

  onTitleClick(){
  	this.editTitle = true;
  }

  onBlurMethod(){
  	this.editTitle = false;
  }

  updateVideo(){
    this.UpdateVideoEvent.emit(this.video);
  }

  deleteVideo(){
    this.deleteVideoEvent.emit(this.video);
  }





}
