import {UserDto} from "./UserDto";

export interface UserCredentialsDto {
  jwt: string;
  user: UserDto;
}
