import {
  Component,
  ComponentRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
} from '@angular/core';
import { RemoteUserComponent } from '../remote-user/remote-user.component';
import { IAgoraRTCClient, IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import { AgoraService } from '../agora.service';

@Component({
  selector: 'app-remote-stream',
  templateUrl: './remote-stream.component.html',
  styleUrls: ['./remote-stream.component.scss'],
})
export class RemoteStreamComponent implements OnInit, OnDestroy, AfterViewInit {
  client: IAgoraRTCClient;
  remoteUserComponentRefs: Map<string, ComponentRef<RemoteUserComponent>> =
    new Map();

  @ViewChild('remoteVideoContainer', { read: ViewContainerRef })
  remoteVideoContainer!: ViewContainerRef;

  constructor(private agoraService: AgoraService) {
    this.client = this.agoraService.getClient();
  }

  ngOnInit(): void {
    // Register event listeners
    this.client.on('user-published', this.handleRemoteUserPublished);
    this.client.on('user-unpublished', this.handleRemoteUserUnpublished);
  }

  ngAfterViewInit(): void {
    // Ensure the ViewChild is ready before interacting with it
    if (!this.remoteVideoContainer) {
      console.error('remoteVideoContainer is not available');
    }
  }

  ngOnDestroy(): void {
    // Unregister event listeners
    this.client.off('user-published', this.handleRemoteUserPublished);
    this.client.off('user-unpublished', this.handleRemoteUserUnpublished);
  }

  private handleRemoteUserPublished = async (
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video' | 'datachannel'
  ) => {
    await this.client.subscribe(user, mediaType);

    if (mediaType === 'audio') {
      user.audioTrack?.play();
    } else if (mediaType === 'video') {
      const uid = user.uid.toString();

      // Ensure ViewChild is available
      if (this.remoteVideoContainer) {
        const remoteUserComponentRef: ComponentRef<RemoteUserComponent> =
          this.remoteVideoContainer.createComponent(RemoteUserComponent);

        remoteUserComponentRef.instance.uid = uid;
        remoteUserComponentRef.instance.onReady = (remoteUserDiv) => {
          user.videoTrack?.play(remoteUserDiv);
        };

        this.remoteUserComponentRefs.set(uid, remoteUserComponentRef);
        console.log(this.remoteUserComponentRefs);
      } else {
        console.error('remoteVideoContainer is not initialized');
      }
    }
  };

  private handleRemoteUserUnpublished = async (
    user: IAgoraRTCRemoteUser,
    mediaType: 'audio' | 'video' | 'datachannel'
  ) => {
    if (mediaType === 'video') {
      const remoteUserUid = user.uid.toString();
      const componentRef = this.remoteUserComponentRefs.get(remoteUserUid);

      if (componentRef && this.remoteVideoContainer) {
        const viewIndex = this.remoteVideoContainer.indexOf(
          componentRef.hostView
        );
        this.remoteVideoContainer.remove(viewIndex);
        this.remoteUserComponentRefs.delete(remoteUserUid);
      } else {
        console.error(`Unable to find remoteUser with UID: ${user.uid}`);
      }
    }
  };

  clearRemoteUsers(): void {
    if (this.remoteVideoContainer) {
      this.remoteVideoContainer.clear();
    }
    this.remoteUserComponentRefs.clear();
  }
}
