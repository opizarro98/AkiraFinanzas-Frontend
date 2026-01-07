import { GetPersonCompleteDTO } from "../Person/GerPersonCompleteDTO";

export interface CreateUserDTO {
    username: string;
    password: string;
    person: GetPersonCompleteDTO;
}