import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    PipesModule
  ],
  exports:[RegisterPage],
  entryComponents:[RegisterPage]
})
export class RegisterPageModule {}
