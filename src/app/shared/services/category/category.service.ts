import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { environment } from '../../../../enviroments/enviroments';
import { CreateCategoryDTO } from '../../model/Category/CreateCategoryDTO';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.urlHost + 'CategoryRest';
    }

    // Método GET para obtener todas las categorías activas
    getAllActiveCategories(): Observable<any> {
        return this.http.get(`${this.apiUrl}/GetAllActive`);
    }

    // Método POST para crear una nueva categoría
    createNewCategory(createCategory: CreateCategoryDTO): Observable<any> {
        return this.http.post(`${this.apiUrl}/Create`, createCategory);
    }

    // Método PUT para actualizar una categoría
    updateCategory(category: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/Update`, category);
    }

    // Método PUT para eliminar una categoría
    deleteCategory(id: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/Delete/${id}`, null);
    }
}
