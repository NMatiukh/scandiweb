import 'antd/dist/antd.min.css'
import {createRoot} from "react-dom/client";
import Main from "./Main";
import {Provider} from "react-redux";
import store from "./redux/store";

const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Main/>
    </Provider>
);
