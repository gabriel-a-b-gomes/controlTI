import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { ProfileCreationDTO } from '../models/profile.model';
import { ReactElement, useEffect } from 'react';
import TextField from '../../../formshook/TextField';
import SelectField from '../../../formshook/SelectField';
import { selectOptions } from '../../../formshook/models/form.model';

import '../styles/ProfileStyles.css';

const profileSchema = Yup.object({
    name: Yup.string().required("Obrigatório").max(75, "Máx. 75 caracteres"),
    rankOfProcessingUnit: Yup.number(),
    memoryMinSize: Yup.number().positive("Deve ser positivo").integer().typeError("Número inválido"),
    storageMinSize: Yup.number().positive("Deve ser positivo").integer().typeError("Número inválido"),
    storageType: Yup.string(),
    rankOfOperationSystem: Yup.number()
});

function FormProfile(props: FormProfileProps) {
    const methods = useForm({
        defaultValues: props.model,
        resolver: yupResolver(profileSchema)
    });

    useEffect(() => {   
        methods.reset(props.model);
    }, [props.model]);

    const ranksSO: selectOptions[] = [
        { display: "Ultrapassado", value: 1 },
        { display: "Atual", value: 2 },
        { display: "Novo", value: 3 }
    ];

    const ranksProcessing: selectOptions[] = [
        { display: "Muito Ruim", value: 1 },
        { display: "Ruim", value: 2 },
        { display: "Normal", value: 3 },
        { display: "Bom", value: 4 },
        { display: "Muito Bom", value: 5 }
    ];

    const storageTypes: selectOptions[] = [
        { display: "HD", value: 'HD' },
        { display: "SSD", value: 'SSD' }
    ];

    function onSubmit(data: ProfileCreationDTO) {
        props.onSubmit(data, methods);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='form-profiles'>
                <div className='form-profiles-area'>
                    <div className='form-profiles-fields'>
                        <TextField displayName='Nome *' field='name' placeholder='Insira o nome do perfil...' css='auto' />
                        <div className='form-fields'>
                            <TextField type='number' displayName='Mínimo de Memória *' field='memoryMinSize' placeholder='Insira o mínimo de memória...' css='small' />
                            <TextField type='number' displayName='Mínimo de Armaz. *' field='storageMinSize' placeholder='Insira o mínimo de armaz...' css='small' />
                        </div>
                    </div>
                    <div className='form-profiles-fields'>
                        <div className='form-fields'>
                            <SelectField displayName='Classif. do Processador *' field='rankOfProcessingUnit' options={ranksProcessing} />
                            <SelectField displayName='Classif. do SO *' field='rankOfOperationSystem' options={ranksSO} />
                        </div>
                        <SelectField displayName='Tipo de Armaz. *' field='storageType' options={storageTypes} />
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

interface FormProfileProps {
    model: ProfileCreationDTO,
    buttons: ReactElement;
    children: ReactElement;
    onSubmit(values: ProfileCreationDTO, actions: UseFormReturn<ProfileCreationDTO>): void;
}

export default FormProfile;