import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";


@Directive({
    selector : '[appDropdown]'
})
export class DropDown{

    @HostBinding('class.open') open: boolean = false;

    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.open = this.elRef.nativeElement.contains(event.target) ? !this.open : false;
      }
      constructor(private elRef: ElementRef) {}
}

/**
 * 
 * this.open = this.elRef.nativeElement.contains(event.target) ? !this.open : false;

    Inside the toggleOpen method, this line checks whether the clicked element (event.target) is contained within the host element (this.elRef.nativeElement).
    If the clicked element is inside the host element, it means the click occurred within the dropdown, and the open property is toggled (!this.open) to open or close the dropdown accordingly.
    If the clicked element is outside the host element (i.e., not contained within it), the open property is set to false, closing the dropdown.
 * 
 */