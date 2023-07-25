import { useState } from "react";
import { urlUsers } from "../../../apis/endpoints";
import { Status } from "../../../utils/enums/Enums";
import EditSetting from "../../components/EditSetting";
import NotifySettings from "../../components/NotifySetting";
import FormUser from "../form/FormUser";
import { handleGetClaims } from "../funcs/handleGetClaims";
import { UserCreationDTO, UserDTO } from "../models/user.model";

function EditUser(props: EditUserProps) {

    const [success, setSuccess] = useState<boolean>(false);

    function transformUser(upUser: UserDTO): UserCreationDTO {
        return({
            id: upUser.id,
            displayname: upUser.displayname,
            username: upUser.username,
            email: upUser.email,
            userIsActive: upUser.userIsActive ? Status.Ativo : Status.Desativo,
            claims: handleGetClaims(upUser.userClaims)
        });
    }

    return (
        <EditSetting<UserCreationDTO, UserDTO>
            url={urlUsers}
            transform={transformUser}
            itemId={props.itemId}
        >
            {(user, edit, buttons) => (
                <FormUser
                    model={user}
                    buttons={buttons(user.id ? user.id : 0, () => props.duplicate(user.id ? user.id : 0), props.deleteCallBack, props.close)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);

                        setSuccess(status === 200);

                        if (status === 200) {
                            props.onSuccess();
                        }
                    }}
                >
                    <NotifySettings info="Usuário alterado com sucesso" success={success} />
                </FormUser>
            )}
        </EditSetting>
    );
} 

interface EditUserProps {
    itemId: number;
    duplicate: (dupId: number) => void;
    close: () => void;
    deleteCallBack: () => void;
    onSuccess: () => void;
}

export default EditUser;