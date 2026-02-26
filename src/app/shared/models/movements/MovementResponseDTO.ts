import { MovementTypeEnum } from "../MovementTypeEnum";

export interface MovementResponseDTO {
    movementId: string;
    type: MovementTypeEnum;
    amount: string;
    balanceAfter: string;
    description: string;
    movementDate: string;
    sourceAccountId: string;
    targetAccountId: string;
    sourceAccountName: string;
    targetAccountName: string;
}