# FOR ROUTER-
npm i react-router-dom

# FOR ICONS-
npm i lucide-react 

# FOR LOGIN AND PAYMENT PAGE-
Clerk: https://go.clerk.com/GHwC6Yp

follow the steps for react after signin to install clerk into your system

For payment-https://dashboard.clerk.com/apps/app_32nUywx4aHLYkTI37jczGGSjL7z/instances/ins_32nUytwrUajRxTlr0sMCeReWEmd/billing/settings
go into the dashboard then click on project->billing->setting

# FOR TESTIMONIAL & FOOTER-
use prebuiltui.com

# INSTALL PACKAGE FOR BACKEND-
npm init -y
npm i express dotenv cors axios cloudinary multer

cors-connect backend with frontend
axios-for api calls
cloudinary-to store images on cloud storage
multer upload images using multer package

npm i --save-dev nodemon - for automatic saving and refreshing on any change in the code

# IN package.json-
"type":"module"
"server":"nodemon server.js" 

# FOR DATABASE-
https://neon.com/
after signup click on 'Connect' then copy the database url and store it into ur .env file
then click on docs select express then 
npm install @neondatabase/serverless
create db.js file in configs folder-

import {neon} from '@neondatabase/serverless';
const sql=neon(`${process.env.DATABASE_URL}`)
export default sql;

then create database  on sql editor

# TO STORE RESUME AS PDF -
npm i pdf-parse

# FOR REACT TOAST-
npm i react-hot-toast

then add <Toaster/> in App.jsx

# CONNECT FRONTEND WITH BACKEND 

VITE_BASE_URL=http://localhost:3000





