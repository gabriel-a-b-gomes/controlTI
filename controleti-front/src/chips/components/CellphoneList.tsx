import { ChangeEvent, useEffect, useState } from "react";
import { IoMdSearch } from 'react-icons/io'

import List from "../../components/List";
import { CellPhoneCreationDTO } from "../models/cellphone.model";

import '../styles/CellphoneStyles.css';
import { EmptyList } from "../../utils/EmptyComponents";

function CellphoneList(props: CellphoneListProps) {
    const [search, setSearch] = useState<string>("");
    const [selectedCellPhone, setSelectedCellPhone] = useState<CellPhoneCreationDTO>();
    const [cellphones, setCellphones] = useState<CellPhoneCreationDTO[]>();
    const [displayCell, setDisplayCell] = useState<CellPhoneCreationDTO[]>();

    useEffect(() => {
        setCellphones(props.cellphones);
        setDisplayCell(props.cellphones);
    }, [props.cellphones]);

    useEffect(() => {
        setSelectedCellPhone(props.selectedCellPhone);
    }, [props.selectedCellPhone]);

    function goSearch() {
        var filter = cellphones?.filter(c => c.model.toLowerCase().includes(search.toLowerCase()));

        setDisplayCell(filter);
    }

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    // function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    //     if ((e.charCode || e.keyCode) === 13)
    //         goSearch();
    // }

    function handleSelectedCellPhone(phone: CellPhoneCreationDTO): boolean {
        return phone && 
            phone.model != undefined && phone.model.length > 0 && 
            phone.memorySize != undefined && phone.memorySize > 0 && 
            phone.storageSize != undefined && phone.storageSize > 0 &&
            phone.operationalSystem != undefined && phone.operationalSystem.length > 0 && 
            phone.processingUnit != undefined && phone.processingUnit.length > 0;
    }

    function handleClearSelectedPhone() {
        const base: CellPhoneCreationDTO = {
            model: '',
            memorySize: 0,
            storageSize: 0,
            processingUnit: '',
            operationalSystem: ''
        }

        setSelectedCellPhone(base);
        props.onChangeCellphone(base);
    }

    return (
        <div className="cellphone-container">
            <div className="search-modal-container">
                <input type="text" value={search} onChange={handleSearch} onKeyUp={() => goSearch()} placeholder="Pesquisar por modelo..." />
                <button type='button' onClick={goSearch}><IoMdSearch size={20} /></button>
            </div>
            <List list={displayCell} emptyList={<EmptyList />}>
                <ul className="cellphone-list">
                    {displayCell?.map(cellphone => (
                        <li onClick={() => {
                            setSelectedCellPhone(cellphone);
                            props.onChangeCellphone(cellphone);
                        }}>
                            <div className="cellphone-header-item">
                                <span className="phone-model">{cellphone.model}</span>
                                <span className="phone-spec-size">{cellphone.storageSize}GB, Ram: {cellphone.memorySize}GB</span>
                            </div>
                            <div className="cellphone-body-item">
                                <span>{cellphone.processingUnit}</span>
                                <span>{cellphone.operationalSystem}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </List>
            {selectedCellPhone && handleSelectedCellPhone(selectedCellPhone) &&
                <>
                <h3>Selecionado</h3>
                <div className="selected-cellphone">
                    <div>
                        <span className="phone-model">{selectedCellPhone?.model}</span>
                        <span className="phone-spec">{selectedCellPhone.storageSize}GB, Ram: {selectedCellPhone.memorySize}GB, {selectedCellPhone.operationalSystem}, {selectedCellPhone.processingUnit}</span>
                    </div>
                    <button type='button' onClick={handleClearSelectedPhone}>&times;</button>
                </div>
                </>
            }
        </div>
    );
}

interface CellphoneListProps {
    selectedCellPhone: CellPhoneCreationDTO | undefined;
    cellphones: CellPhoneCreationDTO[];
    onChangeCellphone: (newCellphone: CellPhoneCreationDTO) => void; 
}

export default CellphoneList;