import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroments.";
import { Observable } from "rxjs";
import { BasicPersonalDataResponseDTO } from "../../models/person/BasicPersonalDataResponseDTO";

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'person';
    }

    //Metodo para obtener los datos de la persona
    getPersonalData(): Observable<BasicPersonalDataResponseDTO> {
        return this.http.get<BasicPersonalDataResponseDTO>(`${this.apiUrl}/personalData`);
    }


    //Método para actualziar datos personales
    updatePersonalData(accountData: BasicPersonalDataResponseDTO): Observable<boolean> {
        return this.http.put<boolean>(`${this.apiUrl}/UpdatePersonalData`, accountData);
    }
}
