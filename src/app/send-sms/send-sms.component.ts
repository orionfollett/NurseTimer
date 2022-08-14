import { Component, Input, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})

export class SendSmsComponent implements OnInit {

  @Input() message! : string;

  emailForm : any;
  emailFormValues : any = {
    phoneNumber : ''
  }

  constructor(private http : HttpClient, private formBuilder : FormBuilder, private _router : ActivatedRoute) { 
    this.emailForm = this.formBuilder.group(this.emailFormValues);
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.emailFormValues = this.emailForm.value;
    console.log(this.emailFormValues);
    let response = this.sendEmail(this.emailFormValues.phoneNumber, this.message);
    //this.http.post("http://localhost:4200/api/email", this.emailFormValues, {responseType : 'text'}).pipe().subscribe();
    console.log(response)
  }

  //utility function
  public sendEmail(num : string, m : string) : any{
    let s = {phoneNumber : num, msg : m};
    return this.http.post("http://localhost:4200/api/email", s, {responseType : 'text'}).pipe().subscribe();
  }
}
