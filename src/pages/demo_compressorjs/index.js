import Compressor from 'compressorjs';
import './index.scss';
const URL = window.URL || window.webkitURL;


document.getElementById('original_file').addEventListener('change', (e) => {
    console.log('====================');

    const file = e.target.files[0];

    if (!file) {
        return;
    }

    console.log(file);

    const original_url = URL.createObjectURL(file);
    document.getElementById('original_image').src = original_url;

    new Compressor(file, {
        quality: 0.5,
        success(result) {

            //
            console.log(result);

            const compressed_url = URL.createObjectURL(result);
            document.getElementById('compressed_image').src = compressed_url;


            // const formData = new FormData();

            // The third parameter is required for server
            // formData.append('file', result, result.name);



            //
            // // Send the compressed image file to server with XMLHttpRequest.
            // axios.post('/path/to/upload', formData).then(() => {
            //     console.log('Upload success');
            // });
        },
        error(err) {
            console.log(err.message);
        },
    });
});
