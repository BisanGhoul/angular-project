import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        //console.log(form.value);
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;// we sent a request and we are loading

        if(this.isLoginMode){

        }else{
            this.authService.signup(email, password).subscribe(
                responseData => {
                    console.log(responseData); //if signup succeeds log response data
                    this.isLoading = false;
                },
                errorMsg => { //an observable that includes only the message
                    console.log(errorMsg); //if signup fails log erros message
                    this.error = errorMsg;
                    this.isLoading = false;
                }
            )
        }
        form.reset();
    }
}