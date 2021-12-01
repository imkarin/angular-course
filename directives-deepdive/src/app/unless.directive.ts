import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input('appUnless') set unlessConditionEffect(condition: boolean) { // 'set' turns it into a method, but important: it's still a property
    if (!condition) {
      // display something
      this.vcRef.createEmbeddedView(this.templateRef); // create the template of this directive in the viewcontainer
    } else {
      // display nothing
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { } // inject the template (what do we render) and viewcontainer (where do we render it)
}
