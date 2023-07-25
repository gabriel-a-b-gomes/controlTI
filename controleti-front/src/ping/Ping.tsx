import { ReactElement, useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdClear } from "react-icons/md";
import PingComputers from "./PingComputers";
import PingGeneral from "./PingGeneral";
import PingRamais from "./PingRamais";

import './styles/PingStyles.css';
import PingServer from "./PingServer";

function Ping() {
    const searchRefInput = useRef<null | HTMLDivElement>(null);

    const [selectedTab, setSelectedTab] = useState<string>('general');
    const [search, setSearch] = useState<string>('');
    const [currentSearch, setCurrentSearch] = useState<string>('');
    const [searchDivClass, setSearchDivClass] = useState<string>('');

    const handleScroll = () => {
        const position = window.pageYOffset;

        if (position > (searchRefInput.current?.scrollTop! + 120)) 
            setSearchDivClass('sticky');
        else 
            setSearchDivClass('');  
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { capture: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function getTabSelected(selectedTab: string, search: string): ReactElement {
        if (selectedTab === 'general') 
            return <PingGeneral search={search} />
        
        if (selectedTab === 'computers') 
            return <PingComputers search={search} />

        if (selectedTab === 'servers') 
            return <PingServer search={search} />

        return <PingRamais search={search} />
    }

    function handleSearch() {
        setSearch(currentSearch);
    }

    function handleClear() {
        setCurrentSearch('');
        setSearch('');
    }

    return (
        <div className="container-ping">
            <div className='tab-ping'>
                <button className={selectedTab === 'general' ? "active" : ""} onClick={() => setSelectedTab('general')}>Geral</button>
                <button className={selectedTab === 'servers' ? "active" : ""} onClick={() => setSelectedTab('servers')}>Servidores</button>
                <button className={selectedTab === 'computers' ? "active" : ""} onClick={() => setSelectedTab('computers')}>Computadores</button>
                <button className={selectedTab === 'ramais' ? "active" : ""} onClick={() => setSelectedTab('ramais')}>Ramais</button>
            </div>
            <div ref={searchRefInput} className={'s-ping ' + searchDivClass}>
                <div className="search-ping">
                    <input type="text" name="search-area" value={currentSearch} placeholder="Pesquise pelo código, ou colaborador, ou departamento do aparelho..."
                        onChange={(e) => setCurrentSearch(e.target.value)} onKeyUp={(e) => e.key === 'Enter' && handleSearch()} 
                    />
                    <button className="search-ping-button" title="Pesquisar" onClick={handleSearch}><IoMdSearch size={20} /></button>
                    <button className="search-ping-button" title="Limpar" onClick={handleClear}><MdClear size={20} /></button>
                </div>
            </div>

            {getTabSelected(selectedTab, search)}
        </div>
    );
}

export default Ping;