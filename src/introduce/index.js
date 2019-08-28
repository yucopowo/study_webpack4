import 'fullpage.js/dist/fullpage.css';
import './index.scss';
import FullPage from 'fullpage.js';

const licenseKey = "263DXXXX-B839XXXX-AE67XXXX-F398XXXX";
const myFullpage = new FullPage('#fullpage', {
    licenseKey: licenseKey,
    sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff']
});
