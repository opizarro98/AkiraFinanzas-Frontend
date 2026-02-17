import { MovementTypeEnum } from "../MovementTypeEnum";

export interface MovementResponseDTO {
    movementId: string;
    type: MovementTypeEnum;
    amount: string;
    description: string;
    movementDate: string;
    sourceAccountId: string;
    targetAccountId: string;
}