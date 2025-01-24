import { UserType } from '../../../common/enums/user.enums';

export interface IUser {
  id: number;
  userName: string;
  email: string;
  role: UserType;
  name?: string;
}
