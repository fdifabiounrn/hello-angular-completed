import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {PersonService} from "../person/person.service";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    PersonListComponent,
    PersonDetailComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [PersonService]
})
export class PersonModule { }
