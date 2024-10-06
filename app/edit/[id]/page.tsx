"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent } from 'react';

const page = ({params}:{params:{id:string}}) => {
    const [formData,setFormData]=useState({term:"", company:""});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState <string | null>(null);

    const router = useRouter()

    const handleChange= (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        e.preventDefault()
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name]:e.target.value
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
            const response = await fetch(`/api/interpretations/${params.id}`,
                {method:"PUT",
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

    useEffect(()=>{
        const fetchData=async () =>{
            try {
                const response = await fetch(`/api/interpretations/${params.id}`)
                if(!response.ok){
                    throw new Error("failed to fatich data")
                }
                const data = await response.json()
                console.log(data,'data');
                setFormData({term:data.interpretation.term, company:data.interpretation.company})
            } catch (error) {
                setError("faild to laod data")
            }
        }
        fetchData()
    },[])
   
    return (
        <div>
        <h1 className='text-3xl font-bold text-black mt-4'>Edit your company</h1>
        <form action="" className='mt-3' onSubmit={handleSubmit}>
            <input type="text" name="term" id="" placeholder='Your company' className='border w-full p-2 rounded-lg'
            value={formData.term} 
            onChange={handleChange}
            />
            <textarea 
            name="company"
            id=""
            className='w-full border mt-3 p-2 rounded-lg'
            rows={4} placeholder='describe your company'
            value={formData.company}
            onChange={handleChange}

            ></textarea>
            <button className="bg-black text-white mt-3 mb-5 rounded-lg px-3 py-2 w-full">
                {isLoading ? "Updating":"Update company list"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
           
        </form>
        <div className="flex justify-center">
        <Link className="bg-black text-white  rounded-lg px-3 py-2" href="/">Home</Link>

        </div>
    </div>
    );
};

export default page;