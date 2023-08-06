export const orderconfirmationtemplate=(username:any,orders:any,totalamount:any)=>{
    return (
        `
        <!DOCTYPE html>
 <html lang="en">
 <head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Your E-commerce Store</title>
   <style>
     /* Reset some default styles */
     body, h1, h2, h3, p {
       margin: 0;
       padding: 0;
     }
     body {
       font-family: Arial, sans-serif;
       line-height: 1.6;
     }
     /* Container for the email */
     .container {
       max-width: 600px;
       margin: 0 auto;
       padding: 20px;
       border: 1px solid #ccc;
       border-radius: 4px;
     }
     /* Header section */
     .header {
       background-color: #f5f5f5;
       padding: 10px;
       text-align: center;
     }
     .header h1 {
       color: #333;
       font-size: 24px;
     }
     /* Order details section */
     .order-details {
       padding: 20px 0;
       border-top: 1px solid #ccc;
       border-bottom: 1px solid #ccc;
     }
     .order-details h2 {
       color: #333;
       font-size: 20px;
       margin-bottom: 10px;
     }
     .order-item {
       display: flex;
       justify-content: space-between;
       margin-bottom: 8px;
     }
     .order-item span {
       color: #333;
     }
     /* Total amount section */
     .total-amount {
       padding: 20px 0;
     }
     .total-amount h2 {
       color: #333;
       font-size: 20px;
       margin-bottom: 10px;
     }
     .total-amount p {
       text-align: right;
       font-size: 18px;
     }
     /* Footer section */
     .footer {
       background-color: #f5f5f5;
       padding: 10px;
       text-align: center;
     }
     .footer p {
       color: #666;
       font-size: 12px;
     }
   </style>
 </head>
 <body>
   <div class="container">
     <div class="header">
       <h1>Flipkart</h1>
     </div>
     <div class="header">
       Hi,${username} Thank you for your order.
 
     </div>
     <div class="order-details">
       <h2>Order Details</h2>
       ${
         orders.map((order:any)=>(
           `
           <div class="order-item">
           <span>${order.productname}</span>
           <span>₹${order.price}</span>
         </div>
       }
             `
         ))
         }
 
       
     </div>
     <div class="total-amount">
       <h2>${totalamount}</h2>
       <p>$150.00</p>
     </div>
     <div class="footer">
       <p>Flipkart corporation private limited-Bangalore,India</p>
     </div>
   </div>
 </body>
 </html>
 
     `
    )    
 }
 