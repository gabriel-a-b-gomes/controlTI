import { AiOutlineFileDone } from 'react-icons/ai';

import '../styles/SettingsStyles.css';

function NotifySettings(props: NotifySettingsProps) {

    return (
        <>
        {props.success &&
            <div className="success-notify">
                <AiOutlineFileDone size={16} />
                <span>{props.info}</span>
            </div>
        }
        </>    
    );
}

interface NotifySettingsProps {
    success: boolean | undefined;
    info: string;
}

export default NotifySettings;