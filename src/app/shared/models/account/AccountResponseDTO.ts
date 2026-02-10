import { AccountTypeEnum } from "../AccountTypeEnum";

export interface AccountResponseDTO {
    accountId: string;
    name: string;
    balance: string;
    type: AccountTypeEnum;
}