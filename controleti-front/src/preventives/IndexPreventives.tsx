import axios, { AxiosResponse } from 'axios';
import { ReactElement, useState, useEffect } from 'react';
import { IoMdInformationCircleOutline, IoMdRefresh } from 'react-icons/io';
import List from '../components/List';
import DisplayErrors from '../utils/alerts/DisplayErros';
import { EmptyPreventive } from '../utils/EmptyComponents';
import { LoadingList } from '../utils/Loading';
import Pagination from '../utils/pagination/Pagination';
import RecordsPerPageSelect from '../utils/pagination/RecordsPerPageSelect';
import filterPreventive from './functions/filterPreventive';
import loadPreventive from './functions/loadPreventive';
import { IPreventive, ItemsPreventive } from './models/preventive.model';

import './styles/PreventivesStyles.css';
import { useAuth } from '../auth/AuthContext';
import HandleErrors from '../utils/functions/HandleErrors';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import ScriptPopover from './components/ScriptPopover';
// import ScriptPopover from './components/ScriptPopover';

const rpp: number = 20; // Records per page

function IndexPreventives<T>(props: IndexPreventivesProps<T>) {
    const { setUser } = useAuth();

    const [items, setItems] = useState<T[] | undefined>(undefined);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(rpp);
    const [page, setPage] = useState<number>(1);
    const [errors, setErrors] = useState<string>("");

    useEffect(() => {
        handleIndexPreventives();
    }, [props.tab.filter.length, page, recordsPerPage]);

    function setIndex(preventives: ItemsPreventive<T>) {
        setItems(preventives.items);
        setTotalAmountOfPages(preventives.pages);
    }

    function handleIndexPreventives() {
        setIndex({ items: undefined, pages: 0 })
        if (props.tab.filter.length > 0) {
            filterPreventive<T>(
                props.tab.device.url, 
                props.area,
                props.tab.filter,
                { page: page, recordsPerPage: recordsPerPage },
                setIndex,
                setUser,
                (errors) => setErrors(errors)
            )
        } else {
            loadPreventive<T>(
                props.tab.device.url, 
                props.area,
                { page: page, recordsPerPage: recordsPerPage }, 
                setIndex,
                setUser,
                (errors) => setErrors(errors)
            )
        }
    }

    async function deletePreventive(id: number, deviceId: number): Promise<void> {
        axios.delete(`${props.tab.device.url}/preventive/${id}?deviceId=${deviceId}`)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    handleIndexPreventives();

                    if (items && items.length === 1 && page > 1) {
                        setPage(page - 1);
                    }
                }
            })
            .catch(function(errors) {
                HandleErrors(errors, setUser, setErrors);
            });
    }

    return (
        <div className="index-container preventives">
            <div className="index-header">
                <div className={'index-preventive-title ' + props.tab.device.css}>
                    <div className='indicator' style={{ background: props.tab.device.color }} />
                    <span>{props.tab.device.plural}</span>
                    <button onClick={handleIndexPreventives} ><IoMdRefresh /></button>
                </div>
                <div className='index-header-prev-options'>
                    <div className='scripts-area'>
                        <button className='procedure' style={{ color: props.tab.device.color }}>
                            Procedimento<IoMdInformationCircleOutline />
                        </button>
                        <ScriptPopover color={props.tab.device.color} scripts={props.script} />
                    </div>
                    <RecordsPerPageSelect onChange={perPage => {
                        setItems(undefined);
                        setPage(1);
                        setRecordsPerPage(perPage);
                    }} />
                </div>
            </div>

            <List list={items} emptyList={<EmptyPreventive text={props.emptyText} />} customLoading={<LoadingList />}>
                <>
                {props.children(items!, deletePreventive, handleIndexPreventives, setErrors)}
                <Pagination 
                    currentPage={page} 
                    totalAmountOfPages={totalAmountOfPages}
                    tab={props.tab.device.css}
                    onChange={newPage => {
                        setItems(undefined);  
                        setPage(newPage);
                    }} 
                />
                </>
            </List>
            <DisplayErrors error={errors} />
        </div>
    );
}


interface IndexPreventivesProps<T> {
    tab: IPreventive;
    area: string;
    emptyText: string;
    script: string[];
    tempItems?: T[];
    children(entities: T[], deleteEntity: (id: number, deviceId: number) => void, refresh: () => void, setError: (error: string) => void): ReactElement;
}

export interface ActionPreventive {
    buttons: ReactElement;
    actionsfield: ReactElement;
}

export default IndexPreventives;