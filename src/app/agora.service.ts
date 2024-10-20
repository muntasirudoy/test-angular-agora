import { Injectable } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient, ILocalTrack } from 'agora-rtc-sdk-ng';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgoraService {
  private client: IAgoraRTCClient;
  private appId = '9252f7bacb35417e9effa179f879b90b';

  private channelJoinedSource = new BehaviorSubject<boolean>(false);
  channelJoined$ = this.channelJoinedSource.asObservable();

  constructor() {
    if (this.appId == '')
      console.error('APPID REQUIRED -- Open AgoraService.ts and update appId ');
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp9' });
  }

  async joinChannel(
    channelName: string,
    token: string | null,
    uid: string | null
  ) {
    await this.client.join(this.appId, channelName, null, uid);
    this.channelJoinedSource.next(true);
  }

  async leaveChannel() {
    await this.client.leave();
    this.channelJoinedSource.next(false);
  }

  setupLocalTracks(): Promise<ILocalTrack[]> {
    return AgoraRTC.createMicrophoneAndCameraTracks();
  }

  getClient() {
    return this.client;
  }
}
