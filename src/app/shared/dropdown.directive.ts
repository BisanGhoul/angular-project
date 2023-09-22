import { Directive, HostBinding, HostListener } from "@angular/core";


@Directive({
    selector : '[appDropdown]'
})
export class DropDown{

    @HostBinding('class.open') open: boolean = false;

    @HostListener('click') openMenu(){
        this.open = !this.open;
        
    }
}