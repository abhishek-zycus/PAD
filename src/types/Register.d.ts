declare namespace registerNS {
  interface IUserData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  interface IusersService {
    [key: string]: string;
  }
}
