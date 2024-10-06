import { Client } from "appwrite";

const client = new Client();

client
    .setEndpoint(process.env.NEXT_APPWRITE_CLINET_ENDPOINT as string )
    .setProject(process.env.NEXT_APPWRITE_CLINET_ID as string);

 
export default client;    