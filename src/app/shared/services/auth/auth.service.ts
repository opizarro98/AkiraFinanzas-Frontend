import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroments.";
import { RegisterRequest } from "../../models/authapp/RegisterRequest";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'auth';
    }

    //Metodo para crear una nueva persona
    userRegister(data: RegisterRequest) {
        return this.http.post<boolean>(`${this.apiUrl}/register`, data);
    }
}