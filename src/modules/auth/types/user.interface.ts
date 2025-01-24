import { UserType } from '../../../common/enums/user.enums';

export interface IUser {
  userName: string;
  email: string;
  role: UserType;
  name: string;
}
