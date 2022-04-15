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
    fontSize: '30px',
    color: 'white'
}

const TodoHead = () => {
    return (
            <div style={headStyle}>
                <h1 style={h1Style}> TO DO LIST </h1>
            </div>
    );
}

export default TodoHead;