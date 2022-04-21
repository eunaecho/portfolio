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
    textAlign: 'center'
}

const TodoHead = (props) => {
    return (
            <div style={headStyle}>
                <div>
                    <h1 style={h1Style}>{props.title}</h1>
                </div>
            </div>
    );
}

export default TodoHead;