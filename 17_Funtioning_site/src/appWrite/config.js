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

  async createPost({ title, slug, featuredImg, content, status }) {
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
        },
      );
    } catch (error) {
      console.log("Appwrite servise :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, featuredImg, content, status }) {
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
      await this.databases.deleteDocument({
        databaseId: conf.appwriteDataBaseID,
        collectionId: conf.appwriteColectionID,
        documentId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument({
        databaseId: conf.appwriteDataBaseID,
        collectionId: conf.appwriteColectionID,
        documentId: slug,
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status","active")]){
    try {
      return await this.databases.listDocuments({
        databaseId: conf.appwriteDataBaseID,
        collectionId: conf.appwriteColectionID,
        queries: queries,
      });
    } catch (error) {
      console.log("Appwrite Service :: getposts :: error ", error);
      return false
    }
  }

  //file upload services
  async uploadFile(file){
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketID,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Appwrite service :: uploadeFile :: error ", error);
      return false
    }
  }

  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketID,
        fileId: fileId,
      });
      return true
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error ", error);
      return false
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview({
      bucketId: conf.appwriteBucketID,
      fileId: fileId,
    });
  }
}

const service = new Service();

export default service;
