import "@/css/globals.css";
import Script from 'next/script'
import ComingSoonTimer from "@/app/components/ComingSoonTimer";

export default function RootLayout({children}) {

    return (<html>
    <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico"/>
        <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
        />
        <title>현준❤️지윤</title>
        <meta property="og:title" content="현준❤️지윤"/>
        <meta property="og:image" content="/gallery/2.png"/>
    </head>
    <body>
    <ComingSoonTimer/>
    {children}
    </body>
    </html>)
}
