import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, OnDestroy {

  isMicro: boolean;
  isCamera: boolean;
  localMedia: MediaStream;

  ngOnInit() {
    console.log('call');

    this.isMicro = true;
    this.isCamera = false;

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then(stream => {
      this.localMedia = stream;
    });
  }

  ngOnDestroy() {
    if (this.localMedia) {
      this.localMedia.getTracks().forEach(track => track.stop());
    }
  }
}
