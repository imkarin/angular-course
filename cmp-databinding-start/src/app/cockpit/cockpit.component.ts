import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  // new properties for adding servers/blueprints
  // these properties need to become events that we can emit
  // add @Output to make the property 'listenable' from the outside
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>(); // in <> you pass the eventdata you're going to emit
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>(); // in <> you pass the eventdata you're going to emit
  
  // newServerName = '';
  // newServerContent = '';
  // ViewChild, pass the reference to the html-element that needs to be viewed:
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {  // <- receive the referenced input element
    this.serverCreated.emit({
      serverName: nameInput.value, 
      serverContent: this.serverContentInput.nativeElement.value
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: nameInput.value, 
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
