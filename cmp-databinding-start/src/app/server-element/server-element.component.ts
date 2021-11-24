import { AfterContentChecked, 
         AfterContentInit, 
         AfterViewChecked, 
         AfterViewInit, 
         Component, 
         ContentChild, 
         DoCheck, 
         ElementRef, 
         Input, 
         OnChanges, 
         OnDestroy, 
         OnInit, 
         SimpleChanges 
        } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, 
  AfterViewInit, AfterViewChecked, OnDestroy { // Good practice to implement the lifecycle hooks
  @Input() element: {    
    type: string, 
    name: string, 
    content: string 
  };
  @ContentChild('contentParagraph') paragraph: ElementRef;

  constructor() {
    console.log('constructor called!')
  }

  ngOnChanges(changes: SimpleChanges) { // ngOnChanges is called before ngOnInit, this is called because of the @Input 'element' property changing
    console.log('ngOnChanges called!')
    console.log(changes)
  }
  
  ngOnInit(): void {
    console.log('ngOnInit called!')
    // This won't work, because ContentInit hasn't happened yet:
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent)
  }
  
  ngDoCheck() { // run by angular to check for changes, triggered by all kinds of things, like: event being called, promise giving back data, ...
    console.log('ngDoCheck called!')
  }
  
  ngAfterContentInit() { // runs when content gets projected into view through ng-content directive
    console.log('ngAfterContentInit called!')
    // ContentInit has happened, so now we see the content (paragraph text):
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent)
  }
  
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called!')
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called!')
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called!')
  }

  ngOnDestroy() { // Called after component get destroyed, for example in the parent app-component, you remove a server from the list
    console.log('ngOnDestroy called!')
  }
}
