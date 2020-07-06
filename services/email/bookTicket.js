const nodemailer = require('nodemailer');
const fs = require('fs'); //built-in NodeJS (Node API)
const hogan = require('hogan.js');

const template = fs.readFileSync("services/bookingTicketEmailTemplate.hjs", "utf-8")
const compiledTemplate = hogan.compile(template);

module.exports.sendBookTicketEmail = (user, trip, ticket)=>{
    const transport = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        requireSSL: true,
        auth: {
            user: 'huyhungnguyen.sg@gmail.com',
            pass: 'Testpass@'
        }
    }
    const transporter = nodemailer.createTransport(transport);
    const mailOptions = {
        from: 'huyhungnguyen.sg@gmail.com',
        to: 'nguyenhuyhung.ueh@gmail.com',
        subject: "mail xac nhan mua ve thanh cong",
        html: compiledTemplate.render({
            email: user.email, //lay tu user
            fromStation: trip.fromStationId.name,
            toStation: trip.toStationId.name,
            price: trip.price,
            amount: ticket.seats.length,
            total: trip.price*ticket.seats.length,
            seatCodes: ticket.seats
                .map(m => m.code)
                .join(", ")
        })
    }

    transporter.sendMail(mailOptions, err =>{
        if(err) return console.log(err);
        console.log("Send email successfully")
    })
}