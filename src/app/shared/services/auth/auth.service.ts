import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroments.";
import { RegisterRequest } from "../../models/authapp/RegisterRequest";
import { AuthRequest } from "../../models/authapp/AuthRequest";
import { Observable } from "rxjs";
import { UpdatePassRequestDTO } from "../../models/authapp/UpdatePassRequestDTO";
import { jwtDecode, JwtPayload } from 'jwt-decode';


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

    //Metodo para verificar si la contraseña anterior es correcta
    passwordIsCorrect(password: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/validPassword/${password}`);
    }

    //Metodo para cambiar la contraseña
    changePassword(data: UpdatePassRequestDTO) {
        return this.http.post<{ token: string }>(`${this.apiUrl}/UpdatePassword`, data);
    }


    getDecodedToken(): any {
        const token = this.getToken();
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch (error) {
            return null;
        }
    }

    getUsername(): string | null {
        return this.getDecodedToken()?.sub ?? null;
    }

    getName(): string | null {
        return this.getDecodedToken()?.Name ?? null;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        try {
            const decoded = jwtDecode<any>(token);
            return decoded.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }


    //Metodo para cerrar sesion
    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }
}