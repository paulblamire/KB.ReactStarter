import * as React from 'react';
import * as ReactDom from 'react-dom';

interface IHelloComponentProps {
    message: string;
}

class HelloComponent extends React.Component<IHelloComponentProps, any>{
    render() {
        return <h1>Hello {this.props.message}!</h1>;
    }
}

export function RunApp() {
    ReactDom.render(<HelloComponent message="World" />, document.body);
}