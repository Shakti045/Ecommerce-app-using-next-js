'use client'
import StarRatings from "react-star-ratings"
function Starrating({rating,setrating}:{rating:number,setrating:any}) {

  return (
    <div  className=" flex gap-2 items-center">

    <StarRatings
    rating={rating}
    starRatedColor="green"
    numberOfStars={5}
    changeRating={(newrating)=>{setrating(newrating)}}
    
    name='rating'
    starDimension="30px"
  />
    <div className=" px-4 py-1 bg-black text-white rounded-md">{
        rating===0?"RATE YOUR PRODUCT":rating===1?"Poor":rating===2?"Fair":rating===3?"Good":rating===4?"Very Good":"Excellent"
        }</div>
    </div>
  )
}

export default Starrating;