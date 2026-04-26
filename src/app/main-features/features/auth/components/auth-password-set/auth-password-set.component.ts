import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_REGEXS } from 'src/app/configurations/app-regexs/app-regexs.confguration';
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';
import { FormErrorMessageComponent } from 'src/app/main-features/shared/components/form-error-message/form-error-message.component';
import { IconComponent } from 'src/app/main-features/shared/components/icon/icon.component';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { InputFieldDecoratorComponent } from 'src/app/main-features/shared/decorators/input-field-decorator/input-field-decorator.component';
import { PasswordInputDecoratorComponent } from 'src/app/main-features/shared/decorators/password-input-decorator/password-input-decorator.component';
import { ConfirmPasswordValidatorDirective } from 'src/app/main-features/shared/directives/confirm-password-validator.directive';
import { PassordValidatorDirective } from 'src/app/main-features/shared/directives/passord-validator.directive';

@Component({
  selector: 'app-auth-password-set',
  imports: [
    FormsModule,
    CommonModule,
    InputFieldDecoratorComponent,
    PasswordInputDecoratorComponent,
    PassordValidatorDirective,
    IconComponent,
    ConfirmPasswordValidatorDirective,
    FormErrorMessageComponent
  ],
  templateUrl: './auth-password-set.component.html',
  styleUrl: './auth-password-set.component.scss'
})
export class AuthPasswordSetComponent implements SlickChildInstance {
  
  declare isLast: boolean;
  
  declare isFirst: boolean;
  
  declare isVisble: boolean;

  private app_regex = inject(APP_REGEXS)

  AppVectorPaths = inject(APP_VECTOR_PATHS)

  Password = ""

  Con_Password = ""
  
  get PassWordHasANumber () {
    return this.Password.match(this.app_regex.MUST_CONTAIN_A_NUMBER)
  }

  get PassWordHasASymbol () {
    return this.Password.match(this.app_regex.MUST_CONTAIN_A_SYMBOL)
  }

  get PassWordHasACapLetter () {
    return this.Password.match(this.app_regex.MUST_CONTAIN_A_CAP_LETTER)
  }

  get PasswordIsMoreThanEightChars () {
    return this.Password.length > 7
  }

  @Input()
  HeaderText?: string

  @Input()
  SubHeaderText?: string

  @ViewChildren(InputFieldDecoratorComponent)
  inputDecorQueryRef!: QueryList<InputFieldDecoratorComponent>

  @Output("password")
  private passwordOutput: EventEmitter<string> = new EventEmitter()

  @Output("canceled")
  private cancelOutput: EventEmitter<void> = new EventEmitter()

  onVisible () {
    this.inputDecorQueryRef.forEach(decor => decor.TriggerHasValueEffect(true))
  }

  ClearConfirmPassword() {
    this.Con_Password = ""
  }

  Back(){
    this.cancelOutput.emit()
  }

  Next(){
    this.passwordOutput.emit(this.Password)
  }
}
