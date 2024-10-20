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

  @ViewChild('remoteVideo', { static: false })
  remoteVideo!: ElementRef<HTMLElement>;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    console.log(`Remote user component initialized for UID: ${this.uid}`);
  }

  ngAfterViewInit(): void {
    if (this.remoteVideo?.nativeElement) {
      console.log(
        'Remote video element initialized:',
        this.remoteVideo.nativeElement
      );
      // Call the provided onReady function if available
      if (this.onReady) {
        this.onReady(this.remoteVideo.nativeElement);
      }
    } else {
      console.error('remoteVideo is not available or not yet initialized.');
    }
  }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get remoteVideoDivId(): string {
    return this.remoteVideo?.nativeElement?.id ?? '';
  }
}
