import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]' // without [], you would select this directive by element (<appBasicHighlight>)
                                    // []: this will now be recognized whenever you add 'appBasicHighlight' attribute
                                    // to an element without brackets
})
export class BasicHighlightDirective implements OnInit {
    @Input() highlightColor: string = 'yellow';

    // get access to the element this directive sits on
    // we can inject the element this directive sits on into this directive
    constructor(private elementRef: ElementRef) {} // name is arbitrary, type is important
                                                   // 'private' automatically makes this a property of this class
    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = this.highlightColor;
    }
}

// Remember: if you make this directive manually, you have to add it to the app.module.ts manually too
