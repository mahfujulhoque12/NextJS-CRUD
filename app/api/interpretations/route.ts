import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";


const database = new Databases(client);

// createing
async function createInterpretation(data: { term?: string;  company?: string }) {
    try {
        const response = await database.createDocument(
            process.env.NEXT_APPWRITE_CLINET_DB as string,
            "interpretations",
            ID.unique(),
            data
        );
        return response;
    } catch (error) {
        console.log("Error Creating Interpretation", error);
        throw new Error("Failed to create interpretation");
    }
}

// featch
async function fetchInterpretations(){
    try {
        const response = await  database.listDocuments(process.env.NEXT_APPWRITE_CLINET_DB as string, "interpretations", [Query.orderDesc("$createdAt")])
        return response.documents;
    } catch (error) {
        console.log("Error fetching Interpretation", error)
        throw new Error("Failed to fetch interpretation")
    }   
}


export async function POST(req: Request) {
    try {
        const { term,  company } = await req.json();
        const data = { term,  company };
        const response = await createInterpretation(data);
        return NextResponse.json({ message: "Interpretation is created" });
    } catch (error) {
        return NextResponse.json({ error: "Interpretation creation failed" }, { status: 500 });
    }
}


export async function GET(){
    try {
        const interpretations = await fetchInterpretations()
        return  NextResponse.json(interpretations)
        
    } catch (error) {
        NextResponse.json({error: "failed to fetch Interpretation"},{status:500})
    }
}