import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/enviroments";
import { UpdatePersonDTO } from "../../model/Person/UpdatePersonDTO";
import { GetPersonCompleteDTO } from "../../model/Person/GerPersonCompleteDTO";
import { CreatePersonDTO } from "../../model/Person/CreatePersonDTO";
import { Observable } from "rxjs";
import { CreateUserDTO } from "../../model/User/CreateUserDTO";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'UserRest';
    }


    //Metodo para crear un nuevo usuario
    createUser(user: CreateUserDTO) {
        return this.http.post<void>(`${this.apiUrl}/Create`, user);
    }


}
