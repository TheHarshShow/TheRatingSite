const express = require('express')
const bodyParser = require('body-parser')
const rp = require('request-promise')
const assert = require('assert')
const mongoose = require('mongoose')

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://localhost:27017/moviedb", {useNewUrlParser: true, useUnifiedTopology: true})

const movieSchema = new mongoose.Schema({

  movieName: String,
  imageUrl: String,

})

var Movie = mongoose.model("Movie", movieSchema)

app.get('/', function(req, res){

  Movie.find({}, function(err, movies){


    if(err){
      console.log("There was an error", err)
    } else {
      res.render('home', {movies: movies})
    }

  })
})

app.get('/addMovie', function(req, res){

  res.render('addMoviePage')

})

app.post('/', function(req, res){

  Movie.create(req.body, function(err, movie){

    if (err){
      print("there was an error adding the movie", err)

    } else {

      console.log()
      res.redirect('/')

    }

  })

})

app.listen(8000, function(){

  console.log('The server is listening on port 8000')

})
