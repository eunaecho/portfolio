import React from "react";
import { Link } from "react-router-dom";

const TableRow = ( {data} ) => {
    let rowData = data;

    return (
        <tr key={rowData.idx}>
            <td> {rowData.idx}</td>
            <td id={rowData.title}>
                <Link to={`/board/read/${rowData.idx}`}>{rowData.title} { rowData.cnt!==0 ? `[${rowData.cnt}]` : '' }</Link>
            </td>
            <td> {rowData.writer_name} </td>
            <td> {rowData.writedate} </td>
            <td> {rowData.answer_yn} </td>
        </tr>
    );
}

export default TableRow;

// boardList를 state로 넣지 않은 경우에는 나타나지 않음.
// e.target.value => undefined로 나옴 e.target => <td> ~ </td> 임
