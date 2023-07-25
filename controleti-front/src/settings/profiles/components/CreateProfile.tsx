import { useState } from 'react';
import { urlProfiles } from '../../../apis/endpoints';
import CreateSetting from '../../components/CreateSetting';
import NotifySettings from '../../components/NotifySetting';
import FormProfile from '../form/FormProfile';

import { ProfileCreationDTO, ProfileDTO } from "../models/profile.model";

function CreateProfile(props: CreateProfileProps) {
    const base: ProfileCreationDTO = {
        name: '',
        memoryMinSize: 8,
        storageMinSize: 200,
        rankOfProcessingUnit: 3,
        rankOfOperationSystem: 2,
        storageType: 'HD'
    }

    const [profile, setProfile] = useState<ProfileCreationDTO>(base);
    const [success, setSuccess] = useState<boolean>(false);

    function transformProfile(dupProfile: ProfileDTO): void {
        setProfile({
            name: '',
            memoryMinSize: dupProfile.memoryMinSize,
            storageMinSize: dupProfile.storageMinSize,
            rankOfProcessingUnit: dupProfile.rankOfProcessingUnit,
            rankOfOperationSystem: dupProfile.rankOfOperationSystem,
            storageType: dupProfile.storageType
        });
    }

    return (
        <CreateSetting<ProfileCreationDTO, ProfileDTO>
            url={urlProfiles}
            transform={transformProfile}
            duplicatedId={props.dupId}
        >
            {(create, buttons) => (
                <FormProfile
                    model={profile}
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
                    <NotifySettings info="Perfil de uso cadastrado com sucesso" success={success} />
                </FormProfile>
            )}
        </CreateSetting>
    );
} 

interface CreateProfileProps {
    dupId?: number;
    close: () => void; 
    onSuccess: () => void;
}

export default CreateProfile;