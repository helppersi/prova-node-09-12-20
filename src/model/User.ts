export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole,
  ) { }

  getId() {
    return this.id;
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getRole() {
    return this.role;
  }

  setId(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPassword(password: string) {
    this.password = password;
  }


  static toUserModel(user: any): User {
    return new User(user.id, user.name, user.email, user.password, user.role);
  }


}

export interface UserInputDTO {
  email: string;
  password: string;
  name: string;
  username: string
  role: UserRole;
}

export interface UserEditDTO {
  email?: string;
  password?: string;
  name?: string;
  username?: string
  role?: UserRole;
}

export interface LoginInputDTO {
  username: string;
  password: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export const stringToRole = (input: string) => {
  switch (input) {
    case 'admin':
      return UserRole.ADMIN;
    case 'user':
      return UserRole.USER;
    default:
      throw new Error('Invalid role');
  }
};