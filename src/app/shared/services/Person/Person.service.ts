import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../enviroments/enviroments";
import { UpdatePersonDTO } from "../../model/Person/UpdatePersonDTO";
import { GetPersonCompleteDTO } from "../../model/Person/GerPersonCompleteDTO";
import { CreatePersonDTO } from "../../model/Person/CreatePersonDTO";

@Injectable({
    providedIn: 'root'
})

export class PersonService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'PersonRest';
    }


    //Metodo para obtener una persona completa por su ID
    getPersonCompleteById(id: string) {
        return this.http.get<GetPersonCompleteDTO>(`${this.apiUrl}/GetPersonXId/${id}`);
    }

    //Metodo para obtener una persona completa por su correo electronico
    getPersonCompleteByEmail(email: string) {
        return this.http.get<GetPersonCompleteDTO>(`${this.apiUrl}/GetPersonXEmail/${email}`);
    }

    //Metodo para crear una nueva persona
    createPerson(person: CreatePersonDTO) {
        return this.http.post(`${this.apiUrl}/Create`, person);
    }

    //Metodo para actualizar una persona
    updatePerson(person: UpdatePersonDTO) {
        return this.http.put(`${this.apiUrl}/Update`, person);
    }

}