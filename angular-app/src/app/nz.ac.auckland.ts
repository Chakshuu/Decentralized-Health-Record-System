import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace nz.ac.auckland{
   export enum gender {
      Male,
      Female,
      Other,
   }
   export class Patient extends Participant {
      id: string;
      birthDate: string;
      deathDate: string;
      prefix: string;
      first: string;
      last: string;
      ethinicity: string;
      gender: string;
      address: string;
      publicKey: string;
      consentedHPs: HealthProvider[];
   }
   export abstract class Record extends Asset {
      id: string;
      record_date: string;
      record_code: string;
      record_reasonCode: string;
      record_reasonDesc: string;
      healthProvider: HealthProvider;
      patient: Patient;
   }
   export class General extends Record {
      height: string;
      weight: string;
      BMI: string;
      sugar: string;
      bloodpressure: string;
   }
   export class Allergy extends Record {
      salt_name: string;
      symptoms: string;
      medication: string;
      allergy_desc: string;
   }
   export class Complete_Blood_Count extends Record {
      Test_name: string;
      Results: string;
      Units: string;
      Bio_ref_interval: string;
      observation: string;
   }
   export class Lipid_profile extends Record {
      testname: string;
      results: string;
      units: string;
      ref_interval: string;
   }
   export class kidney_panel extends Record {
      test: string;
      resultt: string;
      units: string;
      interval: string;
   }
   export class HealthProvider extends Participant {
      id: string;
      name: string;
      phone: string;
      address: string;
      publicKey: string;
   }
   export class PatientKey extends Asset {
      id: string;
      patient: Patient;
      healthProvider: HealthProvider;
      encryptedPatientKeyHPPublic: string;
   }
   export class AddAllergy extends Transaction {
      allergy: Allergy;
   }
   export class RequestRecordSharing extends Transaction {
      patient: Patient;
      healthProvider: HealthProvider;
   }
   export class RequestRecordSharingNotification extends Event {
      patient: Patient;
      healthProvider: HealthProvider;
   }
   export class ShareKey extends Transaction {
      patient: Patient;
      healthProvider: HealthProvider;
      encryptedPatientKeyHPPublic: string;
   }
   export class ShareKeyNotification extends Event {
      patient: Patient;
      healthProvider: HealthProvider;
   }
   export class RevokeMedicalRecordsSharing extends Transaction {
      patient: Patient;
      healthProvider: HealthProvider;
   }
   export class RevokeMedicalRecordsSharingNotification extends Event {
      patient: Patient;
      healthProvider: HealthProvider;
   }
// }
