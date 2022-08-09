import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs'

@Component({
  selector: 'app-counter-container',
  templateUrl: './counter-container.component.html',
  styleUrls: ['./counter-container.component.css']
})

export class CounterContainerComponent implements OnInit {
  
  public counters : number[];
  public count : number;
  value = "";
  
  onKey(event: any){
    this.value = event.target.value;
  }

  constructor() {
    this.counters = [];
    this.count = 0;
  }

  ngOnInit(): void {
  }

  addClick(){
    this.counters.push(this.count);
    this.count++;
  }

  removeClick(value : number){
    const index = this.counters.indexOf(value);
    if(index > -1){
      this.counters.splice(index, 1);
    }
  }

}
