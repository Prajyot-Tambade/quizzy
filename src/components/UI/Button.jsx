import React from "react";
import Link from "next/link";

export default function Button({
    children,
    type = "button",
    textColor = "text-white",
    hoverStyle = 'hover:text-black hover:bg-white',
    border = "border-2 border-black",
    className = "",
    href="/",
    ...props
}) {
    return type=="link"? 
    (
        <Link href={href} className={`${className} bg-black px-4 py-2 rounded-lg inline-block cursor-pointer ${hoverStyle} ${textColor} ${border}`} {...props}>
            {children}
        </Link>
    ): 
    
    (
        <button type={type} className={`${className} bg-black px-8 py-2 rounded-lg cursor-pointer ${hoverStyle} ${textColor} ${border}`} {...props}>
            {children}
        </button>
    );
}