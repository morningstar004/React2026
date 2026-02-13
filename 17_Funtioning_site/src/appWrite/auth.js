import { current } from "@reduxjs/toolkit";
import conf from "./conf";
import { Client, ID, Account } from "appwrite";

export class AuthServise {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(appwriteURL).setProject(appwriteProjectID);
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
}

async currentUser
const authServise = new AuthServise(); //object that i going to be use by the user to store authData

export default authServise;
