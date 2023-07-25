import { ReactElement, useState, useEffect } from 'react';
import axios, { AxiosResponse } from "axios";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IoDuplicateSharp } from 'react-icons/io5';

import Loading from '../../utils/Loading';
import DisplayErrors from '../../utils/alerts/DisplayErros';
import ConfirmAlert from '../../utils/alerts/ConfirmAlert';
import HandleErrors from '../../utils/functions/HandleErrors';
import { useAuth } from '../../auth/AuthContext';

function EditSetting<TCreation, TRead>(props: EditSettingProps<TCreation, TRead>) {
    const { setUser } = useAuth();

    const [item, setItem] = useState<TCreation>();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function loadItem() {
            axios.get(`${props.url}/${props.itemId}`)
                .then((response: AxiosResponse<TRead>) => {
                    setItem(props.transform(response.data));
                })
                .catch(function(errors) {
                    HandleErrors(errors, setUser, setError);
                });
        }

        loadItem();
    }, [props.itemId]);

    async function edit(upSetting: TCreation): Promise<number> {
        const status = axios.put(`${props.url}`, upSetting)
            .then((response: AxiosResponse) => {
                setError("");
                return response.status;
            })
            .catch(function(errors) {
                HandleErrors(errors, setUser, setError);
                return errors.response.status;
            });

        return status;
    }

    function buttons(itemId: number, duplicate: () => void, deleteCallBack: () => void, close: () => void): ReactElement {
        async function handleDelete(id: number): Promise<void> {
            axios.delete(`${props.url}/${id}`)
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        deleteCallBack();
                    }
                })
                .catch(function(errors) {
                    HandleErrors(errors, setUser, setError);
                });
        }

        return (
            <div className='form-actions-buttons four-buttons'>
                <button className="action delete" type='button' onClick={() => ConfirmAlert(() => handleDelete(itemId))}><RiDeleteBin5Fill /></button>
                <button className="action" type='button' onClick={duplicate}><IoDuplicateSharp /></button>
                <button type='submit'>Salvar</button>
                <button type='button' className='back' onClick={close}>Fechar</button>
            </div>
        );
    }
    

    return (
        <>
        {item ? props.children(item, edit, buttons) : <Loading />}
        <DisplayErrors error={error} />
        </>
    );
}

interface EditSettingProps<TCreation, TRead> {
    url: string;
    itemId: number;
    transform(item: TRead): TCreation;
    children(item: TCreation, edit: (upSetting: TCreation) => Promise<number>, buttons: (itemId: number, duplicate: () => void, deleteCallBack: () => void, close: () => void) => ReactElement): ReactElement;
}

export default EditSetting;