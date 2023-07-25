import axios, { AxiosResponse } from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormActionCreate from '../../formshook/actions/FormActionCreate';
import { LoadingForm } from '../../utils/Loading';
import HandleErrors from '../../utils/functions/HandleErrors';
import { useAuth } from '../../auth/AuthContext';

function CreateItem<TCreation, TRead>(props: CreateItemProps<TCreation, TRead>) {
    const { setUser } = useAuth();

    const { duplicateId } = useParams();
    const [isDuplicating, setIsDuplicating] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        async function loadDuplicateItem() {
            axios.get(`${props.url}/${duplicateId}`)
                .then((response: AxiosResponse<TRead>) => {
                    props.transform(response.data);
                }).catch(function(errors) {
                    HandleErrors(errors, setUser, setError);
                });
        }

        if (duplicateId) {
            setIsDuplicating(true);
            loadDuplicateItem();
            setIsDuplicating(false);
        }
    }, [duplicateId]);

    async function create(newItem: TCreation): Promise<number> {
        const status = await axios.post(`${props.url}`, 
            newItem
        )
            .then((response: AxiosResponse) => {
                setError("");
                return response.status;
            }).catch(function (errors) {
                HandleErrors(errors, setUser, setError);

                return errors.response.status;
            });

        return status;
    }

    function buttons(reset: () => void): ReactElement {
        return (
            <FormActionCreate handleClear={reset} />
        );
    }

    return (
        <>
        {(duplicateId && !isDuplicating) || !duplicateId ? props.children(create, buttons, error) : <LoadingForm />}
        </>
    );
}

interface CreateItemProps<TCreation, TRead> {
    url: string;
    transform(read: TRead): void;
    children(create: (newItem: TCreation) => Promise<number>, buttons: (reset: () => void) => ReactElement, error: string): ReactElement;
}

export default CreateItem;