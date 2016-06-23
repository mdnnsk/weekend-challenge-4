//set required modules
var express=require('express');
var app=express();
var path=require('path');
var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var pg=require('pg');

//set up connectionString for the db
var connectionString='postgres://localhost:5432/tasks';

// set static public folder
app.use( express.static('public'));

// Start up the server
var server = app.listen( 3000, 'localhost', function( req, res ){
  console.log( "server listening on " + server.address().port);
});

// set up base url
app.get( '/', function( req, res ){
  console.log( 'base url online' );
  res.sendFile( path.resolve( 'views/index.html' ) );


}); // end base url

//POST for submitting tasks
app.post('/submitTask',urlencodedParser, function(req,res){
  var results =[];
  pg.connect( connectionString, function(err, client, done){
    console.log(req.body.todo + " " + req.body.complete);
    client.query('INSERT INTO tasks ( task_name, completed ) VALUES ( $1, $2)',[req.body.todo, req.body.complete]);
    var query = client.query( 'SELECT * FROM tasks ORDER BY id ASC;' );
    console.log( "query: " + query );
    // push each row in query into our results array
    var rows = 0;
    query.on( 'row', function ( row ){
      results.push( row );
    }); // end query push
    query.on( 'end', function (){
      console.log(results);
      return res.json( results );
    });
    pg.end();
  });//end pgconnect
});
//post for get tasks on load
app.post('/getTasks',urlencodedParser, function(req,res){
  var results =[];
  pg.connect( connectionString, function(err, client, done){

    var query = client.query( 'SELECT * FROM tasks ORDER BY completed, id ASC;' );
    console.log( "query: " + query );
    // push each row in query into our results array
    var rows = 0;
    query.on( 'row', function ( row ){
      results.push( row );
    }); // end query push
    query.on( 'end', function (){
      console.log(results);
      return res.json( results );
    });
    pg.end();
  });//end pgconnect
});
  app.post('/completeTask',urlencodedParser, function(req,res){
    var results =[];
    pg.connect( connectionString, function(err, client, done){
      client.query("UPDATE tasks SET completed=true WHERE id="+ req.body.id +"");
      var query = client.query( 'SELECT * FROM tasks ORDER BY completed, id ASC;' );
      console.log( "query: " + query );
      // push each row in query into our results array
      var rows = 0;
      query.on( 'row', function ( row ){
        results.push( row );
      }); // end query push
      query.on( 'end', function (){
        console.log(results);
        return res.json( results );
      });
      pg.end();
    });//end pgconnect
});

app.post('/deleteTask',urlencodedParser, function(req,res){
  var results =[];
  pg.connect( connectionString, function(err, client, done){
    client.query("DELETE from tasks WHERE id="+ req.body.id +"");
    var query = client.query( 'SELECT * FROM tasks ORDER BY completed, id ASC;' );
    console.log( "query: " + query );
    // push each row in query into our results array
    var rows = 0;
    query.on( 'row', function ( row ){
      results.push( row );
    }); // end query push
    query.on( 'end', function (){
      console.log(results);
      return res.json( results );
    });
    pg.end();
  });//end pgconnect
});
