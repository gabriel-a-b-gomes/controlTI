import { ReactElement, useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import List from "../../components/List";
import DisplayErrors from "../../utils/alerts/DisplayErros";
import { EmptyList } from "../../utils/EmptyComponents";
import { LoadingList } from "../../utils/Loading";
import getPing from "../functions/getPing";
import { PingDTO } from "../models/ping.model";

import '../styles/IndexPingStyles.css';
import { useAuth } from "../../auth/AuthContext";

const orderOptions: OrderByOption[] = [
    { display: 'Código', value: 0 },
    { display: 'Endereço IP', value: 1 },
    { display: 'Tipo de Equipamento', value: 2 },
    { display: 'Status', value: 3 }
];

function IndexPing(props: IndexPingProps) {
    document.title = "Ping - " + props.title;

    const { setUser } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [items, setItems] = useState<PingDTO[]>();
    const [orderBy, setOrderBy] = useState<OrderByOption>({ display: 'Código', value: 0 });
    const [asc, setAsc] = useState<number>(1);
    const [errors, setErrors] = useState<string>('');

    useEffect(() => {
        handleGetPing();
    }, [props.search, orderBy.value, asc]);

    useEffect(() => {
        setItems(undefined);
    }, [props.search]);

    function getOrderOptClass(option: OrderByOption) {
        if (orderBy.value === option.value) return 'active';

        return '';
    }

    function handleGetPing() {
        setLoading(true);
        getPing(
            `${props.baseUrl}/${orderBy.value}/${asc}`,
            props.search,
            setItems,
            setUser,
            setLoading,
            setErrors
        );
    }

    function handleOrderOptClick(option: OrderByOption): void {
        if (orderBy.value === option.value) {
            setAsc(prev => prev === 1 ? 0 : 1);

            return ;
        }

        setOrderBy(option);
        setAsc(1);

        setItems(undefined);
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
        <div className="index-container pings">
            <div className="index-header">
                <div className='index-pings-title '>
                    <div className='indicator' style={{ background: props.color }} />
                    <span>{props.title}</span>
                    <button onClick={handleGetPing} ><IoMdRefresh /></button>
                    {loading && 
                        <div className="dots">
                            <div className="dot-flashing" />
                            <div className="dot-flashing" />
                            <div className="dot-flashing" />
                        </div>
                    }
                </div>
                <div className="order-area">
                    Ordernar: 
                    <div className="dropdown">
                        <button className="choose-order-option" type="button" id="orderoptions" data-bs-toggle="dropdown" aria-expanded="false">
                            <span className="info">
                                {orderBy.display}
                                {asc === 1 ? <TbSortDescending /> : <TbSortAscending />}
                            </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end order-options" aria-labelledby="orderoptions">
                            {orderOptions.map(option => 
                                <li key={option.value + option.display} onClick={() => handleOrderOptClick(option)} className={getOrderOptClass(option)} onKeyUp={e => { handleEnterOption(e) }} tabIndex={0}>
                                    {option.display}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <List list={items} emptyList={<EmptyList />} customLoading={<LoadingList />}>
                <>
                {props.children(items!)}
                </>
            </List>
            <DisplayErrors error={errors} />
        </div>
    );
}

interface IndexPingProps {
    title: string;
    color: string;
    baseUrl: string;
    search: string;
    children(items: PingDTO[]): ReactElement;
}

interface OrderByOption {
    display: string;
    value: number;
}

export default IndexPing;