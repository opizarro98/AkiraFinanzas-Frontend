export interface UpdatePersonDTO {
    personId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    secondLastName?: string;
    email: string;
    phone?: string;
}