const templateStyle = {
    width: '300px',
    height: '500px',

    background: 'gray',
    borderRadius: '16px',
}

const TodoTemplate = ({ children }) => {
    return (
        <>
            <div style={templateStyle}>{ children }</div>
        </>
    );
}

export default TodoTemplate;