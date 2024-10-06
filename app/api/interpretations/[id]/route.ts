import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";


const database = new Databases(client)

// fetch interpretation
async function fetchInterpretation(id:string) {
        try {
            const interpretation = await database.getDocument(
                process.env.NEXT_APPWRITE_CLINET_DB as string,
                "interpretations",
                id
            );
            return interpretation;
            
        } catch (error) {
                console.log(error,'faild fetching interpretation')
                throw new Error("Failed to fetch interpretation")
        }
}


// delete interpretation 

async function deleteInterpretation(id:string) {
        try {
            const response = await database.deleteDocument(   process.env.NEXT_APPWRITE_CLINET_DB as string,
                "interpretations",
                id)
                return response;
        } catch (error) {
            console.log(error,'faild delete interpretation')
            throw new Error("Failed to delete interpretation")
        }
}



// update interpretation 

async function updateInterpretation(id:string, data:{term:string, company : string}) {
    try {
        const response = await database.updateDocument(   process.env.NEXT_APPWRITE_CLINET_DB as string,
            "interpretations",
            id,
        data)
            return response;
    } catch (error) {
        console.log(error,'faild update interpretation')
        throw new Error("Failed to update interpretation")
    }
}


export  async function GET(
    req:Request,
    {params}:{params: {id:string}}
){
    try {
        const id = params.id;
        const interpretation= await fetchInterpretation(id);
        return NextResponse.json({interpretation})
    } catch (error) {
        return NextResponse.json({message:"failed to fetch interpretation"},{status:500})

    }

}

export  async function DELETE(
    req:Request,
    {params}:{params: {id:string}}
){
    try {
        const id = params.id;
         deleteInterpretation(id);
        return NextResponse.json({message:"interpretation deleted"})
    } catch (error) {
        return NextResponse.json({message:"failed to delete interpretation"},{status:500})

    }

}

export async function PUT(
    req:Request,
    {params}:{params: {id:string}}
){
    try {
        const id = params.id;
        const interpretation= await req.json();
        await updateInterpretation(id, interpretation)
        return NextResponse.json({message:"interpretation updated"})
    } catch (error) {
        return NextResponse.json({message:"failed to update interpretation"},{status:500})

    }

}