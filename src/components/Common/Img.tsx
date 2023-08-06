import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const Img = ({ src,className}:{src:any,className:any}) => {
    return (
        <LazyLoadImage
            alt="imagecomponent"
            effect="opacity"
            className={className}
            src={src}
        />
    );
};

export default Img;