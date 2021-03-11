import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <div>
            <HookSwitcher />
        </div>
    )
}

const HookSwitcher = () => {

    const [ color, setColor ] = useState('gray');
    const [ fontSize, setFontSize ] = useState(14);

    return (
        <div style={{ padding: '10px',
            backgroundColor: color, fontSize: `${fontSize}px`}}>
            Hello World
            <button onClick={() => setColor('black')}>
                Dark
            </button>
            <button onClick={() => setColor('gray')}>
                Light
            </button>
            <button onClick={() => setFontSize((s) => s + 60)}>
                +
            </button>
        </div>
    )
}

const Person = () => {
    const [ person, setPerson ] = useState({
        firstName: 'Bob',
        lastName: 'Smith'
    });

    setPerson((person) => {
        return {
            ...person,
            firstName: 'Mike'
        }
    });
}

ReactDOM.render(<App />,
    document.getElementById('root'));
