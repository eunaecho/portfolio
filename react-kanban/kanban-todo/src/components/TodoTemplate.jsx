const templateStyle = {
    width: '300px',
    height: '500px',
    background: '#F5F5F5',
    borderRadius: '16px',
}

const TodoTemplate = ({ children }) => {
    return (
        <div id='div-todotemplate' style={templateStyle}>{ children }</div>
    );
}

export default TodoTemplate;