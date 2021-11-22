import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // This appcomponent is the central place of the app, 
  // where our array of servers is managed
  serverElements = [
    {type: 'server', name: 'Testserver', content: 'Just a test'}
  ];

  // These functions will add the created servers/blueprints to the array above^
  // "Added" sounds better, because the server-adding has already happened
  onServerAdded(serverData: {serverName: string, serverContent: string}) {     // we expect serverData to be passed  
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
}
