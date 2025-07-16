import "@/css/globals.css";
import Script from 'next/script'

export default function RootLayout({children}) {

    return (<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
        />
        <script src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=0hk8z6jh50" async/>
        <title></title>
    </head>
    <body>{children}</body>
    </html>)
}
