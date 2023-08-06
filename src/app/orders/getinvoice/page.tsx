'use client'
import React from "react";
import { PDFViewer, Document, Page, Text } from "@react-pdf/renderer";
import { useSearchParams } from "next/navigation";
const PDFGenerator = () => {
    const orderid=useSearchParams().get("orderid");
  const MyDocument = () => (
    <Document>
      <Page>
        {/* Render your data as React components */}
        <Text style={{color:"blue",fontSize:"13px"}}>THANKS FOR SHOPPING WITH US</Text>
        <Text style={{color:"red",fontSize:"20px"}}>Your Order Id Is {orderid}</Text>
      </Page>
    </Document>
  );

  return (
    <div className=" h-[100vh] w-[100vw]">
      <PDFViewer width={"100%"} height={"100%"}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default PDFGenerator;
