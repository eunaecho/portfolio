import React, { useCallback, useContext } from "react";
import { CODE, CELL_STATUS, TableContext } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return { background: '#444'};
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return { background: 'white'};
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return { background: 'yellow'};
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return { background: 'red'};
        default:
            return { background: 'white'};
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.MINE:
            return '!';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '?';
        default:
            return code || '';
    }
};

const Td = ({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if(halted) 
            return;
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
            case CODE.NORMAL:
                dispatch({ type: CELL_STATUS.OPEN_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CELL_STATUS.CLICK_MINE, row: rowIndex, cell: cellIndex });
                return;            
        }
    }, [tableData[rowIndex][cellIndex]]);

    // 마우스 오른쪽 클릭
    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if(halted)
            return;
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: CELL_STATUS.FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: CELL_STATUS.NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: CELL_STATUS.QUESTION_CELL, row: rowIndex, cell: cellIndex });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex]]);

    return (
        <td style = {getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
            {getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;