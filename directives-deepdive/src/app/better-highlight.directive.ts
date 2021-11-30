import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) { } 
  
  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red')
    // elRef is still the ref to the element that this directive is on
    // last argument of setStyle: flags. For example '!important' in the css. 
  }
  
  @HostListener('mouseenter') mouseover() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')
  }

  @HostListener('mouseleave') mouseleave() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red')
  }
}
// you can put this in a 'shared' folder, or make a separate 'directives' folder
