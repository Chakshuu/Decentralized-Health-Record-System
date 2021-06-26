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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'General', component: GeneralComponent },
  { path: 'Allergy', component: AllergyComponent },
  { path: 'Complete_Blood_Count', component: Complete_Blood_CountComponent },
  { path: 'Lipid_profile', component: Lipid_profileComponent },
  { path: 'kidney_panel', component: kidney_panelComponent },
  { path: 'PatientKey', component: PatientKeyComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'HealthProvider', component: HealthProviderComponent },
  { path: 'AddAllergy', component: AddAllergyComponent },
  { path: 'RequestRecordSharing', component: RequestRecordSharingComponent },
  { path: 'ShareKey', component: ShareKeyComponent },
  { path: 'RevokeMedicalRecordsSharing', component: RevokeMedicalRecordsSharingComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
