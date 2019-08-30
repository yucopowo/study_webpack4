module.exports = {
    title: 'pdf',
    url: '/pdf',
    template: 'pdf',
    data: {

    },
    entry: {
        pdf: '@pages/pdf/index.js',
        pdf_worker: 'pdfjs-dist/build/pdf.worker.entry'
    }
};
