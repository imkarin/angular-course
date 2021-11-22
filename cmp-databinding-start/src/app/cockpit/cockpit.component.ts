import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    this.serverCreated.emit({
      serverName: this.newServerName, 
      serverContent: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverName: this.newServerName, 
      serverContent: this.newServerContent
    });
  }
}
