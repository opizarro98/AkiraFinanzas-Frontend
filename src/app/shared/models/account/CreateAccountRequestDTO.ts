import { AccountTypeEnum } from "../AccountTypeEnum";

export interface CreateAccountRequestDTO {
    name: string;
    initialBalance: string;
    type: AccountTypeEnum;
}