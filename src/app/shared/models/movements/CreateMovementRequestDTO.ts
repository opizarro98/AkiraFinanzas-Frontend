import { MovementTypeEnum } from "../MovementTypeEnum";

export interface CreateMovementRequestDTO {
    type: MovementTypeEnum;
    amount: string;
    description: string;
    sourceAccountId: string;
    targetAccountId: string;
    categoryId: string;
}