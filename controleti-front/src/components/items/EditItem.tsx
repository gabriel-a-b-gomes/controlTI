import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

import { LoadingForm } from '../../utils/Loading';
import FormActionEdit from '../../formshook/actions/FormActionEdit';
import HandleErrors from '../../utils/functions/HandleErrors';
import { useAuth } from '../../auth/AuthContext';

function EditItem<TCreation, TRead>(props: EditItemProps<TCreation, TRead>) {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const { itemId } = useParams();
    const [item, setItem] = useState<TCreation>();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function loadItem() {
            axios.get(`${props.url}/${itemId}`)
                .then((response: AxiosResponse<TRead>) => {
                    setItem(props.transform(response.data));
                })
                .catch(function(errors) {
                    HandleErrors(errors, setUser, setError);
                });
        }

        loadItem();
    }, [itemId]);
    

    async function edit(upItem: TCreation): Promise<number> {
        const status = axios.put(`${props.url}`, upItem)
            .then((response: AxiosResponse) => {
                setError("");
                return response.status;
            })
            .catch(function(errors) {
                HandleErrors(errors, setUser, setError)
                return errors.response.status;
            });

        return status;
    }

    function buttons(duplicateTo: string, itemId: number): ReactElement {
        async function handleDelete(id: number): Promise<void> {
            axios.delete(`${props.url}/${id}`)
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        navigate(props.indexUrl);
                    }
                })
                .catch(function(errors) {
                    HandleErrors(errors, setUser, setError);
                });
        }

        return (
            <FormActionEdit duplicateTo={`${duplicateTo}/${itemId}`} handleDelete={() => handleDelete(itemId)} />
        );
    }
    

    return (
        <>
        {item ? props.children(item, edit, buttons, error) : <LoadingForm />}
        </>
    );
}

interface EditItemProps<TCreation, TRead> {
    url: string;
    indexUrl: string;
    transform(item: TRead): TCreation;
    children(item: TCreation, edit: (upItem: TCreation) => Promise<number>, buttons: (duplicateTo: string, itemId: number) => ReactElement, error: string): ReactElement;
}

export default EditItem;