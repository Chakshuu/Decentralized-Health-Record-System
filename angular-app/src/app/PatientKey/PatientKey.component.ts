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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PatientKeyService } from './PatientKey.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-patientkey',
  templateUrl: './PatientKey.component.html',
  styleUrls: ['./PatientKey.component.css'],
  providers: [PatientKeyService]
})
export class PatientKeyComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  patient = new FormControl('', Validators.required);
  healthProvider = new FormControl('', Validators.required);
  encryptedPatientKeyHPPublic = new FormControl('', Validators.required);

  constructor(public servicePatientKey: PatientKeyService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      patient: this.patient,
      healthProvider: this.healthProvider,
      encryptedPatientKeyHPPublic: this.encryptedPatientKeyHPPublic
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePatientKey.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'nz.ac.auckland.PatientKey',
      'id': this.id.value,
      'patient': this.patient.value,
      'healthProvider': this.healthProvider.value,
      'encryptedPatientKeyHPPublic': this.encryptedPatientKeyHPPublic.value
    };

    this.myForm.setValue({
      'id': null,
      'patient': null,
      'healthProvider': null,
      'encryptedPatientKeyHPPublic': null
    });

    return this.servicePatientKey.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'patient': null,
        'healthProvider': null,
        'encryptedPatientKeyHPPublic': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'nz.ac.auckland.PatientKey',
      'patient': this.patient.value,
      'healthProvider': this.healthProvider.value,
      'encryptedPatientKeyHPPublic': this.encryptedPatientKeyHPPublic.value
    };

    return this.servicePatientKey.updateAsset(form.get('id').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicePatientKey.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePatientKey.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'patient': null,
        'healthProvider': null,
        'encryptedPatientKeyHPPublic': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.patient) {
        formObject.patient = result.patient;
      } else {
        formObject.patient = null;
      }

      if (result.healthProvider) {
        formObject.healthProvider = result.healthProvider;
      } else {
        formObject.healthProvider = null;
      }

      if (result.encryptedPatientKeyHPPublic) {
        formObject.encryptedPatientKeyHPPublic = result.encryptedPatientKeyHPPublic;
      } else {
        formObject.encryptedPatientKeyHPPublic = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'id': null,
      'patient': null,
      'healthProvider': null,
      'encryptedPatientKeyHPPublic': null
      });
  }

}
