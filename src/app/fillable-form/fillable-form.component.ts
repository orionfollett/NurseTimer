import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InitialValues } from './initial-values-interface';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-fillable-form',
  templateUrl: './fillable-form.component.html',
  styleUrls: ['./fillable-form.component.css']
})

export class FillableFormComponent implements OnInit {
  initVals : InitialValues;  
  timerForm : any;

  isRoomNumberValid : boolean = true;
  isBirthTimeValid : boolean = true;
  isRecoveryTimeValid : boolean = true;
  isInitialVitalsValid : boolean = true;

  constructor(private formBuilder : FormBuilder, private _router : Router) { 
    this.initVals = {
      roomNumber: '',
      birthTime: '',
      initialVitals: '',
      recoveryTime: '',
    };

    this.timerForm = this.formBuilder.group(this.initVals);
  }

  ngOnInit(): void {
  }

  public static emptyInitVals() : InitialValues{
    return {
      roomNumber: '',
      birthTime: '',
      initialVitals: '',
      recoveryTime: '',
    };
  }

  public static validateTimeFormat(s : string) : boolean{
    if(s.length == "0430".length){
        if(!isNaN(Number(s))){
          let hours = Number(s.slice(0, 2));
          let minutes = Number(s.slice(2, 4));
          if(!(hours > 23 || hours < 0 || minutes > 59 || minutes < 0)){
            return true;
          }
        }
      }
    return false;
  }

  validateInitVals() : boolean{
    this.isBirthTimeValid = FillableFormComponent.validateTimeFormat(this.initVals.birthTime);
    this.isRecoveryTimeValid = FillableFormComponent.validateTimeFormat(this.initVals.recoveryTime);
    this.isInitialVitalsValid = FillableFormComponent.validateTimeFormat(this.initVals.initialVitals);
    this.isRoomNumberValid = this.initVals.roomNumber != null || this.initVals.roomNumber != "";
    return this.isBirthTimeValid && this.isRecoveryTimeValid && this.isInitialVitalsValid && this.isRoomNumberValid;
  }

  onSubmit(): void {
    this.initVals = this.timerForm.value;
      if(this.validateInitVals()){
      let navigationExtras : NavigationExtras = {
        queryParams : this.initVals
      }

      this._router.navigate(['list'], navigationExtras);
      this.timerForm.reset();
      this.initVals = FillableFormComponent.emptyInitVals();
    }
  }
}
