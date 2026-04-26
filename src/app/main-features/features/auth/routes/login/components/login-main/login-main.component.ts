import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldDecoratorComponent } from "src/app/main-features/shared/decorators/input-field-decorator/input-field-decorator.component";
import { LoginStagesTypes } from '../../types';
import { SignInCredentials, UserSignInResponse } from '@shared/route-types'
import { FormErrorMessageComponent } from "src/app/main-features/shared/components/form-error-message/form-error-message.component";
import { CommonModule } from '@angular/common';
import { PasswordInputDecoratorComponent } from "src/app/main-features/shared/decorators/password-input-decorator/password-input-decorator.component";
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { ApiResponse } from '@shared/common';
import { MessageComponent } from "src/app/main-features/shared/components/message/message.component";
import { CheckBoxDecoratorComponent } from "src/app/main-features/shared/decorators/check-box-decorator/check-box-decorator.component";
import { AuthService } from '../../../../services/auth.service';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import gsap from 'gsap';
import { LoginMainService } from './services/login-main.service';
import { MainFeaturesRouteService } from 'src/app/main-features/service/main-features-route.service';

@Component({
  selector: 'app-login-main',
  imports: [
    CommonModule,
    FormsModule,
    InputFieldDecoratorComponent,
    FormErrorMessageComponent,
    PasswordInputDecoratorComponent,
    LoadersComponent,
    MessageComponent,
    CheckBoxDecoratorComponent
],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.scss'
})
export class LoginMainComponent implements SlickChildInstance, AfterViewInit {
  declare isLast: boolean;
  
  declare isFirst: boolean;
  
  declare isVisble: boolean;

  private service = inject(LoginMainService)

  private AuthApiCall = inject(AuthRouteAPICallService)

  private authService = inject(AuthService)

  private featureRouteService = inject(MainFeaturesRouteService)

  AppVectorPaths = inject(APP_VECTOR_PATHS)

  declare RememberMe: boolean

  SystemRemembered = signal(false)

  private timeline = gsap.timeline({paused: true})

  @Input("credentials")
  Cred!: SignInCredentials

  @ViewChild(LoadersComponent)
  loader!: LoadersComponent

  @ViewChild(MessageComponent)
  messeger!: MessageComponent

  @ViewChild("image", {static: true})
  private imageDomRef!: ElementRef<HTMLElement>

  @ViewChildren("from_down_anim_target", {read: ElementRef})
  private downUpAnimTargetsQuery!: QueryList<ElementRef<HTMLElement>>

  @ViewChildren(InputFieldDecoratorComponent)
  inputDecoratorQueryRef!: QueryList<InputFieldDecoratorComponent>

  @Output('toStage')
  private output: EventEmitter<LoginStagesTypes> = new EventEmitter()

  ngAfterViewInit(): void {
    this.timeline
    .fromTo(this.imageDomRef.nativeElement, 
      {
        y: 100, 
        opacity: 0, 
        scale:.5
      }, 
      {
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 1.5
      }
    )
    .fromTo(this.downUpAnimTargetsQuery.map(ref => ref.nativeElement), 
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: .2,
        stagger: .2
      }, "-=1"
    )

    this.SystemRemembered.update(() => this.service.getStoredEmail() != null)

    this.Cred.email = this.service.getStoredEmail() ?? ""
  }

  onVisible () {
    this.timeline.play()

    this.inputDecoratorQueryRef.forEach(decor => decor.TriggerHasValueEffect(true))
  }

  Login() {
    this.loader.Load(this.AuthApiCall.signInUser(this.Cred), response => this.OnResponse(response))
  }

  private OnResponse (response: ApiResponse<UserSignInResponse>) {
    this.AuthApiCall.responseChecker(response, data => {
      if(this.RememberMe) this.service.remeberMe(this.Cred.email)
      
      this.authService.runSignInProcess(data)

      this.featureRouteService.toHub() 

    }, response => {
      this.messeger.showMessage(String(response.errMessage), true)
    })
  }

  toSignUp() {
    this.authService.triggerAuthRouteChangeAnimation()
  }

  toForgotPassword() {
    this.output.emit("login-forgot-password-email")
  }
}