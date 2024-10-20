import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { UID } from 'agora-rtc-sdk-ng';

@Component({
  selector: 'app-remote-user',
  templateUrl: './remote-user.component.html',
  styleUrls: ['./remote-user.component.scss'],
})
export class RemoteUserComponent implements OnInit, AfterViewInit {
  @Input() uid!: UID;
  @Input() onReady?: (element: HTMLElement) => void;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLElement>;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log(`Remote user component initialized for UID: ${this.uid}`);
  }

  ngAfterViewInit(): void {
    if (this.onReady) {
      this.onReady(this.remoteVideo.nativeElement);
    }
  }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get remoteVideoDivId(): string {
    return this.remoteVideo.nativeElement.id;
  }
}
