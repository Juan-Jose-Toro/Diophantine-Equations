const express = require('express');

// can change this port depending on use case
const PORT = 3000;

// require the lde.js module
const lde = require('./lde.js');
const app = express();

// change the 
app.listen(PORT, () => console.log(`listening at ${PORT}`));

// public is the directory containing html, css and js files
// static files should still work with this example
app.use(express.static('./public'));

// limit request size to 1mb; with three integers it shouldn't be a problem
app.use(express.json({limit: '1mb'}));

app.post('/api', (request, response) => {
    //test console.log
    console.log(request.body);

    var data = request.body

    // request fields named a, b, c
    var a = parseInt(data.a);
    var b = parseInt(data.b);
    var c = parseInt(data.c);

    // solve lde
    var solution = lde(a, b, c);
    console.log(solution);

    // figure out the variables to be sent in the response
    var xpart = 0;
    var ypart = 0;

    // must traverse through division_steps backwards
    var division_steps = solution[2];
    var backsub_steps = [];

    // always returns the gcd
    var gcd_a = solution[1];

    var slt = false;

    if (solution[0] == true) {
        slt = true;
        backsub_steps = solution[5];
        xpart = solution[3];
        ypart = solution[4];
    }

    // response in json
    // if sol = false there is no solution

    response.json({
        sol: slt,
        x_part: xpart,
        y_part: ypart,
        div_steps: division_steps,
        back_steps: backsub_steps,
        gcd: gcd_a
    });
});