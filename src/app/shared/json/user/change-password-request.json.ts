import { UserJson } from './user.json';

export class ChangePasswordRequestJson {
    user: UserJson;
    newPassword: string;
}