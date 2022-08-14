import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FillableFormComponent } from '../fillable-form/fillable-form.component';
import { formatDate } from '@angular/common';
import { InitialValues } from '../fillable-form/initial-values-interface';
import { SendSmsComponent } from '../send-sms/send-sms.component';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})

export class ListViewComponent implements OnInit {

  initVals : any;

  recoveryTime : string;
  birthTime : string;
  initialVitals : string;
  today : number = Date.now();
  momsVitalTimes : Array<number>;
  momsAssessmentTimes : Array<number>;
  babysVitalTimes : Array<number>;
  babysAssessmentTimes : Array<number>;
  emailBody : string;

  constructor(private _router : ActivatedRoute/*, private _email : SendSmsComponent*/) { 
    this._router.queryParams.subscribe(params => {
      this.initVals = params;
    });
 
    this.birthTime = this.convertNumToTime(this.initVals.birthTime);
    this.recoveryTime = this.convertNumToTime(this.initVals.recoveryTime);
    this.initialVitals = this.convertNumToTime(this.initVals.initialVitals);

    this.momsVitalTimes = this.calculateMomVitals();
    this.momsAssessmentTimes = this.calculateMomAssessment();
    this.babysVitalTimes = this.calculateBabysVitals();
    this.babysAssessmentTimes = this.calculateBabysAssessment();
    this.emailBody = this.convertForEmail(
                     this.momsVitalTimes, 
                     this.momsAssessmentTimes, 
                     this.babysVitalTimes,
                     this.babysAssessmentTimes);
    //_email.sendEmail("6263907606", this.convertForEmail(this.momsVitalTimes, this.momsAssessmentTimes, this.babysVitalTimes,
      //this.babysAssessmentTimes));

  }

  ngOnInit(): void {
  }

  convertNumToTime(s : any){
    return new String(s).slice(0,2) + ":" + new String(s).slice(2,4);
  }

  convertForEmail(momV : number[], momA : number[], babyV : number[], babyA : number[]) : string{
    let resp : string = "";

    resp += "ROOM NUMBER: " + this.initVals.roomNumber + 
            "\nBirth Time: " + this.birthTime + 
            "\nBaby's First Vitals: " + this.initialVitals + 
            "\nMom's Recovery: " + this.recoveryTime;

    resp += "\n\nMom's Vitals:\n"
    for(let i of momV){
      resp += formatDate(i, 'HH:mm', 'en-US') + "\n";
    }
    
    resp += "\n\nMom's Assessment Times:\n"
    for(let i of momA){
      resp += formatDate(i, 'HH:mm', 'en-US') + "\n";
    }

    resp += "\n\nBaby's Vitals Check Times:\n"
    for(let i of babyV){
      resp += formatDate(i, 'HH:mm', 'en-US') + "\n";
    }

    resp += "\n\nBaby's Assessments Check Times:\n"
    for(let i of babyA){
      resp += formatDate(i, 'HH:mm', 'en-US') + "\n";
    }

    return resp;
  }

  convertStringNumToDate(time : string) : any{
    if(FillableFormComponent.validateTimeFormat(time)){
      var dt = new Date();
      dt.setHours(Number(time.slice(0, 2)));
      dt.setMinutes(Number(time.slice(2, 4)));
      return dt;
    }
    return null;
  }

  calculateMomVitals() : Array<number>{
    var dt = this.convertStringNumToDate(this.initVals.recoveryTime);
    
    var arr : Array<number> = [];
    
    for(let i = 0; i < 8; i++){
      dt.setMinutes(dt.getMinutes() + 15);  
      arr.push(dt.getTime());
    }

    dt.setHours(dt.getHours() + 1);
    arr.push(dt.getTime());

    for(let i = 0; i < 2; i++){
      dt.setHours(dt.getHours() + 4);
      arr.push(dt.getTime());
    }

    return arr;
  }

  calculateMomAssessment() : Array<number>{
    var dt = this.convertStringNumToDate(this.initVals.recoveryTime);
    
    var arr : Array<number> = [];
    
    for(let i = 0; i < 4; i++){
      dt.setMinutes(dt.getMinutes() + 15);  
      arr.push(dt.getTime());
    }

    for(let i = 0; i < 2; i++){
      dt.setMinutes(dt.getMinutes() + 30);  
      arr.push(dt.getTime());
    }

    dt.setHours(dt.getHours() + 1);
    arr.push(dt.getTime());

    for(let i = 0; i < 2; i++){
      dt.setHours(dt.getHours() + 4);
      arr.push(dt.getTime());
    }

    return arr;
  }

  calculateBabysVitals() : Array<number>{
    var dt = this.convertStringNumToDate(this.initVals.initialVitals);
    
    var arr : Array<number> = [];
    
    for(let i = 0; i < 4; i++){
      dt.setMinutes(dt.getMinutes() + 30);  
      arr.push(dt.getTime());
    }

    dt.setHours(dt.getHours() + 1);
    arr.push(dt.getTime());

    for(let i = 0; i < 2; i++){
      dt.setHours(dt.getHours() + 4);
      arr.push(dt.getTime());
    }

    return arr;
  }

  calculateBabysAssessment() : Array<number>{
    var dt = this.convertStringNumToDate(this.initVals.birthTime);
    
    var arr : Array<number> = [];
    
    dt.setHours(dt.getHours() + 1);
    arr.push(dt.getTime());

    dt.setHours(dt.getHours() + 4);
    arr.push(dt.getTime());

    dt.setHours(dt.getHours() + 4);
    arr.push(dt.getTime());

    dt.setHours(dt.getHours() + 4);
    arr.push(dt.getTime());
    return arr;
  }
}
