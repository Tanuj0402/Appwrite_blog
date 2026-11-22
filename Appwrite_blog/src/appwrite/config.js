import conf from '../conf.js'
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
        return this.databases.createDocument({
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
        return this.databases.updateDocument({
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
    await this.databases.deleteDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
    });

    return true;
}
}

const service = new Service();
export default service;