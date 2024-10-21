import { Component, ViewChild } from '@angular/core';
import { RemoteStreamComponent } from './video/remote-stream/remote-stream.component';

@Component({
  selector: 'app-e-chamber',
  templateUrl: './e-chamber.component.html',
  styleUrls: ['./e-chamber.component.scss'],
})
export class EChamberComponent {
  @ViewChild('remoteStreamsContainer')
  remoteStreamsComponent!: RemoteStreamComponent;

  isJoinModalVisible = true;
  isLocalStreamVisible = false;

  handleJoinChannel() {
    this.isJoinModalVisible = false;
    this.isLocalStreamVisible = true;
  }

  handleLeaveChannel() {
    this.isLocalStreamVisible = false;
    this.isJoinModalVisible = true;
    this.remoteStreamsComponent.clearRemoteUsers();
  }
}
