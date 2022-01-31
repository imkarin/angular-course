import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  // viewContainerRef needs to be public, so we can access it from the component using this placeholder directive
  constructor(public viewContainerRef: ViewContainerRef) { }

}
