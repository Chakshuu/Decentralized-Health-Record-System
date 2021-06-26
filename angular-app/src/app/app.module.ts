/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { GeneralComponent } from './General/General.component';
import { AllergyComponent } from './Allergy/Allergy.component';
import { Complete_Blood_CountComponent } from './Complete_Blood_Count/Complete_Blood_Count.component';
import { Lipid_profileComponent } from './Lipid_profile/Lipid_profile.component';
import { kidney_panelComponent } from './kidney_panel/kidney_panel.component';
import { PatientKeyComponent } from './PatientKey/PatientKey.component';

import { PatientComponent } from './Patient/Patient.component';
import { HealthProviderComponent } from './HealthProvider/HealthProvider.component';

import { AddAllergyComponent } from './AddAllergy/AddAllergy.component';
import { RequestRecordSharingComponent } from './RequestRecordSharing/RequestRecordSharing.component';
import { ShareKeyComponent } from './ShareKey/ShareKey.component';
import { RevokeMedicalRecordsSharingComponent } from './RevokeMedicalRecordsSharing/RevokeMedicalRecordsSharing.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GeneralComponent,
    AllergyComponent,
    Complete_Blood_CountComponent,
    Lipid_profileComponent,
    kidney_panelComponent,
    PatientKeyComponent,
    PatientComponent,
    HealthProviderComponent,
    AddAllergyComponent,
    RequestRecordSharingComponent,
    ShareKeyComponent,
    RevokeMedicalRecordsSharingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
