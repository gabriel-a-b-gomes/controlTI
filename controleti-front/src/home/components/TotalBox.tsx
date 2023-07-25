import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import '../styles/TotalBoxStyles.css';

function TotalBox(props: TotalBoxProps) {
    const navigate = useNavigate();

    function handleOnClickTotal() {
        navigate(props.link);
    }

    return (
        <div className="total-box-container" style={{ borderColor: props.color }} onClick={handleOnClickTotal} title={"Clique para ir para " + props.title}>
            <span className="total-box-title">
                {props.icon}
                {props.title}
            </span>
            <span className="total-box-count">
                <span>Qtde. Ativa:</span> {props.count}
            </span>
        </div>
    );
}

interface TotalBoxProps {
    title: string;
    link: string;
    icon: ReactElement;
    color: string;
    count: number;
}

export default TotalBox;