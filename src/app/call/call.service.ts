import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { WebSocketService } from '../ws/websocket.service';

declare const RTCPeerConnection: any;
declare const RTCSessionDescription: any;
declare const RTCIceCandidate: any;

@Injectable()
export class CallService {

  private configuration: any;
  private peerConnection: any;
  public localMedia$: BehaviorSubject<MediaStream>;
  public remoteMedia$: BehaviorSubject<MediaStream>;

  constructor(private ws: WebSocketService) {
    this.configuration = {
      'iceServers': [
        {url:'stun:stun01.sipphone.com'},
        {url:'stun:stun.ekiga.net'},
        {url:'stun:stun.fwdnet.net'},
        {url:'stun:stun.ideasip.com'},
        {url:'stun:stun.iptel.org'},
        {url:'stun:stun.rixtelecom.se'},
        {url:'stun:stun.schlund.de'},
        {url:'stun:stun.l.google.com:19302'},
        {url:'stun:stun1.l.google.com:19302'},
        {url:'stun:stun2.l.google.com:19302'},
        {url:'stun:stun3.l.google.com:19302'},
        {url:'stun:stun4.l.google.com:19302'},
        {url:'stun:stunserver.org'},
        {url:'stun:stun.softjoys.com'},
        {url:'stun:stun.voiparound.com'},
        {url:'stun:stun.voipbuster.com'},
        {url:'stun:stun.voipstunt.com'},
        {url:'stun:stun.voxgratia.org'},
        {url:'stun:stun.xten.com'},
        {
          url: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com'
        },
        {
          url: 'turn:192.158.29.39:3478?transport=udp',
          credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
          username: '28224511:1379330808'
        },
        {
          url: 'turn:192.158.29.39:3478?transport=tcp',
          credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
          username: '28224511:1379330808'
        }
      ]
    };

    this.localMedia$ = new BehaviorSubject<MediaStream>(null);
    this.remoteMedia$ = new BehaviorSubject<MediaStream>(null);

    this.peerConnection = new RTCPeerConnection(this.configuration);

    this.peerConnection.onicecandidate = e => {
      if (e.candidate) {
        const data = {
          roomId: '58ce77c669f53107a84a3ea6',
          candidate: e.candidate
        };

        this.ws.send('rtc', data);
      }
    };

    this.peerConnection.onnegotiationneeded = () => {
      this.peerConnection.createOffer(desc => this.localDescCreated(desc), () => {});
    };

    this.peerConnection.onaddstream = (e) => {
      this.remoteMedia$.next(e.stream);
    };

    // this.ws.listen('rtc').subscribe(data => {
    //   if (data.sdp) {
    //     this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp), () => {
    //       if (this.peerConnection.remoteDescription.type === 'offer') {
    //         this.peerConnection.createAnswer(desc => this.localDescCreated(desc), () => {});
    //       }
    //     });
    //   } else {
    //     this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    //   }
    // });
  }

  private localDescCreated(desc) {
    this.peerConnection.setLocalDescription(desc, () => {
      const data = {
        roomId: '58ce77c669f53107a84a3ea6',
        sdp: this.peerConnection.localDescription
      };

      this.ws.send('rtc', data);
    });
  }

  getLocalMedia() {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then(stream => {
      this.peerConnection.addStream(stream);
      this.localMedia$.next(stream);
    });
  }
}
