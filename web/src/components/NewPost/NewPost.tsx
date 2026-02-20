import Input from "@/components/Input";
import { Button } from "../Button/Button";
import { useEffect, useRef } from "react";
import { useSt } from "@/app/store";

export default function NewPost() {
    const send = () => {
        console.log("отправить")
    }
    
    return (
        <div className="w-full gap-4 flex flex-col p-3 border-border border-b">
            <Input className="text-xl" placeholder="О чем ты думаешь"/>
            <div className="w-full h-8 flex justify-end mb-2">
                <Button onClick={(e) => send()} variant="reversed">Отправить</Button>
            </div>
        </div>
    )
}