import { Component, OnInit, Input } from '@angular/core';
import { interval, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})

export class CounterComponent implements OnInit {
  public header : string;
  public count : number;
  public timer : any;
  public isTimerDone : boolean;
  public isTimerStopped : boolean;
  public static numInstances : number = 0;

  constructor() {
    this.count = 0;
    this.isTimerDone = false;
    this.isTimerStopped = true;
    CounterComponent.numInstances++;
    this.header = "Timer " + CounterComponent.numInstances;
  }

  ngOnInit(): void {
  }

  //click responses
  upClick(): void {
    this.count += 1;
  }

  downClick(): void {
    this.count -= 1;
  }

  startClick(): void {
    if(this.count == 0){return}
    this.timer = interval(1000).subscribe(() => this.count--);
    this.isTimerStopped = false;
  }

  stopClick(): void {
    if(this.timer == null){return}
    this.timer.unsubscribe();
  this.isTimerStopped = true;
  }

  resetClick(): void {
    this.stopClick();
    this.count = 0;
  }

  //formats the number to be a time
  formattedCount(): string{
    if(this.count < 0){
      this.count = 0;
    }
    
    const sec = this.count;
    let hours : any = Math.floor(sec / 3600);
    let minutes : any = Math.floor((sec - (hours*3600)) / 60);
    let seconds : any = sec - (hours*3600) - (minutes * 60);

    //add leading 0's
    
    if(hours < 10) {hours = "0" + hours};
    if(minutes < 10) {minutes = "0" + minutes};
    if(seconds < 10) {seconds = "0" + seconds};
    
    return hours+":"+minutes+":"+seconds;
  }
}
