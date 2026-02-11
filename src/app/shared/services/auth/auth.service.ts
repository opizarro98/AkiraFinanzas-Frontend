import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroments.";
import { RegisterRequest } from "../../models/authapp/RegisterRequest";
import { AuthRequest } from "../../models/authapp/AuthRequest";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    apiUrl: string;
    private readonly TOKEN_KEY = 'auth_token';

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'auth';
    }

    //Metodo para crear una nueva persona
    userRegister(data: RegisterRequest) {
        return this.http.post<boolean>(`${this.apiUrl}/register`, data);
    }

    //Metodo para iniciar sesion
    signIn(data: AuthRequest) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, data);
    }

    //Metodo para guardar el token en el localStorage
    saveToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    //Metodo para obtener el token del localStorage
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }


    //Metodo para verificar si el usuario esta logueado
    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    getUserName(): string | null {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.sub;
        } catch (error) {
            console.error('Invalid token', error);
            return null;
        }
    }


    //Metodo para cerrar sesion
    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }
}