import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/HomeBoxStyles.css';

function HomeBox(props: HomeBoxProps) {
    const navigate = useNavigate();

    function handleClickBox() {
        navigate(props.index);
    }

    function hexToRGB(hex: string) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
    
        
            return "rgba(" + r + ", " + g + ", " + b + ", 0.5)";
    }

    return (
        <div className='home-box-container' onClick={handleClickBox}>
            <div className='home-box-main'>
                <span className='icon'>{props.icon}</span>
                <div className='title'>
                    <h1>{props.title}</h1>
                    <span>{props.observation}</span>
                </div>
            </div>
            <div className='indicate-porcentage'>
                <div className='porcentage' style={{ width: `${props.part / props.total * 100}%`, background: `linear-gradient(to right, ${hexToRGB(props.color)}, ${props.color})` }} />
            </div>
        </div>
    );
}


interface HomeBoxProps {
    color: string;
    index: string;
    icon: ReactElement;
    title: string;
    observation: string;
    total: number;
    part: number
}

export default HomeBox;