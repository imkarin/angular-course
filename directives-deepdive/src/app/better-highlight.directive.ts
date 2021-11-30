import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() highlightColor: string = 'blue';
  @Input() defaultColor: string = 'red';

  @HostBinding('style.backgroundColor') bgColor: string = ''; // accessing the DOM property style.backgroundColor
  // bind to any property of the element you're sitting on!

  constructor(private elRef: ElementRef, private renderer: Renderer2) { } 
  
  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red')
    // elRef is still the ref to the element that this directive is on
    // last argument of setStyle: flags. For example '!important' in the css. 
    this.bgColor = this.defaultColor;
  }
  
  @HostListener('mouseenter') mouseover() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.bgColor = this.highlightColor;
  }
  
  @HostListener('mouseleave') mouseleave() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red');
    this.bgColor = this.defaultColor;
  }
}
