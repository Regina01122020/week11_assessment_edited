const express      = require('express')
const app          = express()
const port         = 8080
const mongoose     = require('mongoose')
const doctorSchema = require("./model/doctorSchema")
const patientSchema = require("./model/patientSchema") 
const methodOverride = require('method-override')

//Database Connection.
mongoose.connect('mongodb+srv://regina:lJh3MVjYfGtkzJRn@cluster1.utlod.gcp.mongodb.net/Week11Test?retryWrites=true&w=majority', 
{useNewUrlParser:true,useUnifiedTopology:true}, 
    function(error,database){
        if(error){
           console.log("Error connecting to Database")
        } else {
            console.log("Connection made to Database")
        }   
   })
 
//Middlewears.
app.use(express.urlencoded({ extended: true }))
app.set("view engine","ejs") 
app.use(methodOverride('X-HTTP-Method-Override'))

//Root route to go to the home.ejs.
app.get('/', (req, res) =>{
    res.render("home")
})

//=================== DOCTOR ===========================================================================//
//Get the doctor's registration form
app.get('/doctor-details', function(req, res){
    res.render('registerDoctor') 
})

//Posting the doctor's details from the form to the database.
app.post('/doctor-details', function(req, res) {
    console.log("Details POST route hit")
    console.log(req.body)
    
    doctorSchema.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password 
    })

    .then(function(user){
        console.log('User Registered Successfully')
        console.log(user)
        res.send(`<body style="background-color:steelblue">
                       <center><h1> Doctor Registered Successfully </h1><br><br>
                       <div>
                           <button><a href="/"> Logout </a></button>
                       </div>
                       <br><br>
                       <div>
                           <button><a href="/view-doctor-info"> View Doctor's Details </a></button>
                       </div><center>
                  </body>`)
    })
    .catch(function(err){
        console.log(err)
    })
})

//Retrieving the doctor's records from the database.
app.get('/view-doctor-info', (req, res) =>{
    doctorSchema.find({}, function(err, profile){
        res.render("displayDoctor", { profile : profile});
        console.log(profile)
    })
})

//Deleting the doctor's record from the database.
app.get('/delete-doctor-record:id', (req, res) =>{
    const id = req.params.id
    doctorSchema.findOneAndDelete(id, function(err, user) {
        if (err){
            throw err
        } 
        console.log(id)
        res.redirect('/view-doctor-info')
    })
})

//Updating the doctor's record in the database.
app.get('/update-doctor-record', (req, res) =>{
    doctorSchema.findOne({}, function(err, profile){
        res.render("updateDoctor", { profile : profile});
    })
})

app.post('/update-doctor-record:id', (req, res) =>{
        updateRecord(req, res)
})

function updateRecord(req, res) {
    doctorSchema.findOneAndUpdate({ "id": req.body.id },{
        $set: {
            "fullName": req.body.fullName,
            "email": req.body.email
        }
     }, { new: true }, (err, doctor) => {
        if (!err) {  
            console.log(doctor);
            console.log(req.body);
            res.redirect('/view-doctor-info'); 
        }
        else {
            console.log(err);
        }
     });
    }

//============================ PATIENT =============================================================//
//Get the patient's registration form.
app.get('/patient-details', function(req, res){
    res.render('registerPatient') 
})

//Posting the patient's details from the form to the database.
app.post('/patient-details', function(req, res) {
    console.log("Details POST route hit")
    console.log(req.body)
    
    patientSchema.create({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password 
    })

    .then(function(user){
        console.log('User Registered Successfully')
        console.log(user)
        res.send(`<body style="background-color:steelblue">
                       <center><h1> Patient Registered Successfully </h1><br><br>
                       <div>
                           <button><a href="/"> Logout </a></button>
                       </div>
                       <br><br>
                       <div>
                           <button><a href="/view-patient-info"> View Patient's Details </a></button>
                       </div><center>
                  </body>`)
    })
    .catch(function(err){
        console.log(err)
    })
})

//Retrieving the patient's records from the database.
app.get('/view-patient-info', (req, res) => {
    patientSchema.find({}, function(err, profile){
        res.render("displayPatient", { profile : profile});
        console.log(profile)
    })
})

//Deleting the patient's record from the database.
app.get('/delete-patient-record:id', (req, res) =>{
    const id = req.params.id
    patientSchema.findOneAndDelete(id, function(err, user) {
        if (err){
            throw err
        } 
        console.log(id)
        res.redirect('/view-patient-info')
    })
})

//Updating the patient's record in the database.
app.get('/update-patient-record', (req, res) =>{
    patientSchema.findOne({}, function(err, profile){
        res.render("updatePatient", { profile : profile});
    })
})

app.post('/update-patient-record:id', (req, res) =>{
        updateRecord(req, res)
})

function updateRecord(req, res) {
    patientSchema.findOneAndUpdate({ "id": req.body.id },{
        $set: {
            "name": req.body.name,
            "age": req.body.age,
            "email": req.body.email
        }
     }, { new: true }, (err, patient) => {
        if (!err) {  
            console.log(patient);
            console.log(req.body);
            res.redirect('/view-patient-info'); 
        }
        else {
            console.log(err);
        }
     });
    }


//Server listening at this port.
app.listen(port,() => {
    console.log(`Server running on http://localhost:${port}`)
})