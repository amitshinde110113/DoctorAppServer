const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const doctorRoute = require('./api/routes/doctor');
const userRoute = require('./api/routes/users');
const hospitalRoute = require('./api/routes/hospital');


const appointmentController = require('./api/models/appointment_model');
const server=require('./server')


// const adminRoute = require('./api/routes/admins');
// const orderRoute = require('./api/routes/orders');
// const medicinesRoute = require('./api/routes/medicines');
//const checkAutho=require('../middelware/check-auth');
mongoose.connect('mongodb+srv://amit_shinde:amit_shinde@cluster0-ndonf.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        // useFindAndModify: false
    });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.use('/doctors', doctorRoute)
app.use('/users', userRoute)
app.use('/hospitals', hospitalRoute)


var io = require('socket.io').listen(server)
app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', async function (socket) {
    socket.on('room', async function (room) {
        // var room = room;
        socket.join(room);
        // var daa = await appointmentController.create();
        // const appointmentList = await getAppointments(room)
        // emitAppointments(io, room, appointmentList);

        // io.sockets.in(room).emit('appointmentList', daa);
    });
    socket.on('getAppointments', async (doctor) => {
        const appointmentList = await getAppointments(doctor.room);
        io.sockets.in(doctor.room).emit('appointmentList', appointmentList);
    });
    socket.on('book', async (appointment) => {
        // var room = socket.request.headers.referer;


        const ap = new appointmentController({
            _id: new mongoose.Types.ObjectId(),
            doctor: appointment.doctor,
            name: appointment.name,            //Pattient name
            contactNo: appointment.contactNo,
            appointmentNo: appointment.appointmentNo,
            priority: appointment.priority,
            status: appointment.status,          // ACTIVE ARCHIVED DONE DELETED 
            type: appointment.type,            // ADVANCE CURRENT
            fees: appointment.fees,
            isPaid: appointment.isPaid
        });
        const data = await ap.save();
        const appointmentList = await getAppointments(appointment.doctor)
        emitAppointments(io, appointment.room, appointmentList);
        // io.sockets.in(room).emit('appointmentList', daa);
    });
    socket.on('updateAppointments', async (data) => {
        let appointments = data.appointments;
        console.log(appointments)
        for (let i = 0; i < appointments.length; i++) {
            const id = appointments[i]._id;
            delete appointments[i]._id;
            const data = await appointmentController.update({ _id: id },{ $set: appointments[i] });
            console.log(data)
            if (i == appointments.length - 1) {
                const appointmentList = await getAppointments(appointments[0].doctor)
                emitAppointments(io, appointments[0].doctor, appointmentList);
            }
        }
    });
});
async function getAppointments(doctorId) {
    let appointmentList = await appointmentController.find({ doctor: doctorId }).populate('user');
    return appointmentList;
}
function emitAppointments(io, room, appointmentList) {

    io.sockets.in(room).emit('appointmentList', appointmentList);
}
//app.use('/uploads',express.static('uploads'));
// app.use('/medicines',medicinesRoute)
// app.use('/admins',adminRoute)
// app.use('/orders',orderRoute)
//app.use('/groups',groupRoute)
//app.use('/employees', productRoute);
//router.get('/uploads/:id',(req,res,next)=>{
//    const filepath = req.params.id;
//    //filepath=req.body.path;
//     res.sendFile('uploads/1.jpg-1562414264691.jpeg');

//})
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status(404);
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.err || 500);
    res.json({ error: { message: error.message } });

});
module.exports = app;