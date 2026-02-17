import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/enviroments.";
import { Injectable } from "@angular/core";
import { CategoryResponseDTO } from "../../models/categories/CategoryResponseDTO";
import { Observable } from "rxjs";
import { CreateCategoryRequestDTO } from "../../models/categories/CreateCategoryRequestDTO";
import { UpdateCategoryRequestDTO } from "../../models/categories/UpdateCategoryRequestDTO";


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'categories';
    }



    //Metodo para crear una cuenta nueva
    createCategory(categoryData: CreateCategoryRequestDTO): Observable<CreateCategoryRequestDTO> {
        return this.http.post<CreateCategoryRequestDTO>(`${this.apiUrl}/createCategory`, categoryData);
    }

    //Metodo para actualizar una cuenta existente
    updateCategory(categoryData: UpdateCategoryRequestDTO): Observable<UpdateCategoryRequestDTO> {
        return this.http.put<UpdateCategoryRequestDTO>(`${this.apiUrl}/updateCategory`, categoryData);
    }

    //Metodo para obtener las categorias de la persona
    getCategories(): Observable<CategoryResponseDTO[]> {
        return this.http.get<CategoryResponseDTO[]>(`${this.apiUrl}/listCategories`);
    }

    //Metodo para eliminar una categoria existente
    deleteCategory(categoryId: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/deleteCategory/${categoryId}`);
    }

}