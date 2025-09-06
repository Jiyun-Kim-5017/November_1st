import "@/css/globals.css";
import Script from 'next/script'

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

        <meta property="og:type" content="website"/>
        <meta property="og:title" content="현준❤️지윤"/>
        <meta property="og:description" content="11월 1일, 저희의 결혼식에 초대합니다."/>
        <meta property="og:image" content="/gallery/cover.jpg"/>
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="11월 1일, 저희의 결혼식에 초대합니다."/>
        <meta property="og:site_name" content="INVITATION"/>
    </head>
    <body>
    {children}
    </body>
    </html>)
}
