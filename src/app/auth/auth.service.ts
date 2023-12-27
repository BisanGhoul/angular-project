import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

//create an interface here becauz we will only need it here 
//we will get back these 5 fields, how our response looks like
//optional, good practice
interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: number;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService{

    constructor(private http: HttpClient){}

    //send a request to sign up URL
    signup(email: string, password: string){
        return this.http.post<AuthResponseData>( //return observable so we can subs in the auth comp where we might be intreseted to get the response, to diplay messages in case of errors, and show a spinner while we are waiting 
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrXES1UhlQRB56LuRRmeyy75v7Q4MpSxU',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }); // JS object should hold 3 things this end point expects (email, password, returnSecureToken)
    }
} 
