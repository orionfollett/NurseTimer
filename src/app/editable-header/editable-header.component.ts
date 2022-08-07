import { Component, OnInit, Input } from '@angular/core';

import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-editable-header',
  inputs: ["value"],
  outputs: ["valueChangeEvents: valueChange"],
  templateUrl: './editable-header.component.html',
  styleUrls: ['./editable-header.component.css']
})
export class EditableHeaderComponent {

  public isEditing: boolean;
	public pendingValue: string;
	public value!: string;
	//public valueChangeEvents: EventEmitter<string>;

	constructor() {
		this.isEditing = false;
		this.pendingValue = "";
		//this.valueChangeEvents = new EventEmitter();
	}

	public cancel() : void {

		this.isEditing = false;

	}

  public edit() : void {

		this.pendingValue = this.value;
		this.isEditing = true;

	}

	public processChanges() : void {

		// If the value actually changed, emit the change but don't change the local
		// value - we don't want to break unidirectional data-flow.
		if ( this.pendingValue !== this.value ) {

			//this.valueChangeEvents.emit( this.pendingValue );
      this.value = this.pendingValue;

		}

		this.isEditing = false;
	}

}
