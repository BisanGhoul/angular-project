import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router){}

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
        let authObs: Observable<AuthResponseData>;

        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        }else{
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            responseData => {
                console.log(responseData); //if signup succeeds log response data
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMsg => { //an observable that includes only the message
                console.log(errorMsg); //if signup fails log erros message
                this.error = errorMsg;
                this.isLoading = false;
            }
        )
        form.reset();
    }

    onHandleError(){
        this.error = null; //the consdiotion in *ngIf to show the error will lead to false
    }
}