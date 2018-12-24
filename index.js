const express = require('express');
const next = require('next')
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const port = process.env.PORT || 3000;

nextApp.prepare().then(() => {
    const app = express();

    app.use('/api', require('./routes/index'));

    app.get('*', (req,res) => { //render React pages
        return handle(req,res);
    })

    app.listen(port, '0.0.0.0', err => {
        if (err) throw err;
        console.log(`Ready on http://localhost:${port}`)
    })
})
