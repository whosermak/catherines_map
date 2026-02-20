import { forwardRef, useEffect, useRef, type HTMLAttributes } from "react"
import "./Input.css"

type Props = {
    placeholder?: string
} & HTMLAttributes<HTMLDivElement>

export const Input = forwardRef<HTMLDivElement, Props>(({ placeholder="", ...p }, ref) => {
    const onInp = (e: React.SyntheticEvent<HTMLDivElement>) => {
        const inp = e.currentTarget
        if (inp.innerText === "\n") inp.innerHTML = ""
    };

    return (
        <div ref={ref} {...p}
            contentEditable
            data-placeholder={placeholder}
            onInput={onInp}
            className={"div-input div-placeholder before:text-input " + (p.className || "")}
        />
    )
})
