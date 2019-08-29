import './index.scss';
import axios from 'axios';

(async ()=>{

    const response = await axios.get('/detail/test');

    console.log(response);

})();

