var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    // app.set('db', db);
    //
    // db.user_create_seed(function(){
    //   console.log("User Table Init");
    // });
    // db.vehicle_create_seed(function(){
    //   console.log("Vehicle Table Init")
    // });
})


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
  ENDPOINTS
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//GET
app.get('/api/users', function(req, res) {
  db.get_users(function(err, users) {
    res.status(200).json(users);
  });
});
app.get('/api/vehicles', function(req, res) {
  db.get_vehicles(function(err, vehicles) {
    res.status(200).json(vehicles);
  });
});
app.get('/api/user/:userId/vehiclecount', function(req, res) {

  db.get_vehicle_count([req.params.userId], function(err, count) {
    if(err) console.log(err);
    res.status(200).json(count);
  });
});


app.get('/api/user/:userId/vehicle', function(req, res) {
  db.get_vehicles_by_id([req.params.userId], function(err, count) {
    res.status(200).json(count);
  });
});

//Check queries for email or letters

app.get('/api/vehicle', function(req, res) {
  if (req.query.email) {
    db.get_vehicles_by_email([req.query.email], function(err, vehicles) {
      console.log('vehicles', vehicles);
      res.status(200).json(vehicles);
    });
  }
// });
// app.get('/api/vehicle', function(req, res) {
  else if (req.query.userFirstStart) {
    var firstLetters = req.query.userFirstStart + '%';
    db.get_vehicles_by_letters([firstLetters], function(err, letters) {
      res.status(200).json(letters);
    });
  }
  else {
    res.status(404).send('Not found')
  }
});

app.get('/api/newervehiclesbyyear', function(req, res) {
  db.get_newer_vehicles(function(err, newer) {
    res.status(200).json(newer);
  });
});





//PUT
app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res) {
  db.put_vehicle([req.params.vehicleId, req.params.userId], function(err, vehicle) {
    res.status(200).json(vehicle);
  });
});





//POST
app.post('/api/users', function(req, res) {
  db.post_user([req.body.firstname, req.body.lastname, req.body.email], function(err, user) {
    res.status(200).json(user);
  });
});

app.post('/api/vehicles', function(req, res) {
  req.body.year = Number(req.body.year);
  req.body.ownerId = Number(req.body.ownerId);

  db.post_vehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], function(err, vehicle) {
    res.status(200).json(vehicle);
  });
});


//DELETE

app.delete('/api/vehicle/:vehicleId', function(req, res) {
  db.delete_vehicle([req.params.vehicleId], function(err) {
    res.status(200).json('deleted!');
  });
});



app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res) {

  // db.get_vehicles(function(err, vehicles) {
  //   res.status(200).json(vehicles);
  // });

  db.delete_vehicle_ownership([req.params.vehicleId], function(err) {
    res.status(200).json('deleted!');
  });

});










app.listen('3100', function(){
  console.log("Successfully listening on : 3100")
})

module.exports = app;
