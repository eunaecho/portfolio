import React, { useMemo, createContext, useReducer } from "react";
import Table from "./Table";
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext({
    tableData: [],
    halted: true,
    dispatch: () => {},
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: false,
}

const plantMine = (row, cell, mine) => {
    console.log(":: PlantMine :: ", row, cell, mine );
    const candidate = Array(row * cell).fill().map( (arr, i) => {
        return i;
    });
    const shuffle = [];
    while ( candidate.length > row*cell-mine ) {
        const chosen = candidate.splice( Math.floor( Math.random()*candidate.length ), 1)[0];
        shuffle.push(chosen);
    }
    //Table Data 초기화
    const data = [];
    for (let i=0; i<row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j=0; j<cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    //지뢰 심기
    for( let k=0; k<shuffle.length; k++) {
        const ver = Math.floor(shuffle[k]/cell);
        const hor = shuffle[k]%cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
};

export const CELL_STATUS =  {
    START_GAME: 'START_GAME',
    OPEN_CELL: 'OPEN_CELL',
    CLICK_MINE: 'CLICK_MINE',
    FLAG_CELL: 'FLAG_CELL',
    QUESTION_CELL: 'QUESTION_CELL',
    NORMALIZE_CELL: 'NORMALIZE_CELL',
};

const reducer = (state, action) => {
    switch (action.type) {
        case CELL_STATUS.START_GAME :
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false
            };
        case CELL_STATUS.OPEN_CELL:{
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...state.tableData[i]]
            });

            // 검사한 칸들 
            const checked = [];

            // 내 기준 주변 칸들 검사
            const checkAround = (row, cell) => {
                if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][cell])) {
                    return;
                }
                if ( row<0 || row>=tableData.length || cell<0 || cell>=tableData[0].length ) {
                    return;
                }
                
                if (checked.includes(row + ',' + cell)){
                    return;
                } else {
                    checked.push(row + ',' + cell)
                }
                let around = [];
                if (tableData[row-1]) {
                    around = around.concat(
                        tableData[row-1][cell-1],
                        tableData[row-1][cell],
                        tableData[row-1][cell+1]
                    );
                }
                around = around.concat(
                    tableData[row][cell-1],
                    tableData[row][cell+1]
                );
                if (tableData[row+1]) {
                    around = around.concat(
                        tableData[row+1][cell-1],
                        tableData[row+1][cell],
                        tableData[row+1][cell+1]
                    );
                }
                const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                tableData[row][cell] = count;

                if(count === 0) {
                    const near = [];
                    if ( row-1 > -1) {
                        near.push([row-1, cell-1]);
                        near.push([row-1, cell]);
                        near.push([row-1, cell+1]);
                    }
                    near.push([row, cell-1]);
                    near.push([row, cell+1]);
                    if ( row +1 > tableData.length) {
                        near.push([row+1, cell-1]);
                        near.push([row+1, cell]);
                        near.push([row+1, cell+1]);
                    }
                    near.forEach( (n) => {
                        if(tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    })
                } 
                
            };

            checkAround(action.row, action.cell);

            return{
                ...state,
                tableData
            };
        }
        case CELL_STATUS.CLICK_MINE :{            
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            return{
                ...state,
                tableData,
                halted: true
            };
        }
        case CELL_STATUS.FLAG_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] = CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return{
                ...state,
                tableData,
            };
        }
        case CELL_STATUS.QUESTION_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] = CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return{
                ...state,
                tableData,
            };
        }
        case CELL_STATUS.NORMALIZE_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] = CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return{
                ...state,
                tableData,
            };
        }
        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, halted, timer, result } = state; 

    const value = useMemo(() => ({ tableData:tableData, halted: halted, dispatch }), [tableData]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch; 