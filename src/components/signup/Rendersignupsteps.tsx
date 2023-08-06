"use client"
import { useSelector } from "react-redux"
import { RootState} from "@/redux/store/store"
import Verifyotp from "./Verifyotp"
import Getotp from "./Getotp"
import Createaccount from "./Createaccount"
import { useForm } from "react-hook-form"
import {TiTick} from "react-icons/ti"
const steps=[
    {
        id:1,
        name:'Get Otp'
    },
    {
        id:2,
        name:'Verify Otp'
    },
    {
        id:3,
        name:'Create Account'
    }
]
const Rendersignupsteps = () => {
    const {step}=useSelector((state:RootState)=>state.signupsteps);
    const {
        handleSubmit,
        register,
        getValues,
        setValue
    }=useForm();
  return (
    <div className=" w-full flex flex-col pt-4 gap-2  items-center">
        <div className=" flex  w-full ml-[25%]  ">
        {
            steps.map((e,index)=>(
                <div key={index} className=" w-[33%] flex items-center">
                     <button className={` cursor-default w-[34px] h-[34px] ${step>index+1?" bg-green-600":" bg-yellow-500"}  flex justify-center items-center  p-2 rounded-full`}>
                        {step>index+1?<TiTick/>:e.id}
                     </button>
                     {
                        e.id!==3 && (
                            <div className={`border-[1.5px] w-[95%] border-dashed ${step>index+1?"border-green-500":" bg-slate-500"} `}></div>
                        )
                     }
                </div>
            ))
        }
        </div>
        <div className=" flex  w-[85%] ml-8 justify-between">
            {
                steps.map((e,index)=>(
                    <p className={step>index+1?" text-green-500":" text-black"} key={index}>{e.name}</p>
                ))
            }
        </div>
         {
          step===1 && (
            <Getotp register={register} getvalues={getValues} />
          )
         }
         {
          step===2 && (
            <Verifyotp setValue={setValue} getvalues={getValues}/>
          )
         }
         {
          step===3 && (
            <Createaccount register={register} handlesubmit={handleSubmit}/>
          )
         }
    </div>
  )
}

export default Rendersignupsteps