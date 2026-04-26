import { AfterViewInit, Component, DoCheck, ElementRef, inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { AllChildDOMElementFlexer } from 'src/app/functions/all-child-flexer.func';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { AuthTimelineService } from './services/auth-timeline.service';
import { AuthEventsKeyTypes } from './types';
import { AuthTogglePanelComponent } from './components/auth-toggle-panel/auth-toggle-panel.component';

@Component({
  selector: 'app-auth',
  standalone: false,
  template: `
    <app-bubble-wrapper>
      <main>
        <div class="form-box" #formBox>
          <router-outlet></router-outlet>
        </div>

        <section class="toggle-box">
          <div class="background-float" #backgroundFloat></div>

          <app-auth-toggle-panel Position="left" #toggleLeft (buttonClicked)="PlayAnimation()"></app-auth-toggle-panel>

          <app-auth-toggle-panel Position="right" #toggleRight (buttonClicked)="PlayAnimation()"></app-auth-toggle-panel>
        </section>
      </main>
    </app-bubble-wrapper>
  `,
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {
  private declare AnimationPlayed: boolean

  private appMainService = inject(AppMainService)

  private service = inject(AuthService)

  private authTimelineService = inject(AuthTimelineService)

  private router = inject(Router)

  private timeline!: gsap.core.Timeline

  @ViewChild("formBox", {static: true})
  private formBoxRef!: ElementRef<HTMLElement>

  @ViewChild("backgroundFloat", {static: true})
  private backgroundFloatRef!: ElementRef<HTMLElement>

  @ViewChild("toggleLeft", {static: true, read: ElementRef})
  private toogleLeftRef!: ElementRef<HTMLElement>

  @ViewChild("toggleRight", {static: true, read: ElementRef})
  private toogleRightRef!: ElementRef<HTMLElement>

  @ViewChildren(AuthTogglePanelComponent)
  togglePanels!: QueryList<AuthTogglePanelComponent>

  private subs?: Subscription

  ngOnInit(): void {
    this.subs = this.service.AuthEventsSubject.subscribe((stage) => this.OnAuthStageChange(stage))
  }

  ngAfterViewInit(): void {
    const isSignUp = this.router.url.split("/")[2] != undefined

    AllChildDOMElementFlexer(this.formBoxRef.nativeElement, ['router-outlet'])

    this.authTimelineService.setElements({
      formBoxElement: this.formBoxRef.nativeElement,
      backroundElement: this.backgroundFloatRef.nativeElement,
      toggleLeftElement: this.toogleLeftRef.nativeElement,
      toggleRightElement: this.toogleRightRef.nativeElement
    })

    if(this.appMainService.isTabView() || this.appMainService.isDestopView()){
      if(isSignUp) // is Signup
        this.timeline = this.authTimelineService.getDesktopSignUpFirstGSAPTimeLine(() => this.ChangeRoute()) 
      else
        this.timeline = this.authTimelineService.getDesktopLoginFirstGSAPTimeLine(() => this.ChangeRoute())
    }else {
      this.timeline = this.authTimelineService.getMobileGSAPTimeLine(() => this.ChangeRoute())
    }
  }

  ngDoCheck(): void {
    AllChildDOMElementFlexer(this.formBoxRef.nativeElement, ['router-outlet'])
  }

  ChangeRoute() {
    const {url} = this.router

    if(url.includes('sign-up'))
      this.router.navigate(['auth'])
    else
      this.router.navigate(['auth', 'sign-up'])
  }

  PlayAnimation () {
    if(this.AnimationPlayed)
      this.timeline.reverse()
    else 
      this.timeline.play()

    this.AnimationPlayed = !this.AnimationPlayed
  }

  private OnAuthStageChange (state: AuthEventsKeyTypes) {
    switch (state) {
      case 'change-route': this.PlayAnimation()
        break
      case 'auth-paused': this.togglePanels.forEach(tg => tg.Trigger_A_AuthProcess_Has_Finished())
        break
      case 'auth-in-progress': this.togglePanels.forEach(tg => tg.Trigger_A_AuthProcess_Has_Started())
        break;
    }
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }
}
