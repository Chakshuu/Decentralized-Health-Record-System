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
import { Complete_Blood_CountService } from './Complete_Blood_Count.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-complete_blood_count',
  templateUrl: './Complete_Blood_Count.component.html',
  styleUrls: ['./Complete_Blood_Count.component.css'],
  providers: [Complete_Blood_CountService]
})
export class Complete_Blood_CountComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  Test_name = new FormControl('', Validators.required);
  Results = new FormControl('', Validators.required);
  Units = new FormControl('', Validators.required);
  Bio_ref_interval = new FormControl('', Validators.required);
  observation = new FormControl('', Validators.required);
  id = new FormControl('', Validators.required);
  record_date = new FormControl('', Validators.required);
  record_code = new FormControl('', Validators.required);
  record_reasonCode = new FormControl('', Validators.required);
  record_reasonDesc = new FormControl('', Validators.required);
  healthProvider = new FormControl('', Validators.required);
  patient = new FormControl('', Validators.required);

  constructor(public serviceComplete_Blood_Count: Complete_Blood_CountService, fb: FormBuilder) {
    this.myForm = fb.group({
      Test_name: this.Test_name,
      Results: this.Results,
      Units: this.Units,
      Bio_ref_interval: this.Bio_ref_interval,
      observation: this.observation,
      id: this.id,
      record_date: this.record_date,
      record_code: this.record_code,
      record_reasonCode: this.record_reasonCode,
      record_reasonDesc: this.record_reasonDesc,
      healthProvider: this.healthProvider,
      patient: this.patient
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceComplete_Blood_Count.getAll()
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
      $class: 'nz.ac.auckland.Complete_Blood_Count',
      'Test_name': this.Test_name.value,
      'Results': this.Results.value,
      'Units': this.Units.value,
      'Bio_ref_interval': this.Bio_ref_interval.value,
      'observation': this.observation.value,
      'id': this.id.value,
      'record_date': this.record_date.value,
      'record_code': this.record_code.value,
      'record_reasonCode': this.record_reasonCode.value,
      'record_reasonDesc': this.record_reasonDesc.value,
      'healthProvider': this.healthProvider.value,
      'patient': this.patient.value
    };

    this.myForm.setValue({
      'Test_name': null,
      'Results': null,
      'Units': null,
      'Bio_ref_interval': null,
      'observation': null,
      'id': null,
      'record_date': null,
      'record_code': null,
      'record_reasonCode': null,
      'record_reasonDesc': null,
      'healthProvider': null,
      'patient': null
    });

    return this.serviceComplete_Blood_Count.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'Test_name': null,
        'Results': null,
        'Units': null,
        'Bio_ref_interval': null,
        'observation': null,
        'id': null,
        'record_date': null,
        'record_code': null,
        'record_reasonCode': null,
        'record_reasonDesc': null,
        'healthProvider': null,
        'patient': null
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
      $class: 'nz.ac.auckland.Complete_Blood_Count',
      'Test_name': this.Test_name.value,
      'Results': this.Results.value,
      'Units': this.Units.value,
      'Bio_ref_interval': this.Bio_ref_interval.value,
      'observation': this.observation.value,
      'record_date': this.record_date.value,
      'record_code': this.record_code.value,
      'record_reasonCode': this.record_reasonCode.value,
      'record_reasonDesc': this.record_reasonDesc.value,
      'healthProvider': this.healthProvider.value,
      'patient': this.patient.value
    };

    return this.serviceComplete_Blood_Count.updateAsset(form.get('id').value, this.asset)
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

    return this.serviceComplete_Blood_Count.deleteAsset(this.currentId)
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

    return this.serviceComplete_Blood_Count.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'Test_name': null,
        'Results': null,
        'Units': null,
        'Bio_ref_interval': null,
        'observation': null,
        'id': null,
        'record_date': null,
        'record_code': null,
        'record_reasonCode': null,
        'record_reasonDesc': null,
        'healthProvider': null,
        'patient': null
      };

      if (result.Test_name) {
        formObject.Test_name = result.Test_name;
      } else {
        formObject.Test_name = null;
      }

      if (result.Results) {
        formObject.Results = result.Results;
      } else {
        formObject.Results = null;
      }

      if (result.Units) {
        formObject.Units = result.Units;
      } else {
        formObject.Units = null;
      }

      if (result.Bio_ref_interval) {
        formObject.Bio_ref_interval = result.Bio_ref_interval;
      } else {
        formObject.Bio_ref_interval = null;
      }

      if (result.observation) {
        formObject.observation = result.observation;
      } else {
        formObject.observation = null;
      }

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.record_date) {
        formObject.record_date = result.record_date;
      } else {
        formObject.record_date = null;
      }

      if (result.record_code) {
        formObject.record_code = result.record_code;
      } else {
        formObject.record_code = null;
      }

      if (result.record_reasonCode) {
        formObject.record_reasonCode = result.record_reasonCode;
      } else {
        formObject.record_reasonCode = null;
      }

      if (result.record_reasonDesc) {
        formObject.record_reasonDesc = result.record_reasonDesc;
      } else {
        formObject.record_reasonDesc = null;
      }

      if (result.healthProvider) {
        formObject.healthProvider = result.healthProvider;
      } else {
        formObject.healthProvider = null;
      }

      if (result.patient) {
        formObject.patient = result.patient;
      } else {
        formObject.patient = null;
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
      'Test_name': null,
      'Results': null,
      'Units': null,
      'Bio_ref_interval': null,
      'observation': null,
      'id': null,
      'record_date': null,
      'record_code': null,
      'record_reasonCode': null,
      'record_reasonDesc': null,
      'healthProvider': null,
      'patient': null
      });
  }

}
