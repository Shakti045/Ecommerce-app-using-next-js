'use client'
import { useForm } from 'react-hook-form'
import React from 'react'

const Addressform = ({setshowform,addaddress}:{setshowform:any,addaddress:any}) => {
    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setValue,
    getValues,
    reset,
    }=useForm();
    async function addresshandler(data:any){
        await addaddress(data);

        setshowform(false);
        reset(
            {
                fullname:"",
                mobilenumber:"",
                pincode:"",
                locality:"",
                address:"",
                city:"",
                state:"",
                landmark:"",
                alternatemobilenumber:"",
                addresstype:""
            }
            
        );
    }
  return (
    <div className=' w-full flex flex-col gap-3 p-4  rounded-md bg-blue-300 border-[2px]'>
        <h1 className=' text-blue-600 font-semibold'>ADD A NEW ADDRESS</h1>

        <form onSubmit={handleSubmit(addresshandler)} className='  w-[60%] flex flex-col gap-3'>
           <div className=' flex  justify-between '>
           <div className=' flex flex-col'>
                <label htmlFor='name'>Name</label>
                <input
                    type='text'
                    placeholder='Enter your fullname'
                    className=' p-2 rounded-md outline-none'
                    {
                    ...register('fullname', {
                        required: {
                        value: true,
                        message: 'Please enter your name',
                        },
                    })

                    }
                />
                {errors.fullname && (
                    <p className=' text-red-600'>Please enter your fullname</p>
                )}
            </div>
            <div className=' flex flex-col '>
                <label htmlFor='mobile'>Mobile</label>
                <input

                    type='number'
                    placeholder='Enter your mobile number'
                    className=' p-2 rounded-md outline-none'
                    {
                    ...register('mobilenumber', {
                        required: {
                        value: true,
                        message: 'Please enter your mobile number',
                        },
                    })

                    }
                />
                {errors.mobilenumber && (
                    <p className=' text-red-600'>Please enter your mobile number</p>
                )}
            </div>
           </div>
           <div className=' flex  justify-between '>
           <div className=' flex flex-col'>
                <label htmlFor='pincode'>Pincode</label>
                <input

                    type='number'
                    placeholder='Enter your pincode'
                    className=' p-2 rounded-md outline-none'
                    {
                    ...register('pincode', {
                        required: {
                        value: true,
                        message: 'Please enter your pincode',
                        },
                    })

                    }
                />
                {errors.pincode && (
                    <p className=' text-red-600'>Please enter your pincode</p>
                )}
            </div>
            <div className=' flex flex-col'>
                <label htmlFor='locality'>Locality</label>
                <input
                  type='text'
                    placeholder='Enter your locality'
                    className=' p-2 rounded-md outline-none'
                    {
                    ...register('locality', {
                        required: {
                        value: true,
                        message: 'Please enter your locality',
                        },
                    })

                    }
                    />
                {errors.locality && (
                    <p className=' text-red-600'>Please enter your locality</p>
                )}
                
            </div>
           </div>
           <div>
            <textarea 
            placeholder='Enter your address'
            rows={5}
            className=' w-full p-2 rounded-md outline-none'
            {
                ...register('customaddress',{
                    required:{
                        value:true,
                        message:'Please enter your address'
                    }
                })
            }

            />
            {errors.customaddress && (

                <p className=' text-red-600'>Please enter your address</p>
            )}

           </div>
              <div className=' flex  justify-between '>
              <div className=' flex flex-col'>
                <label htmlFor='city'>District</label>
                <input

                    type='text'
                    placeholder='Enter your city'
                    className=' p-2 rounded-md outline-none'
                    {
                    ...register('district', {
                        required: {
                        value: true,
                        message: 'Please enter your city',
                        },
                    })

                    }
                />
                {errors.district && (
                    <p className=' text-red-600'>Please enter your District</p>
                )}
            </div>
            <div className=' flex flex-col'>
                <label htmlFor='state'>State</label>
                <input

                    type='text'
                    placeholder='Enter your state'
                    className=' p-2 rounded-md outline-none'
                    {
                    ...register('state', {
                        required: {
                        value: true,
                        message: 'Please enter your state',
                        },
                    })

                    }
                />
                {errors.state && (
                    <p className=' text-red-600'>Please enter your state</p>
                )}
               </div>
                </div>
              
            <div className=' flex  justify-between '>
            <div className=' flex flex-col'>
                <label htmlFor='landmark'>Landmark (optional)</label>
                <input
                  placeholder='landmark '
                    type='text'
                    className=' p-2 rounded-md outline-none'
                    {
                    ...register('landmark', {
                        required: {
                        value: false,
                        message: 'Please enter your landmark',
                        },
                    })

                    }
                    />
                {errors.landmark && (
                    <p className=' text-red-600'>Please enter your landmark</p>
                )}

            </div>
            <div className=' flex flex-col'>
                <label htmlFor='alternate'>Alternate Phone (optional)</label>
                <input
                    placeholder='Alternate phone number '
                    type='number'
                    className=' p-2 rounded-md outline-none'
                    {
                    ...register('alternatenumber', {
                        required: {
                        value: false,
                        message: 'Please enter your alternate phone number',
                        },
                    })

                    }
                />
                {errors.alternatenumber && (
                    <p className=' text-red-600'>Please enter your alternate phone number</p>
                )}
            </div>
            </div>
            <div className=' flex  justify-between '>
            <div className=' flex flex-col'>
                <label htmlFor='type'>Address Type</label>  
                <select
                    className=' p-2 rounded-md outline-none'
                    {
                    ...register('type', {
                        required: {
                        value: true,
                        message: 'Please select your address type',
                        },
                    })

                    }
                >
                    <option value=''>Select</option>
                    <option value='home'>Home</option>
                    <option value='work'>Work</option>
                </select>
                {errors.type && (
                    <p className=' text-red-600'>Please select your address type</p>
                )}
                </div>
            </div>

            <div className=' flex  gap-4'>
                <button

                    type='submit'
                    className=' w-[50%] p-2 rounded-md bg-[#2874f0] text-white'
                >
                    Save
                </button>
            
                <button
                    type='button'
                    className=' w-[50%] p-2 rounded-md bg-red-600 text-white'
                    onClick={()=>setshowform(false)}
                >
                    Cancel
                </button>
               
            </div>

        </form>

    </div>
  )
}

export default Addressform