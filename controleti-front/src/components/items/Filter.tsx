import { ReactElement, useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

import { IoMdOptions, IoMdSearch, IoMdRefresh } from 'react-icons/io';

import SearchInput from '../../shared/search-input/SearchInput';
import { PaginationDTO } from "../../utils/pagination/pagination.model";

import '../styles/FilterItems.css';

import { IDevice } from "../../shared/devices/devices.model";
import { IndexAction } from "../models/enums";
import { IndexDTO } from "../models/index.model";
import { SearchDTO, SearchModel } from "../../shared/search-input/search.model";
import { loadFilter } from "../functions/loadFilter";
import { loadData } from "../functions/loadData";
import { useAuth } from "../../auth/AuthContext";

function Filter<T, TFilter>(props: FilterProps<T, TFilter>) {
    const { setUser } = useAuth();

    const [extraVisible, setExtraVisible] = useState<boolean>(false);
    const [toggleSearch, setToggleSearch] = useState<boolean>(false);
    const [extra, setExtra] = useState<TFilter | null>(null);
    const [searches, setSearches] = useState<SearchDTO[]>([]);

    useEffect(() => {
        props.setFilterParams(searches, extra);
    }, [searches, extra]);

    useEffect(() => {
        document.title = props.tab.plural;
        handleCommunicationWithServer();
    }, [props.paginate.page, props.paginate.recordsPerPage, searches, extra]);

    function handleCommunicationWithServer(): void {
        if (searches.length > 0 || extra !== null) {
            props.setItems({
                items: undefined,
                totalAmount: 0,
                action: IndexAction.filtering
            });

            loadFilter<T, TFilter>(
                props.tab.url,
                props.paginate.page,
                props.paginate.recordsPerPage,
                searches,
                extra,
                props.setItems,
                setUser,
                props.setErrors
            );
        } else {
            props.setItems({
                items: undefined,
                totalAmount: 0,
                action: IndexAction.loading
            });

            loadData<T>(
                props.tab.url,
                props.paginate.page,
                props.paginate.recordsPerPage,
                props.setItems,
                setUser,
                props.setErrors
            );
        }
    }

    useEffect(() => {
        setExtra(props.base ? props.base : null);
    }, [props.base]);

    function handleSearch(): void {
        setToggleSearch(!toggleSearch);
        handleCommunicationWithServer();
    }
    
    function getExtra(extra: TFilter, hasToClear: boolean = false): void {
        setExtra(extra);

        if (hasToClear) {
            setExtraVisible(false);
        }
    }

    return (
        <div className="filter-container">
            <div className="filter-area">
                <div className="filter-title">
                    <NavLink to={props.customNewRedirect ? props.customNewRedirect : props.tab.to} className="nav-new">
                        <button className="new-button" style={{ background: props.tab.color }} >Novo</button>
                    </NavLink>
                    <span>{props.tab.plural}</span>
                    <button className="refresh-button" onClick={handleCommunicationWithServer} title="Atualizar">
                        <IoMdRefresh size={22} />
                    </button>
                </div>
                <div className="filter-search">
                    <button className={`options ${extraVisible && "active" }`} title='Filtrar' onClick={() => setExtraVisible(!extraVisible)}>
                        <IoMdOptions size={20} />
                    </button>
                    <button className="search-button" title="Pesquisar" onClick={() => handleSearch()}><IoMdSearch size={20} /></button>
                    <div className="container-search">
                        <SearchInput 
                            toggleGetSearchList={toggleSearch}
                            options={[{ display: 'Procurar por...', value: '', placeholder: 'Selecione o que quer pesquisar' }, ...props.options]}
                            setSearchList={searchList => {
                                setSearches(searchList);
                            }} 
                        />
                    </div>
                </div>
            </div>
            {extraVisible &&
                <div className="filter-extra">{props.children(extra!, getExtra)}</div>
            }
        </div>
    );
}

interface FilterProps<T, TFilter> {
    tab: IDevice;
    base?: TFilter;
    customNewRedirect?: string; 
    options: SearchModel[];
    paginate: PaginationDTO;
    setErrors(errors: string): void;
    setFilterParams(searches: SearchDTO[], extra: TFilter | null): void
    setItems(searching: IndexDTO<T>): void;
    children(extra: TFilter, setExtra: (extra: TFilter, hasToClear?: boolean) => void): ReactElement;
}

export default Filter;