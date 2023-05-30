Hello, Welcome to Documentation of Air Ticketing Booking System

This is a basic booking system where User can register themselves and book flights.

[] API's

    Users

        "/api/register" (User registeration)

        method : POST

        required body : {name : String, "email" : String, "password" : String}

        on successfull registeration : response stauts : 201

                               response message : "User Registered Successfully"

        on error : response status : 400

           response message : errr message

        "/api/login" (user login)

        method : POST

        required body : {n"email" : String, "password" : String}

        on successfull registeration : response stauts : 201

                               response message : "Login Success" , token

        on error : response status : 400

           response message : errr message


