# Doctor Appointment Booking (YouHealth)

The YouHealth App is designed to streamline the booking of doctor appointments online. it enables users to schedule appointments.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Project Overview

A web application developed using the .Net Core Web Api. 
Can check all departments of the doctor available in hospital.  
Allowing users to conveniently book doctor appointments online and also cancel and edit that appointments.

## Technologies Used

*Client :* HTML5 🌐 , CSS3 🎨 , Java Script 🔧

*Server:* .NET Core Web API 🌐, MVC Pattern 🏗️, MS SQL Server 🗄️, EF Core 🛠️, C# 🚀

## Features

- 🔒 *Token Verification:* After successful verification  of data given for login, server will provide token for authorization for enhanced security.

- 📅 *Appointment Booking:* Users can easily schedule appointments with doctors.


## Installation

1. Clone the repository: `git clone [repository URL]`

2. Navigate to the project directory: `cd [project directory]`

3. Install dependencies for the backend: `npm install`

4. Install dependencies for the frontend: `cd ../frontend && npm install`

5. Configure environment variables:
- Create a `.env` file in the backend directory.
- Set up the required environment variables. You can refer to the `.env.example` file for reference.

6. Start the backend server: `npm run server`

7. Start the frontend development server:`npm run client`

8. Start Both using one command : `npm run dev`

9. Open your browser and navigate to `http://localhost:3000` to access the application.

Note: Make sure you have MongoDB installed and running locally or provide the connection string for a remote MongoDB database in the `.env` file.

## Usage

*1. User Registration:*
   - Sign up for an account by providing your name, email, and password.
   - Verify your mobile number through an OTP sent to your registered mobile number.

*2. Appointment Booking:*
   - Browse through the list of available doctors and specialties.
   - Select your preferred doctor and choose a convenient time-sloat for your appointment.

*3. Secure Payments:*
   - Make payments for your appointments using the integrated payment gateway.
   - Enter your payment details securely within the app to complete the transaction.

*4. Video Consultation:*
   - At the scheduled appointment time, click on the "Start Video Call" button to initiate the video consultation with the doctor.
   - Discuss your health concerns, ask questions, and receive medical advice during the consultation.

*5. Symptom Checker:*
   - Use the interactive symptom checker feature to assess your symptoms based on gender, age, and provided symptoms.
   - Receive a prediction of possible diseases based on the entered information.

*Note:* Please ensure that you have a stable internet connection and a device with a supported web browser to access the Doctor Appointment App.
