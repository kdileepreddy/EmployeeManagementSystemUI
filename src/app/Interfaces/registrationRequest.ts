export class RegistrationRequest {
  username: string;
  password: string;
  email: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    
  }
}