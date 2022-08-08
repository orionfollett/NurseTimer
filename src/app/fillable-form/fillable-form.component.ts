import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InitialValues } from './initial-values-interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fillable-form',
  templateUrl: './fillable-form.component.html',
  styleUrls: ['./fillable-form.component.css']
})
export class FillableFormComponent implements OnInit {
  initVals : InitialValues;  
  timerForm : any;

  constructor(private formBuilder : FormBuilder, private route : ActivatedRoute) { 
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

  onSubmit(): void {
    this.initVals = this.timerForm.value;
    console.log(this.initVals);
    this.timerForm.reset();
  }

}
