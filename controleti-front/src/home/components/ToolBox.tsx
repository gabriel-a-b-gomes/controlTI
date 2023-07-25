import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/ToolBoxStyles.css';

function ToolBox(props: ToolBoxProps) {
    const navigate = useNavigate();

    function handleClickTool() {
        navigate(props.link);
    } 

    return (
        <div className="tool-box-container" style={{ borderColor: props.color }} title={props.hint} onClick={handleClickTool}>
            {props.icon}
        </div>
    );
}

interface ToolBoxProps {
    icon: ReactElement;
    link: string;
    hint: string;
    color: string;
}

export default ToolBox;