'use client'
import Sidemenu from "@/components/dashboard/Sidemenu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useMemo } from "react";
export default  function DashboardLayout({
  children,
}: {
  children: React.ReactNode

}) {

 const {user}=useSelector((state:RootState)=>state.user);
 const userMemo=useMemo(()=>user,[user]);

  return (

        <div className=" flex gap-5  justify-center w-full h-[calc(100vh-3.5rem)] bg-slate-300 ">
      <div className=" w-[20%]">
        <Sidemenu user={userMemo} />
      </div>
      <main className=" pt-4 dashboard max-h-full overflow-y-scroll  w-[70%]">
        {children}
      </main>
    </div>

  );
};