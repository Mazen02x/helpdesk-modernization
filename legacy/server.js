var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();
var PORT = 3000;
var DATA_FILE = path.join(__dirname, 'data', 'tickets.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/tickets', function (req, res) {
  fs.readFile(DATA_FILE, 'utf8', function (err, data) {
    if (err) {
      res.status(500).send('Error reading tickets');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/tickets/:id', function (req, res) {
  fs.readFile(DATA_FILE, 'utf8', function (err, data) {
    if (err) {
      res.status(500).send('Error reading tickets');
      return;
    }
    var tickets = JSON.parse(data);
    var ticket = null;
    for (var i = 0; i < tickets.length; i++) {
      if (tickets[i].id == req.params.id) {
        ticket = tickets[i];
      }
    }
    if (ticket == null) {
      res.status(404).send('Not found');
      return;
    }
    res.json(ticket);
  });
});

app.post('/api/tickets',(req,res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err){
            return res.status(500).json({ error: 'Failed to read tickets' });
        }
        var tickets = JSON.parse(data);
        var maxId = 0;
        for (var i = 0; i < tickets.length; i++){
            if (tickets[i].id > maxId){
                maxId = tickets[i].id;
            }
        }
        var newTicket = {
            id: maxId + 1,
            subject: req.body.subject,
            description: req.body.description,
            priority: req.body.priority,
            status: 'open',
            requester: req.body.requester,
            created: new Date().toISOString().slice(0, 10) // YYYY-MM-DD
        };
        tickets.push(newTicket);
        fs.writeFile(DATA_FILE, JSON.stringify(tickets, null, 2), (err) => {
            if (err){
                return res.status(500).json({ error: 'Failed to write tickets' });
            }
            return res.status(201).json(newTicket);
        });
    });
})

app.put('/api/tickets/:id', (req, res) => {
  const statuses = ['open','pending-approval', 'approved', 'rejected', 'closed'];
  if (!statuses.includes(req.body.status)){
    return res.status(400).json({ error: 'Invalid status' });
  }
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err){
      return res.status(500).json({ error: 'Failed to read tickets' });
    }
    var tickets = JSON.parse(data);
    var updatedTicket = null;
    for (var i = 0; i < tickets.length; i++){
      if (tickets[i].id == req.params.id){
        tickets[i].status = req.body.status;
        updatedTicket = tickets[i];
        break;
      }
    }
    if (updatedTicket == null){
      return res.status(404).json({ error: 'Ticket not found' });
    }
    fs.writeFile(DATA_FILE, JSON.stringify(tickets, null, 2), (err) => {
      if (err){
        return res.status(500).json({ error: 'Failed to write tickets' });
      }
      return res.status(200).json(updatedTicket);
    });
  });
});

app.listen(PORT, function () {
  console.log('Legacy Help Desk running on http://localhost:' + PORT);
});