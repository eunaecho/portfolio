const headStyle = {
    paddingTop: '25px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingBottom: '25px',
    borderBottom : '2px solid #DB7093',
    width: '90%',
    textAlign: 'center',
}

const h1Style = {
    margin:0,
    fontSize: '28px',
    color: 'gray',
    textAlign: 'left'
}

const TodoHead = () => {
    function callDoneList() {
        console.log('DONE LIST');
    }

    return (
            <div style={headStyle}>
                <h1 style={h1Style} onClick={callDoneList}> TO DO LIST </h1>
            </div>
    );
}

export default TodoHead;