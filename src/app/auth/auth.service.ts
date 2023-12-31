import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Router } from "@angular/router";

//we will get back these 5 fields, how our response looks like
//optional, good practice
export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: number;
    localId: string;
    registered?: boolean //optional for login request
}

@Injectable({providedIn: 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient,
                private router: Router){}

    //send a request to sign up URL
    signup(email: string, password: string){
        return this.http.post<AuthResponseData>( //return observable so we can subs in the auth comp where we might be intreseted to get the response, to diplay messages in case of errors, and show a spinner while we are waiting 
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrXES1UhlQRB56LuRRmeyy75v7Q4MpSxU',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }) // JS object should hold 3 things this end point expects (email, password, returnSecureToken)
        .pipe(
            catchError(this.handleError),
            tap(resData=>{
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }
            ) 
        );
    }

    login(email:string, password:string){
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrXES1UhlQRB56LuRRmeyy75v7Q4MpSxU",
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(
            catchError(this.handleError),
            tap(resData=>{
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }
            ) 
        );

    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email:string, userId:string, token:string, expiresIn: number){
            const expiartionDate = new Date(new Date().getTime() + +expiresIn*1000);
            const user = new User(
                email,
                userId,
                token,
                expiartionDate
            );
            this.user.next(user);//currently logged in user
            localStorage.setItem('userData', JSON.stringify(user));//store it in storage
        
    }

    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string;
            _tokenExpirationDate: string; // have to manually parse it
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){//if doesnt exist
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){ //will check if the token is valid, by calling its getter where we check if the date is expired
            this.user.next(loadedUser); 
        }
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = "an Error occurred";
                console.log(errorRes.error.error.message); //if signup fails log erros message
                if(!errorRes.error || !errorRes.error.error){
                    return throwError(errorMessage);
                }
                switch(errorRes.error.error.message){
                    case "EMAIL_EXISTS": 
                    errorMessage = "there is an existing user with this email!";
                    break;
                    case "INVALID_LOGIN_CREDENTIALS":
                        errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
                    break;
                }
                return throwError(errorMessage);

    }
} 
