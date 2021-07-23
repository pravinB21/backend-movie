var express = require('express');

var directorData = require('./schema')
var filmData = require('./filmSchema')

var route = express.Router();

route.get('/direct', async (req, res) => {
    try {
        var forms = await directorData.find({});
        res.json({ forms });
    } catch (err) {
        res.json("Error occured");
    }
})
route.get('/film', async (req, res) => {
    try {
        var forms = await filmData.find({});
        res.json({ forms });
    } catch (err) {
        res.json("Error occured");
    }
})

route.post('/film',async (req,res)=>{
    let forms = new filmData(req.body);
    await forms.save();
    res.json({ forms })
})
route.post('/direct',async (req,res)=>{
    directorname=req.body.name;
    console.log(directorname);
    directorData.findOne({directorname}).exec((err,userCheck)=>{
        if(userCheck){
            return res.json({feedBack:"director exist"});
        }
        let forms = new directorData(req.body);
     forms.save();
    res.json('Uploaded successfully !!')
    })
    
})

route.delete('/deleteFilm/:filmName', async (req, res) => {
    var filmName = req.params.filmName;
    var film=await filmData.findOne({name:filmName})
    if(film){
        await filmData.deleteOne({ name: filmName })
        res.json("deleted successfully !!")
    }else{
        res.json('No such film in database')
    }
})
route.get('/direct/:name', async (req, res) => {
    var name = req.params.name;
    console.log(name)
    var data = await directorData.find({ name: name });
    console.log(data)
    res.json({ data });
})


route.put('/updateDirect/:name', async (req, res) => {
    var name = req.params.name;
    console.log(req.body.age);
    var director=await directorData.findOne({name:name})
    if(director){
        await directorData.updateOne({ name: name }, { $set: { age: req.body.age } })
        await directorData.updateOne({ name: name }, { $set: { awardCount: req.body.awardCount } })
    
        res.json("Successfully Updated !!")
    }else{
        res.json("Director not found in backend")
    }
    
})
route.get('/filmsearch/:fname', async (req, res) => {
    var fname = req.params.fname;
    console.log(fname)
    var data = await filmData.findOne({ name: fname });
    console.log(data)
    var name=data.director
    console.log(name)
     var directordata=await directorData.findOne({name:name})
     console.log(directordata)
     res.json({ directordata });
    
})

route.get('/film/:name', async (req, res) => {
    try {
        var directorName=req.params.name;
        var movies = await filmData.find({director:directorName});
        res.json({ movies });
    } catch (err) {
        res.json("Error occured");
    }
})


route.get('/films/:name', async (req, res) => {
    try {
        var directorName=req.params.name;
        var movies = await filmData.find({name:directorName});
        res.json({ movies });
    } catch (err) {
        res.json("Error occured");
    }
})


//editing cell
route.patch('/updateDirect/:name', async (req,res) =>
{
    var name = req.params.name;
    await directorData.update({name:name},{ $set:{name:req.body.name , age:req.body.age , awardCount:req.body.awardCount, gender:req.body.gender}}
        ,
        function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log(success);
              console.log("No error");
            }
          });
        console.log("done");
        res.send("Done");
})

route.patch('/updateMovie/:name',async (req,res)=>{
    var name=req.params.name;
    await filmData.update({name:name},{$set:{name:req.body.name,rating:req.body.rating,boxOfficeCollection:req.body.boxOfficeCollection ,director:req.body.director}}
        ,
        function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log(success);
              console.log("No error");
            }
          });
          console.log("done");
          res.send('done')

})

//delete row

route.delete('/deleteDirectorRow/:name',async (req,res)=>{
    const name=req.params.name;
    await directorData.deleteOne({name:name});
    res.json("deleted successfully !!")
})
route.delete('/deleteMovieRow/:name',async (req,res)=>{
    const name=req.params.name;
    await filmData.deleteOne({name:name});
    res.json("deleted successfully !!")
})

module.exports = route;