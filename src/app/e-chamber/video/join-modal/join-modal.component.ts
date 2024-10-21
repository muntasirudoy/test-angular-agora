import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AgoraService } from '../../../agora.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.scss'],
})
export class JoinModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modalOverlay') modalOverlay!: ElementRef<HTMLDivElement>;
  // @ViewChild('joinChannelForm') joinChannelForm!: ElementRef<HTMLFormElement>;
  @Output() joinChannel = new EventEmitter<void>();

  username: string = '';
  aptCode: string = '';
  client: string = '';
  userID: string = '';
  constructor(
    private agoraService: AgoraService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    // Extract query parameters from the route
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'] || ''; // Get username from query param
      this.aptCode = params['aptCode'] || ''; // Get aptCode from query param
      this.client = params['c'] || ''; // Get channel from query param
    });
  }
  ngAfterViewInit() {
    // show the modal once the page has loaded
    this.modalOverlay.nativeElement.classList.add('show');
  }

  async onSubmit() {
    await this.agoraService.joinChannel(
      this.aptCode,
      null,
      this.username ?? null
    );
    this.joinChannel.emit(); // notify the app to hide the model and show the local video
  }
}
