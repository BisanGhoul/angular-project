import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent{
    @Input() message: string; //settable from outside
    @Output() close = new EventEmitter<void>();// send no data\\

    onClose(){ // will be trigerred when user click on close or backdrop
        this.close.emit();
    }
}