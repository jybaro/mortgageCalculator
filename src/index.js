import { init } from './init';
import './css/index.scss';


init(document);

if (module.hot) {
    module.hot.accept('./index.js', () => {
    });
}
