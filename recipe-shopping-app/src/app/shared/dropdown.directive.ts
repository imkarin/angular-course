import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // the 'open' class is from bootstrap, opening up a dropdown
  // this should be applied to the element around the dropdown, which also has the class 'btn-group'
  // this way, when you click a dropdown-option, the dropdown closes immediately too
  @HostBinding('class.open') isOpen: boolean = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  constructor() { }
}
