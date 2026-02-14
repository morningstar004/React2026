import conf from "./conf";
import { Client, ID, Account } from "appwrite";

export class AuthServise {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create
      (
        ID.unique(),
        email,
        password,
        name
      );
      if(userAccount){
        //call another method
      }
      else{
        return userAccount; 
      }
    } catch (error) {
      throw error;
    }
  }

  async login({email, password}){
    try {
        const login =  await this.account.createEmailSession(email, password);
    } catch (error) {
        return error
    }
  }

  async getCurrentUser(){
    try {
      await this.account.get();
    } catch (error) {
      console.log("Appwrite service:: getCurrentUser :: error", error);
      
    }
    return null;
  }
  //delete sessions
  async logout(){
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log("Appwrite service:: logout :: error ", error);
    }
  }
}

const authServise = new AuthServise(); //object that i going to be use by the user to store authData

export default authServise;
//export defult new AuthServise()
