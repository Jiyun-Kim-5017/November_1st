"use client";

import {useState} from "react";

export default function Contact() {
    const [openGroom, setOpenGroom] = useState(false);
    const [openBride, setOpenBride] = useState(false);

    return (<div>
        <div onClick={() => setOpenGroom(!openGroom)}>신랑측</div>
        {openGroom && <div>
            <div>신랑 아버지</div>
            <div>신랑 어머니</div>
            <div>신랑</div>
        </div>}
        <div onClick={() => setOpenBride(!openBride)}>신부측</div>
        {openBride && <div>
            <div>신부 아버지</div>
            <div>신부 어머니</div>
            <div>신부</div>
        </div>}
    </div>);
}
