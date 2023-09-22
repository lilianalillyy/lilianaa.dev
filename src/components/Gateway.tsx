import { PropsWithChildren, useState } from "preact/compat"
import { toast } from "../utils/toast";

export interface GatewayProps {
    password?: string;
    onFail?: () => void;
    onSuccess?: () => void;
}

export const Gateway = ({ password = "ireadthesourcecode", onFail, onSuccess, children }: PropsWithChildren<GatewayProps>) => {
    const [currentInput, setCurrentInput] = useState("");
    const [state, setState] = useState<null | true>(null);

    if (!onFail) {
        onFail = () => window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // hahahah im so original
    }

    if (!onSuccess) {
        onSuccess = () => toast({
            status: "success",
            description: "youreadthesourcecode :>"
        })
    }

    const handleSubmit = (e: Event) => {
        e.preventDefault();

        if (currentInput !== password) {
            onFail?.();
            return;
        }

        onSuccess?.();
        setState(true);
    }

    return (
        <>
            {state ? children : <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setCurrentInput((e.target as HTMLInputElement).value ?? "")} />
            </form>}
        </>
    );
}