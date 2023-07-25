import { useEffect, useRef, useState } from "react";
import { TbSquareX } from 'react-icons/tb';
import { SearchDTO, SearchModel } from "./search.model";

import './SearchInputStyles.css';

function SearchInput(props: SearchInputProps) {
    const searchbox = useRef<null | HTMLInputElement>(null);
    const optionPicker = useRef<null | HTMLButtonElement>(null);
    
    const [search, setSearch] = useState<string>("");
    const [attributte, setAttributte] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("");
    const [display, setDisplay] = useState<string>("");
    const [searches, setSearches] = useState<SearchDTO[]>([]);

    useEffect(() => {
        if (props.options.length > 0) {
            handleClear();
        }
    }, [props.options.length]);

    useEffect(() => {
        addSearch();
    }, [props.toggleGetSearchList]);

    function handleClear() {
        setSearch("");
        setAttributte(props.options[props.defaultOptionSelected ? props.defaultOptionSelected : 0].value);
        setPlaceholder(props.options[props.defaultOptionSelected ? props.defaultOptionSelected : 0].placeholder);
        setDisplay(props.options[props.defaultOptionSelected ? props.defaultOptionSelected : 0].display);
        
        optionPicker.current?.focus();
    }

    function addSearch() {
        if (search.length > 1) {
            setSearches([{ search, attributte, display }, ...searches]);
            handleClear();
        }
    }

    function handleSearch(key: string) {
        if (key === 'Enter') {
            addSearch();
        }
    }    

    useEffect(() => {
        props.setSearchList(searches);
    }, [searches.length]);

    function handleDeleteSearch(id: number) {
        searches.splice(id, 1);

        searchbox.current?.focus();

        setSearches([...searches]);
        props.setSearchList(searches);
    }

    function handleFillSearch(id: number) {
        setSearch(searches[id].search);
        setAttributte(searches[id].attributte);
        setDisplay(searches[id].display);
        
        handleDeleteSearch(id);
    }

    function getOptionClass(option: SearchModel) {
        if (attributte === option.value) return 'active';

        return '';
    }

    function handleOptionClick(option: SearchModel) {
        setAttributte(option.value); 
        setPlaceholder(option.placeholder); 
        setDisplay(option.display);

        searchbox.current?.focus();
    }

    function handleEnterOption(e: React.KeyboardEvent<HTMLLIElement>) {
        if (e.key === 'Enter') {
            e.currentTarget.click();
        }

        if (e.key === 'ArrowDown') {
            e.currentTarget.nextSibling && (e.currentTarget.nextSibling as HTMLLIElement).focus();
        }
        if (e.key === 'ArrowUp') {
            e.currentTarget.previousSibling && (e.currentTarget.previousSibling as HTMLLIElement).focus();
        }
    }

    return (
        <>
        <div className="search-container"> 
            <div className="dropdown items">
                {searches && searches.length > 0 &&
                    <>
                    <button className="choose-filter-option search-drop" type="button" id="itemssearched" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                        <span>{searches.length} B: {searches[0].search}</span>
                        <span className="dropdown-toggle ml-10" />
                    </button>
                    <ul className="dropdown-menu search-items" aria-labelledby="itemssearched">
                        {searches.map((schDto, key) => 
                            <li key={schDto.search + schDto.attributte + key} onDoubleClick={() => handleFillSearch(key)} title='Clique duas vezes para editar'>
                                <span>{schDto.search}<span className="search-details">:{" "}{schDto.display.toLowerCase()}</span></span>
                                <button onClick={() => handleDeleteSearch(key)} title="Excluir da lista de busca" ><TbSquareX size={16} /></button>
                            </li>    
                        )}
                    </ul>
                    </>
                }
            </div>
            <input type="text" 
                ref={searchbox}
                value={search} 
                placeholder={placeholder}
                onKeyUp={e => { handleSearch(e.key) }}
                onChange={e => { setSearch(e.target.value) }} 
                readOnly={attributte === props.options[0].value}
            />
            <div className="dropdown">
                <button ref={optionPicker} className="choose-filter-option select-search" type="button" id="filteroptions" data-bs-toggle="dropdown" aria-expanded="false">
                    {":"}
                    <span>{display}</span>
                    <span className="dropdown-toggle ml-10" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end filter-options" aria-labelledby="filteroptions">
                    {props.options.map((option, key) =>
                        <li key={option.value + key} onClick={() => handleOptionClick(option)} className={getOptionClass(option)} onKeyUp={e => { handleEnterOption(e) }} tabIndex={0} >
                            {option.display}
                        </li>
                    )}
                </ul>
            </div>
            {search?.length > 1 &&
                <button className="add-search-button" onClick={() => addSearch()}>+</button>
            }
        </div>
        {searches?.length > 0 &&
            <button className="close-all-button" onClick={() => { setSearches([]); handleClear(); }}>&times;</button>
        }
        </>
    );
}  

interface SearchInputProps {
    placeholder?: string;
    options: SearchModel[];
    toggleGetSearchList: boolean;
    defaultOptionSelected?: number;
    setSearchList(searchList: SearchDTO[]): void;
}

SearchInput.defaultProps = {
    placeholder: 'Pesquisar...',
    defaultOptionSelected: 0
}

export default SearchInput;