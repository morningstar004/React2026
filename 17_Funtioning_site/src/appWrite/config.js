import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, featuredImg, content, status, useID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDataBaseID,
        conf.appwriteColectionID,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          useID,
        },
      );
    } catch (error) {
      console.log("Appwrite servise :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, featuredImg, content, status, useID }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDataBaseID,
        conf.appwriteColectionID,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
        },
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDataBaseID,
        conf.appwriteColectionID,
        slug,
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
        conf.appwriteDataBaseID,
        conf.appwriteColectionID,
        slug,
      )
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status","active")]){
    try {
      return await this.databases.listDocuments(
        conf.appwriteDataBaseID,
        conf.appwriteColectionID,
        queries
      )
    } catch (error) {
      console.log("Appwrite Service :: getposts :: error ", error);
      return false
    }
  }

  //file upload services
}

const service = new Service();

export default service;
