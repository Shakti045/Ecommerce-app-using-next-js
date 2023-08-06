const externalbaseurl=process.env.NEXT_PUBLIC_API_URL;


export const categoryurl={
    getallcategories:externalbaseurl+"/api/category",
    getcategoryproducts:externalbaseurl+'/api/product/getcategoryproducts',
    getfilterproducts:externalbaseurl+'/api/product/getfilteredproducts'
}

export const producturl={
    getallproducts:externalbaseurl+"/api/product",
    getproductdetail:externalbaseurl+"/api/product",
    getsearchproducts:externalbaseurl+"/api/product/getproductfromkeyword",
    getproductsbyid:externalbaseurl+"/api/product/getproductsbyid"
}

export const orderurl={
    deleteorder:externalbaseurl+"/api/order/deleteorder",
}
export const ratingurl={
    generalratinng:externalbaseurl+"/api/rating",
    getuserrating:externalbaseurl+"/api/rating/getuserrating",
};
export const createorderinsellersideurl=externalbaseurl+"/api/order";

