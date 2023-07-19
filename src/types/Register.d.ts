declare namespace registerNS {
  interface IUserData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }
  interface IusersService {
    [key: string]: string;
  }
}
