import { BaseDatabase } from "./BaseDatabase";
import { User, UserEditDTO, UserRole } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "Helpper";

  public async createUser(
    id: string,
    username: string,
    email: string,
    name: string,
    password: string,
    role: UserRole
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          username,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByUsername(username: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ username });

    return User.toUserModel(result[0]);
  }

  public async getUserById(id: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return User.toUserModel(result[0]);
  }


  public async deleteUserById(id: string): Promise<void> {
    await this.getConnection()
      .select("*")
      .del()
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
  }

  public async editUserById(id: string, editInformations: UserEditDTO): Promise<void> {
    await this.getConnection()
      .update(editInformations)
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
  }

}
