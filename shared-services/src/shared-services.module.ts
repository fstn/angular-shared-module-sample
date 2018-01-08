import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedServiceService} from "./services/shared-service.service";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: [
        SharedServiceService
    ]
})
export class SharedServicesModule {
}
