import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-shopping-app';
  selectedFeature = 'recipe'; // default value, spelled the same as in header component

  onNavigate(feature: string) {
    this.selectedFeature = feature;
    console.log(this.selectedFeature)
  }
}
