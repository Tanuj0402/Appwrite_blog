import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        return this.TablesDB.createRow({
            databaseId: conf.appwriteDatabaseId,
            collectionId: conf.appwriteCollectionId,
            documentId: slug,
            data: {
                title,
                content,
                featuredImage,
                status,
                userId,
            },
        });
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        return this.TablesDB.updateRow({
            databaseId: conf.appwriteDatabaseId,
            collectionId: conf.appwriteCollectionId,
            documentId: slug,
            data: {
                title,
                content,
                featuredImage,
                status,
            },
        });
    }

    async deletePost(slug) {
    await this.TablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
    });

    return true;
}

    async getPost(slug) {
        try {
            return await this.TablesDB.getRow(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.TablesDB.listRows(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    // file upload method

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    
}

const service = new Service();
export default service;