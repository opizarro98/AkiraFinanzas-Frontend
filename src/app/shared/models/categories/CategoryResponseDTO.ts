import { CategoryTypeEnum } from "../CategoryTypeEnum";

export interface CategoryResponseDTO {
    categoryId: string;
    name: string;
    type: CategoryTypeEnum;
}