import { useState } from "react";
import { urlProfiles } from "../../../apis/endpoints";
import EditSetting from "../../components/EditSetting";
import NotifySettings from "../../components/NotifySetting";
import FormProfile from "../form/FormProfile";
import { ProfileCreationDTO, ProfileDTO } from "../models/profile.model";

function EditProfile(props: EditProfileProps) {

    const [success, setSuccess] = useState<boolean>(false);

    function transformProfiles(upProfile: ProfileDTO): ProfileCreationDTO {
        return ({
            id: upProfile.id,
            name: upProfile.name,
            memoryMinSize: upProfile.memoryMinSize,
            storageMinSize: upProfile.storageMinSize,
            rankOfProcessingUnit: upProfile.rankOfProcessingUnit,
            rankOfOperationSystem: upProfile.rankOfOperationSystem,
            storageType: upProfile.storageType
        });
    }

    return (
        <EditSetting<ProfileCreationDTO, ProfileDTO>
            url={urlProfiles}
            transform={transformProfiles}
            itemId={props.itemId}
        >
            {(profile, edit, buttons) => (
                <FormProfile
                    model={profile}
                    buttons={buttons(profile.id ? profile.id : 0, () => props.duplicate(profile.id ? profile.id : 0), props.deleteCallBack, props.close)}
                    onSubmit={async (values, actions) => {
                        setSuccess(false);
                        const status = await edit(values);

                        setSuccess(status === 200);

                        if (status === 200) {
                            props.onSuccess();
                        }
                    }}
                >
                    <NotifySettings info="Perfil de uso alterado com sucesso" success={success} />
                </FormProfile>
            )}
        </EditSetting>
    );
} 

interface EditProfileProps {
    itemId: number;
    duplicate: (dupId: number) => void;
    close: () => void;
    deleteCallBack: () => void;
    onSuccess: () => void;
}

export default EditProfile;