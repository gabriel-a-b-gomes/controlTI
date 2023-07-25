import React,{ useEffect, useRef, useState } from "react";
import { MdOutlineCropSquare } from "react-icons/md";
import { TbSquareCheck } from "react-icons/tb";

import "./styles/FormMultiSelectStyles.css";
import { selectOptions } from "./models/form.model";

function MultiSelect(props: MultiSelectProps) {
    const dropdownRef = useRef<null | HTMLDivElement>(null);

    const [selectedPool, setSelectedPool] = useState<selectOptions[]>([]);

    useEffect(() => {
        setSelectedPool(props.selected);
    }, [props.selected.length]);

    useEffect(() => {
        props.setSelectedPool(selectedPool);
    }, [selectedPool.length]);

    function handleSelectClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>, selectedValue: selectOptions): void {
        let indexToRemove = -1;

        selectedPool.forEach((inSelect, index) => {
            if (inSelect.value === selectedValue.value) {
                indexToRemove = index;

                return ;
            } 
        });

        e.stopPropagation();

        if (indexToRemove >= 0) {
            selectedPool.splice(indexToRemove, 1);
            setSelectedPool([...selectedPool]);
        } else {
            setSelectedPool(prev => [selectedValue, ...prev]);
        }
    }

    function handleRemove(index: number): void {
        selectedPool.splice(index, 1);
        dropdownRef.current?.click();

        setSelectedPool([...selectedPool]);
    }

    function handleClear() {
        setSelectedPool([]);
        dropdownRef.current?.click();
    }

    function getObjClass(selectedValue: selectOptions): string {
        let classname = 'disable';
        
        selectedPool.forEach(inSelect => {
            if (inSelect.value === selectedValue.value) {
                classname = 'selectable';
                return ;
            }
        });

        return classname;
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
        <div className="array-multi-select-container">
            <div className="multi-label">
                <label htmlFor="multi-selectopts" >{props.displayName}</label>
                <button type="button" onClick={handleClear}>
                    Limpar
                </button>
            </div>
            <div className="dropdown" ref={dropdownRef}>
                <button className="drop-multi-select-down" type="button" id="multi-selectopts" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedPool.length > 0 ?
                        <ul className="array-multi-selected">
                            {selectedPool.map((field, index) => (
                                <li key={field.value} className="selected-option">
                                    <span>{field.display}</span>
                                    <button onClick={() => handleRemove(index) } title="Remover" className="selected-remove">&times;</button>
                                </li>
                            ))}
                        </ul>
                        : 
                        <span>{props.placeholder}</span>
                    }
                    <span className="dropdown-toggle ml-10"  />
                </button>
                <ul className="dropdown-menu array-select-multi-select" aria-labelledby="multi-selectopts">
                    {props.options.map((option, key) => {
                        const classname = getObjClass(option);
                        return (
                            <li key={option.value + key} onClick={(e) => handleSelectClick(e, option)} className={getObjClass(option)} onKeyUp={e => { handleEnterOption(e) }} tabIndex={0} >
                                {classname === 'disable' ? <MdOutlineCropSquare /> : <TbSquareCheck />}<span>{option.display}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

interface MultiSelectProps {
    displayName: string;
    placeholder: string;
    options: selectOptions[];
    selected: selectOptions[];
    setSelectedPool: (selectedPool: selectOptions[]) => void;
}

export default MultiSelect;