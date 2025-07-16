"use client";

import Image from "next/image";

export default function Gallery({}) {
    const IMG_LIST = [1, 2, 3, 4, 5];

    return (<div style={{height: "100%", display: "flex", overflowX: 'scroll'}}>
        {IMG_LIST.map(num => <Image key={num} src={`/gallery/${num}.jpg`} width={0} sizes="100%"
                                    height={0} alt={`img-${num}`} style={{ width: 'auto', height: '100%', aspectRatio: 0.6667, objectFit: 'contain' }}/>)}
    </div>);
}
