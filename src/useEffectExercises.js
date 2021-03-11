import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom'

const App = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true)

    if(visible) {
        return (
            <div>
                <button
                    onClick={() => setValue((v) => v + 1)}
                >+</button>
                <button
                    onClick={() => setVisible(false)}
                >Hide</button>
                <Notification />
            </div>
        );
    } else {
        return (<button
            onClick={() => setVisible(true)}>
            show
        </button>)
    }

}

const HookCounter = ({ value }) => {

    useEffect(() => {
        console.log('only one time');
        return () => console.log('unmount');
    }, []);

    useEffect(() => {
        console.log('update')
    }, [value]);

    return <p> {value} </p>
}

const Notification = () => {

    const [ visible, setVisible ] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(
            () => setVisible(false), 1500);
        return () => clearTimeout()
    }, [])


    return (
        <div>
            { visible && <p>Hello!</p> }
        </div>
    );
}

ReactDOM.render(<App />,
    document.getElementById('root'));