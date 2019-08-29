import './index.scss';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

console.log(videojs);

const player = videojs(document.getElementById('my-video'),
    { /* Options */ }, function() {
    console.log('Good to go!');

    // this.play(); // if you don't trust autoplay for some reason
    //
    // // How about an event listener?
    // this.on('ended', function() {
    //     console.log('awww...over so soon?');
    // });
});
