import { ReactElement, ReactNode, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { NavLink } from "react-router-dom";

import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import { EmptyList } from "../../utils/EmptyComponents";

import RecordsPerPageSelect from "../../utils/pagination/RecordsPerPageSelect";
import Pagination from "../../utils/pagination/Pagination";
import ConfirmAlert from "../../utils/alerts/ConfirmAlert";
import DisplayErrors from "../../utils/alerts/DisplayErros";

import '../styles/BoxIndexStyles.css';
import '../styles/IndexItems.css';

import { IDevice } from "../../shared/devices/devices.model";
import { LoadingList } from "../../utils/Loading";
import { IndexAction } from "../models/enums";
import { IndexDTO } from "../models/index.model";
import { SearchDTO, SearchModel } from "../../shared/search-input/search.model";
import { loadFilter } from "../functions/loadFilter";
import { loadData } from "../functions/loadData";
import Filter from "./Filter";
import List from "../List";
import HandleErrors from "../../utils/functions/HandleErrors";
import { useAuth } from "../../auth/AuthContext";
import { IoDuplicate } from "react-icons/io5";

const rpp: number = 20; // Records Per Page

function Index<T, TFilter>(props: IndexProps<T, TFilter>) {
    const { setUser } = useAuth();

    const [items, setItems] = useState<T[] | undefined>(undefined);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState<number>(0);
    const [recordsPerPage, setRecordsPerPage] = useState<number>(rpp);
    const [page, setPage] = useState<number>(1);
    const [extra, setExtra] = useState<TFilter | null>(null);
    const [searches, setSearches] = useState<SearchDTO[]>([]);
    const [action, setAction] = useState<number>(0);
    const [errors, setErrors] = useState<string>("");

    function setIndexItems(indexTotal: IndexDTO<T>): void {
        if (indexTotal.items && indexTotal.items.length === 0 && page > 1) {
            setPage(1);
        }

        setTotalAmountOfPages(indexTotal.totalAmount);
        setItems(indexTotal.items);
        
        setAction(indexTotal.action);
    }

    function setFilter(searches: SearchDTO[], extra: TFilter | null): void {
        setExtra(extra);
        setSearches(searches);
    }

    function getDuplicateUrl(editUrl: string, id: number): string {
        let duplicateUrl = "/";
        let editSplit = editUrl.split("/");

        editSplit.forEach(s => {
            if (isNaN(parseInt(s)) && s != "edit" && s.length > 0) {
                duplicateUrl += s + "/";
            }
        });

        duplicateUrl += "create/" + id;

        return duplicateUrl;
    }

    function buttons(editUrl: string, id: number, alertText: string, alertTitle: string): ReactElement {
        async function deleteEntity(id: number): Promise<void> {
            axios.delete(`${props.tab.url}/${id}`, { timeout: 3000 })
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        if (items && items.length === 1 && page > 1) {
                            setPage(page - 1);
                        }

                        if (action === IndexAction.filtering)
                            loadFilter<T, TFilter>(
                                props.tab.url,
                                page,
                                recordsPerPage,
                                searches,
                                extra,
                                setIndexItems,
                                setUser,
                                setErrors
                            );
                        else if (action === IndexAction.loading)
                            loadData<T>(
                                props.tab.url,
                                page,
                                recordsPerPage,
                                setIndexItems,
                                setUser,
                                setErrors
                            );

                        if (props.toggleRefresh)
                            props.toggleRefresh();
                    }
                })
                .catch(function(errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        } 

        return (
            <div>
                <NavLink to={editUrl}><button className="actions-button edit" title="Editar"><MdEdit /></button></NavLink>
                <NavLink to={getDuplicateUrl(editUrl, id)}><button className="actions-button dup" title="Duplicar"><IoDuplicate /></button></NavLink>
                <button className="actions-button delete" title="Excluir" onClick={() => ConfirmAlert(() => deleteEntity(id), alertTitle, alertText)}>
                    <RiDeleteBin5Fill />
                </button>
            </div>
        );
    }

    function buttonsChild(editUrl: string, id: number, alertText: string, alertTitle: string): ReactElement {
        async function deleteEntity(id: number): Promise<void> {
            axios.delete(`${props.tabChild!.url}/${id}`, { timeout: 3000 })
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        if (items && items.length === 1 && page > 1) {
                            setPage(page - 1);
                        }

                        if (action === IndexAction.filtering)
                            loadFilter<T, TFilter>(
                                props.tab.url,
                                page,
                                recordsPerPage,
                                searches,
                                extra,
                                setIndexItems,
                                setUser,
                                setErrors
                            );
                        else if (action === IndexAction.loading)
                            loadData<T>(
                                props.tab.url,
                                page,
                                recordsPerPage,
                                setIndexItems,
                                setUser,
                                setErrors
                            );

                        if (props.toggleRefresh)
                            props.toggleRefresh();
                    }
                })
                .catch(function(errors) {
                    HandleErrors(errors, setUser, setErrors);
                });
        } 

        return (
            <div>
                {props.tabChild ?
                    <>
                    <NavLink to={editUrl}><button className="actions-button edit" title="Editar"><MdEdit /></button></NavLink>
                    <NavLink to={getDuplicateUrl(editUrl, id)}><button className="actions-button dup" title="Duplicar"><IoDuplicate /></button></NavLink>
                    <button className="actions-button delete" title="Excluir" onClick={() => ConfirmAlert(() => deleteEntity(id), alertTitle, alertText)}>
                        <RiDeleteBin5Fill />
                    </button>
                    </>
                    :
                    <></>
                }
            </div>
        );
    }

    

    return (
        <div className="index-container">
            <Filter<T, TFilter>
                tab={props.tab}
                base={props.baseExtra}
                customNewRedirect={props.customNewRedirect}
                paginate={{ page: page, recordsPerPage: recordsPerPage }}
                options={props.options}
                setErrors={(error) => setErrors(error)}
                setFilterParams={setFilter}
                setItems={setIndexItems}
            >
                {(extra, setExtra) =>
                    <>
                        {props.extraFilterElement(extra, setExtra)} 
                    </>
                }
            </Filter>

            <div className="index-header">
                <RecordsPerPageSelect onChange={perPage => {
                    setItems(undefined);
                    setPage(1);
                    setRecordsPerPage(perPage);
                }} />
                {props.headerOptions?.(searches, extra, { page: page, recordsPerPage: recordsPerPage })}
            </div>

            <List list={items} emptyList={<EmptyList />} customLoading={<LoadingList />}>
                <>
                {props.children(items!, buttons, buttonsChild)}
                <Pagination 
                    currentPage={page} 
                    totalAmountOfPages={totalAmountOfPages}
                    tab={props.tab.css}
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

interface IndexProps<T, TFilter> {
    tab: IDevice;
    tabChild?: IDevice; 
    customNewRedirect?: string;
    baseExtra?: TFilter;
    headerOptions?: (filterList: SearchDTO[], extra: TFilter | null, pagination: { page: number, recordsPerPage: number }) => ReactNode | ReactElement; 
    options: SearchModel[];
    toggleRefresh?: () => void;
    extraFilterElement(extra: TFilter, setExtra: (extra: TFilter, hasToClear?: boolean) => void): ReactElement;
    children(entities: T[], buttons: (editUrl: string, id: number, alertText: string, alertTitle: string) => ReactElement, buttonsChild: (editUrl: string, id: number, alertText: string, alertTitle: string) => ReactElement): ReactElement;
}

export default Index;