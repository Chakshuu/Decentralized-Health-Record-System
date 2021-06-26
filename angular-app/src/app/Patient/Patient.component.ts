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
import { PatientService } from './Patient.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-patient',
  templateUrl: './Patient.component.html',
  styleUrls: ['./Patient.component.css'],
  providers: [PatientService]
})
export class PatientComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  birthDate = new FormControl('', Validators.required);
  deathDate = new FormControl('', Validators.required);
  prefix = new FormControl('', Validators.required);
  first = new FormControl('', Validators.required);
  last = new FormControl('', Validators.required);
  ethinicity = new FormControl('', Validators.required);
  gender = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  publicKey = new FormControl('', Validators.required);
  consentedHPs = new FormControl('', Validators.required);


  constructor(public servicePatient: PatientService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      birthDate: this.birthDate,
      deathDate: this.deathDate,
      prefix: this.prefix,
      first: this.first,
      last: this.last,
      ethinicity: this.ethinicity,
      gender: this.gender,
      address: this.address,
      publicKey: this.publicKey,
      consentedHPs: this.consentedHPs
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePatient.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'nz.ac.auckland.Patient',
      'id': this.id.value,
      'birthDate': this.birthDate.value,
      'deathDate': this.deathDate.value,
      'prefix': this.prefix.value,
      'first': this.first.value,
      'last': this.last.value,
      'ethinicity': this.ethinicity.value,
      'gender': this.gender.value,
      'address': this.address.value,
      'publicKey': this.publicKey.value,
      'consentedHPs': this.consentedHPs.value
    };

    this.myForm.setValue({
      'id': null,
      'birthDate': null,
      'deathDate': null,
      'prefix': null,
      'first': null,
      'last': null,
      'ethinicity': null,
      'gender': null,
      'address': null,
      'publicKey': null,
      'consentedHPs': null
    });

    return this.servicePatient.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'birthDate': null,
        'deathDate': null,
        'prefix': null,
        'first': null,
        'last': null,
        'ethinicity': null,
        'gender': null,
        'address': null,
        'publicKey': null,
        'consentedHPs': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'nz.ac.auckland.Patient',
      'birthDate': this.birthDate.value,
      'deathDate': this.deathDate.value,
      'prefix': this.prefix.value,
      'first': this.first.value,
      'last': this.last.value,
      'ethinicity': this.ethinicity.value,
      'gender': this.gender.value,
      'address': this.address.value,
      'publicKey': this.publicKey.value,
      'consentedHPs': this.consentedHPs.value
    };

    return this.servicePatient.updateParticipant(form.get('id').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.servicePatient.deleteParticipant(this.currentId)
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

    return this.servicePatient.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'birthDate': null,
        'deathDate': null,
        'prefix': null,
        'first': null,
        'last': null,
        'ethinicity': null,
        'gender': null,
        'address': null,
        'publicKey': null,
        'consentedHPs': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.birthDate) {
        formObject.birthDate = result.birthDate;
      } else {
        formObject.birthDate = null;
      }

      if (result.deathDate) {
        formObject.deathDate = result.deathDate;
      } else {
        formObject.deathDate = null;
      }

      if (result.prefix) {
        formObject.prefix = result.prefix;
      } else {
        formObject.prefix = null;
      }

      if (result.first) {
        formObject.first = result.first;
      } else {
        formObject.first = null;
      }

      if (result.last) {
        formObject.last = result.last;
      } else {
        formObject.last = null;
      }

      if (result.ethinicity) {
        formObject.ethinicity = result.ethinicity;
      } else {
        formObject.ethinicity = null;
      }

      if (result.gender) {
        formObject.gender = result.gender;
      } else {
        formObject.gender = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.publicKey) {
        formObject.publicKey = result.publicKey;
      } else {
        formObject.publicKey = null;
      }

      if (result.consentedHPs) {
        formObject.consentedHPs = result.consentedHPs;
      } else {
        formObject.consentedHPs = null;
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
      'birthDate': null,
      'deathDate': null,
      'prefix': null,
      'first': null,
      'last': null,
      'ethinicity': null,
      'gender': null,
      'address': null,
      'publicKey': null,
      'consentedHPs': null
    });
  }
}
