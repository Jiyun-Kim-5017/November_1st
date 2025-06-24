"use client"
export default function Footer() {

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    return (<footer className="justify-self-end sticky bottom-[20px] right-[8px]">
        <div className="rounded-4xl bg-amber-100 w-[26px] h-[30px] text-center" onClick={handleClick}>^</div>
    </footer>)
}
