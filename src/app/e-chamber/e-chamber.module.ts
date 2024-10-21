import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EChamberComponent } from './e-chamber.component';
import { JoinModalComponent } from './video/join-modal/join-modal.component';
import { RemoteStreamComponent } from './video/remote-stream/remote-stream.component';
import { LocalStreamComponent } from './video/local-stream/local-stream.component';
import { MediaControlsComponent } from './video/media-controls/media-controls.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EChamberComponent,
    JoinModalComponent,
    RemoteStreamComponent,
    LocalStreamComponent,
    MediaControlsComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [EChamberComponent],
})
export class EChamberModule {}