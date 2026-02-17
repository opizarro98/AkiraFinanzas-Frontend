import { CategoryTypeEnum } from "../CategoryTypeEnum";

export interface CreateCategoryRequestDTO {
    name: string;
    type: CategoryTypeEnum;
}