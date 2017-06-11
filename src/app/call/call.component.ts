import { Component, OnInit, OnDestroy } from '@angular/core';
import { CallService } from './call.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, OnDestroy {

  isMicro: boolean;
  isCamera: boolean;
  localMedia$: Subject<MediaStream>;
  remoteMedia$: Subject<MediaStream>;

  constructor(private callService: CallService) {
    this.localMedia$ = this.callService.localMedia$;
    this.remoteMedia$ = this.callService.remoteMedia$;
  }

  ngOnInit() {
    this.isMicro = true;
    this.isCamera = false;

    this.callService.getLocalMedia();
  }

  ngOnDestroy() {
    // if (this.localMedia) {
    //   this.localMedia.getTracks().forEach(track => track.stop());
    // }
  }
}
