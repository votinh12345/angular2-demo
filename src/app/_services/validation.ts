import { Http, Headers } from "@angular/http";
import { Injector } from '@angular/core'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

interface IUsernameEmailValidator {
}

export class CustomValidator {

  constructor() {}

  static checkNumber(control: FormControl) {
    return true;
  }

  static checkFormatDate(control: FormControl) {
    return false;
  }
}