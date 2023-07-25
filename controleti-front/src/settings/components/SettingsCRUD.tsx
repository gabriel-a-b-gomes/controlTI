import { ReactElement } from "react";
import CRUDModal from "../../modals/CRUDModal";

function SettingsCRUD(props: SettingsCRUDProps) {
    function handleTitle(): string {
        return props.isCreating ? `Criar ${props.area}` : `Editar ${props.area}`;
    }

    return (
        <CRUDModal title={handleTitle()} show={props.open} onHide={props.close} icon={props.icon}>
            {props.isCreating ? props.create : props.edit}
        </CRUDModal>
    );
}

interface SettingsCRUDProps {
    area: string;
    icon: ReactElement;
    isCreating: boolean;
    open: boolean;
    close: () => void;
    create: ReactElement;
    edit: ReactElement;
}

export default SettingsCRUD;