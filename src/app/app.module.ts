import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocalStreamComponent } from './local-stream/local-stream.component';
import { MediaControlsComponent } from './media-controls/media-controls.component';
import { RemoteStreamComponent } from './remote-stream/remote-stream.component';
import { RemoteUserComponent } from './remote-user/remote-user.component';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinModalComponent,
    RemoteStreamComponent,
    LocalStreamComponent,
    MediaControlsComponent,
    ViewComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterOutlet,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
