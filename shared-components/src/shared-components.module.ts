import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentComponent} from "./components/shared-component/shared-component.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedComponentComponent]
})
export class SharedComponentsModule { }
