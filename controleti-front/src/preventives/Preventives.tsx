import { ReactElement, useState, useRef, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { SearchDTO, SearchModel } from "../shared/search-input/search.model";
import SearchInput from "../shared/search-input/SearchInput";
import IndexDone from "./indexs/IndexDone";
import IndexTODO from "./indexs/IndexTODO";

import './styles/PreventivesStyles.css';
import ReactToPrint from "react-to-print";
import PreventiveReport from "./components/PreventiveReport";
import { PreventiveReportDTO } from "./models/preventive.model";
import axios, { AxiosResponse } from "axios";
import { urlReports } from "../apis/endpoints";
import HandleErrors from "../utils/functions/HandleErrors";
import { useAuth } from "../auth/AuthContext";
import DisplayErrors from "../utils/alerts/DisplayErros";
import ReportModal from "../modals/ReportModal";
import { FiDownload } from "react-icons/fi";
import { MdOutlineRefresh } from "react-icons/md";

const baseReport: PreventiveReportDTO = {
    computersPreventives: {
        preventives: [],
        total: 0,
        doneQtde: 0,
        overdueQtde: 0,
        todoQtde: 0,
        forecastFinish: undefined
    },
    serverPreventives: {
        preventives: [],
        total: 0,
        doneQtde: 0,
        overdueQtde: 0,
        todoQtde: 0,
        forecastFinish: undefined
    },
    nobreakPreventives: {
        preventives: [],
        total: 0,
        doneQtde: 0,
        overdueQtde: 0,
        todoQtde: 0,
        forecastFinish: undefined
    },
    dvrPreventives: {
        preventives: [],
        total: 0,
        doneQtde: 0,
        overdueQtde: 0,
        todoQtde: 0,
        forecastFinish: undefined
    }
}

function Preventives() {
    const { setUser } = useAuth();

    const reportRef = useRef<HTMLDivElement | null>(null);

    const searchRefInput = useRef<null | HTMLDivElement>(null);

    const [selectedTab, setSelectedTab] = useState<string>("todo");
    const [searchList, setSearchList] = useState<SearchDTO[]>([]);
    const [toggleSearch, setToggleSearch] = useState<boolean>(false);
    const [reportContent, setReportContent] = useState<PreventiveReportDTO>();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>();

    document.title = selectedTab === "todo" ? "Preventivas a Fazer" : selectedTab === "done" ? "Preventivas Feitas" : "Preventivas";

    const [filterdivclass, setFilterdivclass] = useState<string>('');

    const handleScroll = () => {
        const position = window.pageYOffset;

        if (position > (searchRefInput.current?.scrollTop! + 120)) 
            setFilterdivclass('sticky');
        else 
            setFilterdivclass('');  
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { capture: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function handleGetDocTitle(): string {
        let now = new Date();

        return "Preventivas_" + now.getDate() + "-" + now.getMonth() + "-" + now.getFullYear() + "_" + now.getHours() + "h" + now.getMinutes();
    }

    function getReportContent() {
        setReportContent(undefined);
        axios.get(`${urlReports}/preventives`)
            .then((response: AxiosResponse<PreventiveReportDTO>) => {
                setReportContent(response.data);
            })
            .catch(function (err) {
                HandleErrors(err, setUser, setErrors);
            });
    }

    function getTabSelected(selectedTab: string, searches: SearchDTO[]): ReactElement {
        const fComputers: string[] = [];
        const fDvrs: string[] = [];
        const fNobreaks: string[] = [];
        const fServers: string[] = [];

        searches.forEach(searchDto => {
            switch(searchDto.attributte) {
                case 'computer':
                    fComputers.push(searchDto.search);
                    break;
                case 'dvr':
                    fDvrs.push(searchDto.search);
                    break;
                case 'nobreak':
                    fNobreaks.push(searchDto.search);
                    break;
                case 'servers':
                    fServers.push(searchDto.search);
                    break;
                default: 
                    break;
            }
        });

        if (selectedTab === 'todo') 
            return <IndexTODO searchesComputer={fComputers} searchesDVR={fDvrs} searchesNobreak={fNobreaks} searchesServers={fServers} />
        
        return <IndexDone searchesComputer={fComputers} searchesDVR={fDvrs} searchesNobreak={fNobreaks} searchesServers={fServers} />
    }

    function handleSearchPreventives(): void {
        setToggleSearch(!toggleSearch);
    }

    const options: SearchModel[] = [
        { display: 'Computador', value: 'computer', placeholder: 'Digite o código do computador, ou colaborador, ou departamento que procura...' },
        { display: 'DVR', value: 'dvr', placeholder: 'Digite o código do DVR que procura...' },
        { display: 'Nobreak', value: 'nobreak', placeholder: 'Digite o código do nobreak que procura...' },
    ];

    return (
        <div className="container-preventives">
            <div className='tab-preventives'>
                <button className={selectedTab === 'todo' ? "active" : ""} onClick={() => {setSelectedTab('todo')}}>Preventivas a Fazer</button>
                <button className={selectedTab === 'done' ? "active" : ""} onClick={() => setSelectedTab('done')}>Preventivas Feitas</button>
            </div>
            <div ref={searchRefInput} className={'f-preventives ' + filterdivclass}>
                <div className="filter-preventives">
                    <button title="Baixar relatórios de preventivas" className="download" onClick={() => { getReportContent(); setOpenModal(true); }}><FiDownload /></button>
                    <div className="container-search-preventives">
                        <SearchInput placeholder="Pesquisar por código do computador, do nobreak ou do dvr..." 
                            options={[{ display: 'Procurar por...', value: '', placeholder: 'Selecione o que quer pesquisar' }, ...options]}
                            setSearchList={(list) => setSearchList(list)} toggleGetSearchList={toggleSearch}     
                        />
                    </div>
                    <button className="search-preventives-button" title="Pesquisar" onClick={() => handleSearchPreventives()}><IoMdSearch size={20} /></button>
                </div>
            </div>
            {getTabSelected(selectedTab, searchList)}
            <DisplayErrors error={errors} />
            <ReportModal 
                title="Preventivas"
                show={openModal}
                onHide={() => setOpenModal(false)}
                icon={<button onClick={getReportContent} className="refresh-report" title="Atualizar relatório de preventivas"><MdOutlineRefresh /></button>}
            >
                <div className="button-reports">
                    {reportContent ?
                        <ReactToPrint
                            documentTitle={handleGetDocTitle()}
                            trigger={() => {
                                return <button className="download-modal-button">Baixar <FiDownload /></button>;
                            }}
                            content={() => reportRef.current}
                        />
                        :
                        <div className="loading-report-preventives">Carregando...</div>
                    }
                    <button className="close-reports" onClick={() => setOpenModal(false)}>Fechar</button>
                </div>
            </ReportModal>
            <div style={{ display: "none" }}>
                <div ref={reportRef}>
                    <PreventiveReport content={reportContent ? reportContent : baseReport} />
                </div>
            </div>
        </div>
    );
}


export default Preventives;