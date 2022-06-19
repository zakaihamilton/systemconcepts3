import React, { useCallback, useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */

export default function Img({ forwardedRef, alt, className, style = {}, src, ...props }) {
    const [visible, setVisible] = useState(false);
    const onLoad = useCallback(() => {
        setVisible(true);
    }, []);
    useEffect(() => {
        setVisible(false);
    }, [src]);
    return <img ref={forwardedRef} alt={alt} onLoad={onLoad} className={className} style={{ ...style, visibility: visible ? "visible" : "hidden" }} src={src} {...props} />;
}

export function getProminentColor(imgEl) {

    const blockSize = 5,
        defaultRGB = { r: 0, g: 0, b: 0 },
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        rgb = { r: 0, g: 0, b: 0 };

    let data, i = -4, count = 0;

    if (!context || !imgEl) {
        return defaultRGB;
    }

    const height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    const width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    try {
        context.drawImage(imgEl, 0, 0);
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        console.error(e);
        return defaultRGB;
    }

    const length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;

}
