import { useState, useEffect, ReactElement } from 'react';

import axios, { AxiosResponse } from "axios";
import { AiOutlineClear } from 'react-icons/ai'

import DisplayErrors from "../../utils/alerts/DisplayErros";
import Loading from "../../utils/Loading";

import { useFormContext } from 'react-hook-form';
import HandleErrors from '../../utils/functions/HandleErrors';
import { useAuth } from '../../auth/AuthContext';

function CreateSetting<TCreation, TRead>(props: CreateSettingProps<TCreation, TRead>) {
    const { setUser } = useAuth();

    const { reset } = useFormContext() || {};

    const [isDuplicating, setIsDuplicating] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function loadDuplicateItem() {
            axios.get(`${props.url}/${props.duplicatedId}`)
                .then((response: AxiosResponse<TRead>) => {
                    props.transform(response.data);
                }).catch(function(errors) {
                    HandleErrors(errors, setUser, setError);
                });
        }

        if (props.duplicatedId) {
            setIsDuplicating(true);
            loadDuplicateItem();
            setIsDuplicating(false);
        }
    }, [props.duplicatedId]);

    async function create(newSetting: TCreation): Promise<number> {
        const status = await axios.post(`${props.url}`, newSetting)
            .then((response: AxiosResponse) => {
                setError("");
                return response.status;
            }).catch(function (errors) {
                HandleErrors(errors, setUser, setError);

                return errors.response.status;
            });

        return status;
    }

    function buttons(init: TCreation, close: () => void): ReactElement {
        return (
            <div className='form-actions-buttons two-buttons'>
                <button className="action" type='button' onClick={() => reset({ values: init })}><AiOutlineClear /></button>
                <button type='submit'>Gravar</button>
                <button className='back' onClick={close}>Fechar</button>
            </div>
        );
    }

    return (
        <>
        {(props.duplicatedId && !isDuplicating) || !props.duplicatedId ? props.children(create, buttons) : <Loading />}
        <DisplayErrors error={error} />
        </>
    );
}

interface CreateSettingProps<TCreation, TRead> {
    url: string;
    duplicatedId?: number;
    transform(read: TRead): void;
    children(create: (newSetting: TCreation) => Promise<number>, buttons: (init: TCreation, close: () => void) => ReactElement): ReactElement;
}

export default CreateSetting;