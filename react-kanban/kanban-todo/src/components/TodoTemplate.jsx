const templateStyle = {
    display: 'inline-block',
    margin: '10px',
    width: '300px',
    height: '500px',
    background: '#F5F5F5',
    borderRadius: '16px',
}

//inline-block : 하니까 가로배치 됨

const TodoTemplate = ({ children }) => {
    return (
            <div id='div-todotemplate' style={templateStyle}>{ children }</div>
    );
}

export default TodoTemplate;