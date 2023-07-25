import { ReactElement } from "react";
import Loading from "../utils/Loading";

function List(props: ListProps) {
    if (!props.list) {
        return props.customLoading ? props.customLoading : <Loading />
    } else if (props.list.length === 0) {
        return props.emptyList ? props.emptyList : <>Não há elementos para mostrar</>;
    } else 
        return props.children;
}

interface ListProps {
    list: any;
    customLoading?: ReactElement;
    emptyList?: ReactElement;
    children: ReactElement;
}

export default List;