import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { RemoteStreamComponent } from './remote-stream/remote-stream.component';
import { LocalStreamComponent } from './local-stream/local-stream.component';
import { MediaControlsComponent } from './media-controls/media-controls.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'agora-angular';
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
