const headStyle = {
    paddingTop: '25px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingBottom: '25px',
    borderBottom : '1px solid #e9ecef',
}

const h1Style = {
    margin:0,
    fontSize: '30px',
    color: 'white'
}

const TodoHead = () => {
    return (
        <>
            <div style={headStyle}>
                <h1 style={h1Style}> 2022년 4월 11일 </h1>
            </div>

        </>
    );
}

export default TodoHead;