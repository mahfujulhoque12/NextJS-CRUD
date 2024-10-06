"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent } from 'react';
import { useState } from 'react'

const page = () => {
            const [formData,setFormData]=useState({term:"", company:""});
            const [isLoading, setIsLoading] = useState(false);
            const [error, setError] = useState <string | null>(null);

            const router = useRouter()
        
        const handleChnage = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
            setFormData((prevData)=>(
                {
                    ...prevData,
                    [e.target.name] : e.target.value
                }
            ))
        }

        const handleSubmit = async (e:React.FormEvent) => {
            e.preventDefault()
            if(!formData.term || !formData.company){
                setError("Please fill ii  all the fieldes")
                return;
            }
            setError(null);
            setIsLoading(true);

            try{
                const response = await fetch("/api/interpretations",
                    {method:"POST",
                    headers:{
                        "Content-type":"application/json",
                    },
                    body:JSON.stringify(formData)
                }
                )
                if(!response.ok){
                    throw new Error("failed to create data")
                }

                router.push('/')

            } catch(error){
                console.log(error)
                setError("some thing went wrong, please try again")
            }finally{
                setIsLoading(false)
            }
        }

    return (
        <div>
            <h1 className='text-3xl font-bold text-black mt-4'>Add your company</h1>
            <form action="" className='mt-3' onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="term" 
                id="" 
                placeholder='Your company'
                 className='border w-full p-2 rounded-lg'
                 value={formData.term}
                 onChange={handleChnage}
                 />

                <textarea
                 name="company" 
                 id="" 
                 className='w-full border mt-3 p-2 rounded-lg' 
                 rows={4}
                 placeholder='describe your company'
                 value={formData.company}
                 onChange={handleChnage}


                  ></textarea>

                <button className="bg-black text-white mt-3 mb-5 rounded-lg px-3 py-2 w-full"
                disabled={isLoading}
                >{isLoading ? "Adding..." :"Add your company list"}</button>

                {error && <p className="text-red-500">{error}</p>}
               
            </form>
            <div className="flex justify-center">
            <Link className="bg-black text-white  rounded-lg px-3 py-2" href="/">Home</Link>

            </div>
        </div>
    );
};

export default page;