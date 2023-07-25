import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, ReactElement } from 'react';

import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { selectOptions } from '../../../formshook/models/form.model';
import SelectField from '../../../formshook/SelectField';
import TextField from '../../../formshook/TextField';
import { Claims, UserCreationDTO } from '../models/user.model';
import { Status } from '../../../utils/enums/Enums';
import MultiSelectorClaims from '../components/MultiSelectorClaims';
import { ClaimEnum } from '../models/ClaimEnum';

import '../styles/UserStyles.css';

const userSchema = Yup.object({
    displayname: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    username: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    email: Yup.string().required("Obrigatório").max(100, "Máx. 100 caracteres"),
    userIsActive: Yup.number().default(Status.Ativo)
})

const isActive: selectOptions[] = [
    { display: 'Ativo', value: Status.Ativo },
    { display: 'Desativado', value: Status.Desativo }
]

const claimsAvailable: Claims[] = [
    { display: 'Administrador', value: ClaimEnum.ADMINISTRADOR },
    { display: 'Gerenciar Ativos (Listagem, Inclusão, Alteração e Remoção)', value: ClaimEnum['Gerenciar Ativos (Listagem, Inclusão, Alteração e Remoção)'] },
    { display: 'Gerenciamento de Preventivas e Estado de Conexão', value: ClaimEnum['Gerenciamento de Preventivas e Estado de Conexão'] }
]

function FormUser(props: FormUserProps) {

    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(userSchema)
    });

    useEffect(() => {   
        methods.reset(props.model);
    }, [props.model]);

    function onSubmit(data: UserCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='users-form'>
                <div className='form-user-area'>
                    <TextField displayName='Email (Mesmo do AD) *' field='email' placeholder='Insira o email do usuário...' css='fill' />
                    <div className='form-user-fields'>
                        <div className='form-fields'>
                            <TextField displayName='Nome *' field='displayname' placeholder='Insira o nome do usuário...' css='auto' />
                            <TextField displayName='Usuário *' field='username' placeholder='Insira o usuário do ad...' css='auto' />
                        </div>
                        <SelectField displayName='Status' field='userIsActive' options={isActive} />
                    </div>
                    <div className='multi-selector-user'>
                        <MultiSelectorClaims field='claims' 
                            defaultSelectedValues={props.model.claims} 
                            standartClaims={claimsAvailable} 
                            setSelectedClaims={(selectedClaims) => methods.setValue("claims", selectedClaims)} 
                        />
                    </div>
                </div>
                <div className='action-settings-area'>
                    <div>{props.children}</div>
                    {props.buttons}
                </div>
            </form>
        </FormProvider>
    );
}

interface FormUserProps {
    model: UserCreationDTO;
    buttons: ReactElement;
    children: ReactElement;
    onSubmit(values: UserCreationDTO, actions: UseFormReturn<UserCreationDTO>): void;
}

export default FormUser;