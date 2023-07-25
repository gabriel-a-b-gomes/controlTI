import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";

import './styles/Clipboard.css';

function CopyToClipBoard(props: CopyToClipBoardProps) {
    const [showToast, setShowToast] = useState<boolean>(false);

    useEffect(() => {
        if (showToast)
            setTimeout(function () {
                setShowToast(false);
            }, 1000);
    }, [showToast]);

    function handleCopyToClipBoard() {
        navigator.clipboard.writeText(props.valueToCopy);
        setShowToast(true);
    }

    return (
        <>
        <span className="clip-board-text">
            {props.valueToCopy}
            <button className="clip-board-item" onClick={handleCopyToClipBoard}>
                <MdContentCopy />
            </button>
        </span>
        {showToast &&
            <div className="toast-clip-board-container">
                <div className="toast-clip-board">
                    Valor Copiado: {props.valueToCopy}
                </div>
            </div>
        }
        </>
    );
}

interface CopyToClipBoardProps {
    valueToCopy: string;
}

export default CopyToClipBoard;