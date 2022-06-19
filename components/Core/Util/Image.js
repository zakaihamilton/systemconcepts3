import NextImage from "next/image";
import React from "react";

const customLoader = ({ src }) => {
    return src;
};

export default function Image(props) {
    return <NextImage
        unoptimized={true}
        {...props}
        loader={customLoader}
    />;
}
