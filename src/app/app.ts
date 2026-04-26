import { AfterViewInit, Component, DoCheck, ElementRef, NO_ERRORS_SCHEMA, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMainService } from './general-services/app-main.service';
import { Title } from '@angular/platform-browser';
import { CenteredModalService } from './general-services/modals-service/centered-modal-service/centered-modal-service';
import { AllChildDOMElementFlexer } from './functions/all-child-flexer.func';
import { ToastModalService } from './general-services/modals-service/toast-modal-service/toast-modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <centered-modal-wrapper #centered_modal_wrapper>
      <ng-template #centered_modal_template></ng-template>
    </centered-modal-wrapper>

    <toast-wrapper #toast_wrapper>
      <ng-template #toast_template></ng-template>
    </toast-wrapper>

    <router-outlet></router-outlet>
  `,
  styleUrl: './app.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class App implements OnInit, DoCheck, AfterViewInit {
  @ViewChild('centered_modal_wrapper', {static: true})
  centeredModalDomWrapper!: ElementRef<HTMLElement>

  @ViewChild('centered_modal_template', {read: ViewContainerRef})
  centeredModalVCR!: ViewContainerRef


  @ViewChild('toast_wrapper', {static: true})
  toastModalDomWrapper!: ElementRef<HTMLElement>

  @ViewChild('toast_template', {read: ViewContainerRef})
  toastModalVCR!: ViewContainerRef

  constructor (
    private compElement: ElementRef,
    private AppService: AppMainService,
    private CenteredModalService: CenteredModalService,
    private ToastModalService: ToastModalService,
    private TitleServce: Title
  ){}

  ngOnInit(): void {
    this.TitleServce.setTitle(this.AppService.Title)
  }

  ngDoCheck(): void {
    AllChildDOMElementFlexer(this.compElement.nativeElement, [
      'centered-modal-wrapper', 
      'toast-wrapper', 
      'router-outlet'
    ])
  }

  async ngAfterViewInit(): Promise<void> {
    this.CenteredModalService.Initialize(this.centeredModalDomWrapper.nativeElement, this.centeredModalVCR)
    this.ToastModalService.Initialize(this.toastModalDomWrapper.nativeElement, this.toastModalVCR)
  }
}