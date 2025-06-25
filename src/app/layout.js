import "./globals.css";
import Script from 'next/script'

export default function RootLayout({children}) {

    return (<html>
    <head>
        <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="beforeInteractive"
        />
    </head>
    <body>{children}</body>
    </html>)
}
