import React from "react";
import ReactDOM from "react-dom";
import TabComponent from './TabComponent/TabComponent.jsx';
import { AppContainer } from 'react-hot-loader';



ReactDOM.render(
    <TabComponent />,
    document.querySelector("#container")
);

if (module.hot) {
    module.hot.accept('./TabComponent/TabComponent.jsx', () => {
        const NewApp = require('./TabComponent/TabComponent.jsx').default
        ReactDOM.render(NewApp)
    });
}