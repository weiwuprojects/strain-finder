const express = require('express');
const next = require('next')
const nextApp = next({ dev: true })
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();

    app.use('/api', require('./routes/index'));

    app.get('*', (req,res) => { //render React pages
        return handle(req,res);
    })

    app.listen(3000, err => {
        if (err) throw err;
        console.log(`Ready on http://localhost:${3000}`)
    })
})
