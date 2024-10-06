"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IInterpretation{
  $id:string,
  term:string,
  company:string
}

export default function Home() {
  const [interpretations,setInterpretation]=useState<IInterpretation[] >([])
  const [isLoading,setIsLoading]=useState(true)
  const [error,setError]=useState<string|null>(null)

  useEffect(()=>{
    const fetchInterpretation=async ()=>{
      setIsLoading(true)

      try {
          const response = await fetch('api/interpretations')
          if(!response.ok){
            throw new Error("failed to fetch interpretation")
          }
          const data = await response.json()
          setInterpretation(data)
      } catch (error) {
        console.log(error,"error here")
        setError("Failed to load interpretation, please try again,")
      }
      finally
      {
        setIsLoading(false)
      }

    }
    fetchInterpretation()

  },[])


  const handleDelete=async (id:string)=>{
    const confirmDelete= window.confirm("are you want to delete this")
    if(confirmDelete){
      try {

        await fetch(`/api/interpretations/${id}`,{method:"DELETE"})
        setInterpretation((prevInterpretations)=> prevInterpretations?.filter((i)=>i.$id !==id))
        alert("Interpretation deleted successfully!");
    } catch (error) {
        setError("failed to delete interpretations")
    }
  }
    }
  


  return (
    <div >
      {error && <p className="py-4 text-red-500">{error}</p>}
  
      {isLoading ? (
        <p>Loading interpretation...</p>
      ) : (
        interpretations.length > 0 ?(
        <>
        {
          interpretations?.map((interpretation)=>(
            <div className="border-b border-b-yellow-500">
               <h1 className="text-2xl font-bold leading-9 py-3">
              {interpretation.term}
          </h1>
          <p className="text-gray-700 py-2">
            {interpretation.company}
          </p>
          <div className="flex justify-end gap-3 px-3 mb-2">
            <Link
              href={`/edit/${interpretation.$id}`}
              className="bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-800 transition-all duration-200"
            >
              Edit
            </Link>
            <button onClick={()=>handleDelete(interpretation.$id)} className="bg-red-600 px-4 py-2 rounded-lg text-white hover:bg-red-800 transition-all duration-200">
              Delete
            </button>
          </div>
            </div>
          ))
        }
         
        </>): (<p> data not found</p>)
      )}
    </div>
  );
  
}
