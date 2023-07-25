import { useEffect, useState } from 'react';

import '../styles/Utils.css';

function DisplayErrors(props: ErrorsProps) {
    const [display, setDisplay] = useState<boolean>(true)

    useEffect(() => {
        setDisplay(true)
    }, [props.error]);

    function getErrorMessage(): string {
        if (props.error && props.error.length > 150) {
            console.log("ERRO: " + props.error);
            return 'Algo de inesperado ocorreu. Contate o Administrador do Sistema.'
        } else {
            return props.error!;
        }
    }

    return (
        <>
        {display && props.error && props.error.length > 0 &&
            <div className="errors">
                {getErrorMessage()}
                {/* <button onClick={handleClose}>&times;</button> */}
            </div>
        }
        </>
    )
}

interface ErrorsProps {
    error: string | undefined;
}

export default DisplayErrors;