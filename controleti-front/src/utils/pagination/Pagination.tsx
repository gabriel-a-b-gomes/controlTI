import { useState, useEffect, ReactElement } from "react";
import { MdFirstPage, MdNavigateBefore, MdNavigateNext, MdLastPage } from 'react-icons/md';

import './Pagination.css';

function Pagination(props: PaginationProps) {
    const [linkModels, setLinkModels] = useState<LinkModel[]>([]);

    function select(link: LinkModel) {
        if (link.page === props.currentPage) return ;
        if (!link.enable) return ;

        props.onChange(link.page);
    }

    function getLinkClass(link: LinkModel) {
        if (link.active) return `active ${props.tab}`;
        if (!link.enable) return "disable";

        return "pointer";
    }

    useEffect(() => {
        const links: LinkModel[] = [];

        const enFirstPage = props.currentPage !== 1 && props.totalAmountOfPages > 0;
        const firstPage = 1;

        links.push({
            text: <MdFirstPage size={18} />,
            key: '<<',
            enable: enFirstPage,
            page: firstPage,
            active: false
        });

        const enPreviousPage = props.currentPage !== 1 && props.totalAmountOfPages > 0;
        const prevPage = props.currentPage - 1;

        links.push({
            text: <MdNavigateBefore size={18} />,
            key: '<',
            enable: enPreviousPage,
            page: prevPage,
            active: false
        });

        let starts = props.currentPage - props.radio > 1 ? props.currentPage - props.radio : 1;
        let finish = props.currentPage + props.radio < props.totalAmountOfPages ? props.currentPage + props.radio : props.totalAmountOfPages;

        if (props.currentPage === 1) {
            finish = finish + props.radio <= props.totalAmountOfPages ? finish + props.radio : finish;
        } else if (props.currentPage === props.totalAmountOfPages) {
            starts = starts - props.radio >= 1 ? starts - props.radio : starts;
        }

        for (let i = starts; i <= finish; i++) {
            links.push({
                text: <>{i}</>,
                key: `${i}`,
                enable: true,
                page: i,
                active: props.currentPage === i
            });
        }

        const enNextPage = props.currentPage !== props.totalAmountOfPages && props.totalAmountOfPages > 0;
        const nextPage = props.currentPage + 1;

        links.push({
            text: <MdNavigateNext size={18} />,
            key: '>',
            enable: enNextPage,
            page: nextPage,
            active: false
        });

        const enLastPage = props.currentPage !== props.totalAmountOfPages && props.totalAmountOfPages > 0;
        const lastPage = props.totalAmountOfPages;

        links.push({
            text: <MdLastPage size={18} />,
            key: '>>',
            enable: enLastPage,
            page: lastPage,
            active: false
        });
        
        setLinkModels(links);
    }, [props.currentPage, props.radio, props.totalAmountOfPages]);

    return (
        <nav>
            <ul className="pagination">
                {linkModels.map(link => 
                    <li key={link.key} onClick={() => select(link)} className={`link-item ${getLinkClass(link)}`}>
                        <span className="link-item-text">{link.text}</span>
                    </li>
                )}
            </ul>
        </nav>
    );
}

interface LinkModel {
    page: number;
    key: string;
    enable: boolean;
    text: ReactElement;
    active: boolean;
}

interface PaginationProps {
    currentPage: number;
    totalAmountOfPages: number;
    radio: number;
    tab?: string;
    onChange(page: number): void;
}

Pagination.defaultProps = {
    radio: 2
}

export default Pagination;