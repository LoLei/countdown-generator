const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const app = express();
 
app.use(bodyParser.json());
app.use(cors());

const countdowns = Object.create(null);
 
app.get('/countdown/:id', async (req, res) => {
    const countdownId = req.params.id;
    
    if (countdowns[countdownId]) {
        res.send(JSON.stringify(countdowns[countdownId]));
    }
})

app.post('/countdown', async (req, res) => {
    const countdownId = req.body.id;
    const { dateCreated, dateDue, name } = req.body;

    countdowns[countdownId] = { dateCreated, dateDue, name };
    await fs.writeFile('countdowns.json', JSON.stringify(countdowns, null, 2));
 
    res.send({});
})
 
app.listen(3001, async () => {
    try {
        await fs.access('countdowns.json');
        const doCountdownsExist = await (await fs.readFile('countdowns.json')).toString();
        if (!JSON.parse(doCountdownsExist)) await fs.writeFile('countdowns.json', '');
        console.log(JSON.parse(doCountdownsExist))
        for (const [id, cd] of Object.entries(JSON.parse(doCountdownsExist))) {
            countdowns[id] = { dateCreated: cd.dateCreated, dateDue: cd.dateDue, name: cd.name }
        }
        console.log('Backend listening on 3001');
    } catch (e) {
        console.log(e);
        await fs.writeFile('countdowns.json', '');
        console.log('Backend listening on 3001');
    }
})