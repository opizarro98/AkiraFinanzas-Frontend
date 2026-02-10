import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroments.";
import { AccountResponseDTO } from "../../models/account/AccountResponseDTO";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    apiUrl: string;
    private readonly TOKEN_KEY = 'auth_token';

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'accounts';
    }

    //Metodod para obtener las cuentas del usuario
    getAccounts(): Observable<AccountResponseDTO[]> {
        return this.http.get<AccountResponseDTO[]>(
            `${this.apiUrl}/getAllAccounts`
        );
    }
}

