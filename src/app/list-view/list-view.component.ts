import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FillableFormComponent } from '../fillable-form/fillable-form.component';
import { InitialValues } from '../fillable-form/initial-values-interface';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  initVals : any;
  today : number = Date.now();
  momsVitalTimes : Array<number>;
  momsAssessmentTimes : Array<number>;
  babysVitalTimes : Array<number>;
  babysAssessmentTimes : Array<number>;

  constructor(private _router : ActivatedRoute) { 
    
    this._router.queryParams.subscribe(params => {
      this.initVals = params;
    });

    this.momsVitalTimes = this.calculateMomVitals();
    this.momsAssessmentTimes = this.calculateMomAssessment();
    this.babysVitalTimes = this.calculateBabysVitals();
    this.babysAssessmentTimes = this.calculateBabysAssessment();
  }

  ngOnInit(): void {
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

    for(let i = 0; i < 3; i++){
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

    for(let i = 0; i < 3; i++){
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

    for(let i = 0; i < 3; i++){
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
