import React,{ useEffect, useRef, useState } from "react";
import { MdOutlineCropSquare } from "react-icons/md";
import { TbSquareCheck } from "react-icons/tb";

import { Claims } from "../models/user.model";

import '../styles/MultiSelectUserStyles.css';


function MultiSelectorClaims(props: MultiSelectorClaimsProps) {
    const dropdownRef = useRef<null | HTMLDivElement>(null);

    const [selectedClaims, setSelectedClaims] = useState<Claims[]>([]);

    useEffect(() => {
        setSelectedClaims(props.defaultSelectedValues);
    }, [props.defaultSelectedValues]);

    useEffect(() => {
        props.setSelectedClaims(selectedClaims);
    }, [selectedClaims.length]);

    function handleClaimClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>, claim: Claims): void {
        let indexToRemove = -1;

        selectedClaims.forEach((selectedClaim, index) => {
            if (selectedClaim.value === claim.value) {
                indexToRemove = index;

                return ;
            } 
        });

        e.stopPropagation();

        if (indexToRemove >= 0) {
            selectedClaims.splice(indexToRemove, 1);
            setSelectedClaims([...selectedClaims]);
        } else {
            setSelectedClaims(prev => [claim, ...prev]);
        }
        
        props.setSelectedClaims(selectedClaims);
    }

    function handleRemove(index: number): void {
        selectedClaims.splice(index, 1);
        dropdownRef.current?.click();

        setSelectedClaims([...selectedClaims]);
        props.setSelectedClaims(selectedClaims);
    }

    function getClaimClass(claim: Claims): string {
        let classname = 'disable';
        
        selectedClaims.forEach(selectedClaim => {
            if (selectedClaim.value === claim.value) {
                classname = 'selectable';
                return ;
            }
        });

        return classname;
    }

    function handleEnterclaim(e: React.KeyboardEvent<HTMLLIElement>) {
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
        <div className="array-claims-container">
            <label htmlFor="claimsopts" >Acessos</label>
            <div className="dropdown" ref={dropdownRef}>
                <button className="drop-claims-down" type="button" id="claimsopts" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedClaims.length > 0 ?
                        <ul className="array-claims">
                            {selectedClaims.map((field, index) => (
                                <li key={field.value} className="selected-claims">
                                    <span>{field.display}</span>
                                    <button onClick={() => handleRemove(index) } title="Remover" className="array-claim-remove">&times;</button>
                                </li>
                            ))}
                        </ul>
                        : 
                        <span>Selecione os acessos do usuário</span>
                    }
                    <span className="dropdown-toggle ml-10" />
                </button>
                <ul className="dropdown-menu array-select-claims" aria-labelledby="claimsopts">
                    {props.standartClaims.map((claim, key) => {
                        const classname = getClaimClass(claim);
                        return (
                            <li key={claim.value + key} onClick={(e) => handleClaimClick(e, claim)} className={getClaimClass(claim)} onKeyUp={e => { handleEnterclaim(e) }} tabIndex={0} >
                                {classname === 'disable' ? <MdOutlineCropSquare /> : <TbSquareCheck />}<span>{claim.display}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

interface MultiSelectorClaimsProps {
    field: string;
    standartClaims: Claims[];
    defaultSelectedValues: Claims[];
    setSelectedClaims: (selectedClaims: Claims[]) => void;
}

export default MultiSelectorClaims;