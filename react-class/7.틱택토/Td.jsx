import React, {useCallback} from "react";
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {
        console.log( rowIndex, cellIndex );
        if(cellData) {
            return;
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
        // dispatch({ type: CHANGE_TURN}) -> changeTurn이 일찍돼서 승부가 가려지지 않음
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
};

export default Td;