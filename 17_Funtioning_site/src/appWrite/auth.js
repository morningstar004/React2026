import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      // account.create() automatically creates a session, so just get the current user
      return await this.getCurrentUser();
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
    );
    } catch (error) {
      console.log("Appwrite service:: login :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service:: getCurrentUser :: error", error);
    }
    return null;
  }
  //delete sessions
  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite service:: logout :: error ", error);
    }
  }
}

const authService = new AuthService(); //object that i going to be use by the user to store authData

export default authService;
//export defult new AuthService()

