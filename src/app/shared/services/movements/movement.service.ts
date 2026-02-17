import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroments.";
import { Observable } from "rxjs";
import { CreateMovementRequestDTO } from "../../models/movements/CreateMovementRequestDTO";
import { MovementResponseDTO } from "../../models/movements/MovementResponseDTO";

@Injectable({
    providedIn: 'root'
})

export class MovementService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'movements';
    }

    //Metodo para registrar un nuevo movimiento
    createMovement(movementData: CreateMovementRequestDTO): Observable<MovementResponseDTO> {
        return this.http.post<MovementResponseDTO>(`${this.apiUrl}/createMovement`, movementData);
    }


    //Metodo para obtener los movimientos del usuario
    getMovements(): Observable<MovementResponseDTO[]> {
        return this.http.get<MovementResponseDTO[]>(`${this.apiUrl}/myMovements`);
    }
}