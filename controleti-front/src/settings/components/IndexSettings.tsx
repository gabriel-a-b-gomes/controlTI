import { useState, useEffect, ReactElement } from 'react';

import axios, { AxiosResponse } from 'axios';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import { EmptyList } from '../../utils/EmptyComponents';

import Pagination from "../../utils/pagination/Pagination";
import RecordsPerPageSelect from "../../utils/pagination/RecordsPerPageSelect";
import List from '../../components/List';
import ConfirmAlert from '../../utils/alerts/ConfirmAlert';
import DisplayErrors from '../../utils/alerts/DisplayErros';

import '../styles/IndexSettings.css'
import SearchInput from '../../shared/search-input/SearchInput';
import { SearchDTO, SearchModel } from '../../shared/search-input/search.model';
import { IoMdRefresh, IoMdSearch } from 'react-icons/io';
import filterSettings from '../functions/filterSettings';
import loadSettings from '../functions/loadSettings';
import HandleErrors from '../../utils/functions/HandleErrors';
import { useAuth } from '../../auth/AuthContext';

const rpp: number = 20;

function IndexSettings<T>(props: IndexSettingsProps<T>) {
    document.title = props.title;

    const { setUser } = useAuth();

    const [toggleSearch, setToggleSearch] = useState<boolean>(false);
    const [searches, setSearches] = useState<SearchDTO[]>();

    const [items, setItems] = useState<T[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(rpp);
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        handleSettings()
    }, [recordsPerPage, page, searches?.length, props.toggle]);

    function handleSettings() {
        setItems(undefined);
        setTotalAmountOfPages(0);
        if (searches && searches.length > 0) {
            filterSettings<T>(
                props.url,
                { page: page, recordsPerPage: recordsPerPage },
                searches,
                setTotalAmountOfPages,
                setItems,
                setUser,
                setError
            )
        } else {
            loadSettings<T>(
                props.url,
                { page: page, recordsPerPage: recordsPerPage },
                setTotalAmountOfPages,
                setItems,
                setUser,
                setError
            )
        }
    }

    function buttons(edit: () => void, id: number, alertText: string, alertTitle: string): ReactElement {
        async function deleteEntity(id: number): Promise<void> {
            axios.delete(`${props.url}/${id}`, { timeout: 3000 })
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        if (items && items.length === 1 && page > 1) {
                            setPage(page - 1);
                        }
                        handleSettings();
                    }
                })
                .catch(function(errors) {
                    HandleErrors(errors, setUser, setError);
                });
        } 

        return (
            <div>
                <button className="actions-button edit" title="Editar" onClick={() => edit()}><MdEdit /></button>
                <button className="actions-button delete" title="Excluir" onClick={() => ConfirmAlert(() => deleteEntity(id), alertTitle, alertText)}>
                    <RiDeleteBin5Fill />
                </button>
            </div>
        );
    }

    return (
        <div className='settings-index-container'>
            <div className='settings-index-area'>
                <div className='settings-index-header'>
                    <span>{props.title} <button onClick={handleSettings} ><IoMdRefresh /></button></span>
                    <button className='add' onClick={() => props.create()}>+</button>
                </div>
                <div className='search-settings'>
                    <SearchInput placeholder="Pesquisar..." 
                        options={[{ display: 'Procurar por...', value: '', placeholder: 'Selecione o que quer pesquisar' }, ...props.options]}
                        setSearchList={(list) => setSearches(list)} toggleGetSearchList={toggleSearch} defaultOptionSelected={props.defaultOptionSelected} 
                    />
                    <button className="search-settings-button" title="Pesquisar" onClick={() => { setToggleSearch(prev => !prev); handleSettings(); }}><IoMdSearch size={20} /></button>
                </div>
                <div className='settings-index-body'>
                    <List list={items} emptyList={<EmptyList />}>
                        <table className='table'>
                            {props.children(items!, buttons)}
                        </table>
                    </List>
                </div>
                <div className='settings-index-bottom'>
                    <RecordsPerPageSelect onChange={perPage => {
                        setPage(1);
                        setRecordsPerPage(perPage);
                    }} />
                    <Pagination 
                        currentPage={page} 
                        totalAmountOfPages={totalAmountOfPages}
                        onChange={newPage => setPage(newPage)} 
                    />
                </div>
            </div>
            <DisplayErrors error={error} />
        </div>
    );
}

interface IndexSettingsProps<T> {
    title: string;
    url: string;
    toggle: boolean;
    options: SearchModel[];
    defaultOptionSelected?: number;
    create(): void;
    children(entities: T[], buttons: (editUrl: () => void, id: number, alertText: string, alertTitle: string) => ReactElement): ReactElement;
}

export default IndexSettings;