import { useState } from 'react';
import { urlUsers } from '../../../apis/endpoints';
import { Status } from '../../../utils/enums/Enums';
import CreateSetting from '../../components/CreateSetting';
import NotifySettings from '../../components/NotifySetting';
import FormUser from '../form/FormUser';
import { handleGetClaims } from '../funcs/handleGetClaims';
import { UserCreationDTO, UserDTO } from '../models/user.model';


function CreateUser(props: CreateUserProps) {
    const base: UserCreationDTO = {
        displayname: '',
        username: '',
        email: '',
        userIsActive: 1,
        claims: []
    }

    const [user, setUser] = useState<UserCreationDTO>(base);
    const [success, setSuccess] = useState<boolean>(false);

    function transformUser(dupUser: UserDTO): void {
        setUser({
            displayname: dupUser.displayname,
            username: dupUser.username,
            email: dupUser.email,
            userIsActive: dupUser.userIsActive ? Status.Ativo : Status.Desativo,
            claims: handleGetClaims(dupUser.userClaims)
        });
    }

    return (
        <CreateSetting<UserCreationDTO, UserDTO>
            url={urlUsers}
            transform={transformUser}
            duplicatedId={props.dupId}
        >
            {(create, buttons) => (
                <FormUser
                    model={user}
                    buttons={buttons(base, props.close)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await create(values);

                        setSuccess(status === 200);

                        if (status === 200) {
                            actions.reset(base);
                            props.onSuccess();
                        }
                    }}
                >
                    <NotifySettings info="Usuário cadastrado com sucesso" success={success} />
                </FormUser>
            )}
        </CreateSetting>
    );
} 

interface CreateUserProps {
    dupId?: number;
    close: () => void; 
    onSuccess: () => void;
}

export default CreateUser;