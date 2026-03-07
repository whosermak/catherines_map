import { Button } from "../Button/Button";
import { useState } from "react";

type Props = {
    onSend?: Function
    placeholder?: string
    defaultDate?: string | Date
}

export default function NewPost({ onSend, placeholder = "О чем ты думаешь", defaultDate }: Props) {
    if (defaultDate instanceof Date) defaultDate = defaultDate.toISOString().slice(0, 10)
    const [content, setContent] = useState("")
    const [date, setDate] = useState(defaultDate || "")

    const send = () => {
        if (!date) return
        const text = content
        
        setContent("")
        if (!defaultDate) setDate("")

        if (onSend) onSend({ text, date })
    }

    const onCh = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const el = e.currentTarget
        setContent(el.value)

        el.style.height = "auto"
        el.style.height = el.scrollHeight + "px"
    }
    
    return (
        <div className="w-full gap-4 flex flex-col px-4 pt-2 pb-1 border-border border-b">
            <textarea rows={1} value={content} onChange={(e) => onCh(e)} className="resize-none h-auto text-xl outline-0" placeholder={placeholder} />
            <div className="w-full h-8 flex items-center justify-end mb-2">
                <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="px-2 cursor-pointer text-lg outline-1 w-40 mr-5 outline-border rounded-xl h-9"></input>
                <Button onClick={() => send()} variant="reversed">Отправить</Button>
            </div>
        </div>
    )
}