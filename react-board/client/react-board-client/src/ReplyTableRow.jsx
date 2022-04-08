import React from "react";

const ReplyTableRow = ( {data} ) => {
    let rowData = data;

    return (
        <tr key={rowData.idx}>
            <td> {rowData.idx}</td>
            <td> {rowData.writer_name} </td>
            <td> {rowData.writedate} </td>
        </tr>
    );
}

export default ReplyTableRow;