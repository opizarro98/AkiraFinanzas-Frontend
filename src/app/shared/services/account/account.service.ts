import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroments.";
import { AccountResponseDTO } from "../../models/account/AccountResponseDTO";
import { Observable } from "rxjs";
import { CreateAccountRequestDTO } from "../../models/account/CreateAccountRequestDTO";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    apiUrl: string;
    private readonly TOKEN_KEY = 'auth_token';

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'accounts';
    }

    //Metodo para crear una cuenta nueva
    createAccount(accountData: CreateAccountRequestDTO): Observable<CreateAccountRequestDTO> {
        return this.http.post<CreateAccountRequestDTO>(`${this.apiUrl}/createAccount`, accountData);
    }

    //Metodo para actualizar una cuenta existente
    updateAccount(accountData: AccountResponseDTO): Observable<AccountResponseDTO> {
        return this.http.put<AccountResponseDTO>(`${this.apiUrl}/updateAccount`, accountData);
    }

    //Metodod para obtener las cuentas del usuario
    getAccounts(): Observable<AccountResponseDTO[]> {
        return this.http.get<AccountResponseDTO[]>(
            `${this.apiUrl}/getAllAccounts`
        );
    }

    //Metodo para eliminar una cuenta existente
    deleteAccount(accountId: string): Observable<boolean> {
        return this.http.post<boolean>(`${this.apiUrl}/deleteAccount/${accountId}`, {});
    }

    //Metodo apra obtener el saldo total de las cuentas del usuario
    getTotalBalance(): Observable<string> {
        return this.http.get<string>(`${this.apiUrl}/getTotalBalance`);
    }
}

