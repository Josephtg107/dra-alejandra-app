import { Account, Client, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: process.env.EXPO_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || 'your-project-id',
    platform: "com.zensolutions.DraAlejandraApp",
    databaseId: '686f48a60036b1bb48e2',
    userCollectionId: '6887ee970004551696f6',
}

// Initialize Appwrite client
const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

// Authentication functions
export const createAccount = async (email: string, password: string, name: string) => {
    try {
        const response = await account.create(
            'unique()',
            email,
            password,
            name
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const loginAccount = async (email: string, password: string) => {
    try {
        const response = await account.createEmailSession(email, password);
        return response;
    } catch (error) {
        throw error;
    }
};

export const logoutAccount = async () => {
    try {
        const response = await account.deleteSessions();
        return response;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await account.get();
        return response;
    } catch (error) {
        throw error;
    }
};