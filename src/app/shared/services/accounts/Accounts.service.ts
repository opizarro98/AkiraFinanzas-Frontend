import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/enviroments";
import { GetAllActiveDTO } from "../../model/Accounts/GetAllActiveDTO";

@Injectable({
    providedIn: 'root'
})

export class AccountsService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'AccountRest';
    }

    //Metodo GET para obtener todas las cuentas
    getAllAccounts() {
        return this.http.get<GetAllActiveDTO[]>(`${this.apiUrl}/GetAllActive`);
    }

    //Metodo para crear una nueva cuenta
    createAccount(account: any) {
        return this.http.post(`${this.apiUrl}/Create`, account);
    }

    //Metodo para actualizar una cuenta
    updateAccount(account: any) {
        return this.http.put(`${this.apiUrl}/Update`, account);
    }


    //Metodo para eliminar una cuenta
    deleteAccount(accountId: string) {
        return this.http.delete(`${this.apiUrl}/Delete/${accountId}`);
    }
}