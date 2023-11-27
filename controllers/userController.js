import  User  from '../models/user.js';
import { hash } from 'bcrypt';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import Amis from '../models/amis.js';
import twilio from 'twilio';
const accountSid = 'ACe1ba384790b795e6f000e81de0a64378'; // Your Twilio Account SID
const authToken = '173998083808e43b4377fc04d567a8c0'; // Your Twilio Auth Token
const verifySid = 'VAece4a5891c0da464781c834ea63a1d18';

const twilioPhoneNumber = '+14698046132'; // Your Twilio phone Number
const phoneNumber=process.env.PHONE_NUMBER;
const client = twilio(accountSid, authToken);
const receiver =process.env.TWILIO_PHONE_NUMBER

// Use the `config` method to load environment variables from the .env file

dotenv.config();

//import  Geocodio from 'geocodio-library-node';
//const geocoder = new Geocodio('ff4368cc5fc2084156641546cc5548415c40066');
//geocoder.reverse('38.©,-76.9990361')
  //.then(response => {
    //console.log(response);
  //})
  
  // Initialize Passport and restore authentication state from session

  
// Function for user profile modification

export async function modifyUserProfile(req, res) {
  try {
    const _id = req.params._id; // Assuming '_id' is the parameter for the user's _id
    const { UserName, email, password, numeroTel } = req.body;

    // Find the user by _id
    const user = await User.findOne({ _id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user's profile
    user.UserName = UserName;
    user.email = email;
    user.password = password;
    user.numeroTel = numeroTel;

    const updatedUser = await user.save();

    res.json({ message: 'User profile updated successfully', data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}





export async function createAccountAdmin(req, res) {
  // Trouver les erreurs de validation dans cette requete et les envelopper dans un objet
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    User.create({
      UserName: req.body.UserName,
      email: req.body.email,
      password: await hash(req.body.password, 10),
      Role: 'admin', // Use the ADMIN_ROLE from environment variables
    })
      .then((newAdmin) => {
        res.status(200).json(newAdmin);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

// Function for creating a user account
export async function createAccountClient(req, res) {
  try {
    // Trouver les erreurs de validation dans cette requete et les envelopper dans un objet
    if (!validationResult(req).isEmpty()) {
      console.error('Validation errors:', validationResult(req).array());
      return res.status(400).json({ errors: validationResult(req).array() });
    }

    const newUser = await User.create({
      UserName: req.body.UserName,
      email: req.body.email,
      password: req.body.password,
      Role: 'client', // Use 'client' directly
      latitudeDeUser: null,
      longitudeDeUser: null,
      numeroTel: req.body.numeroTel,
    });

    console.log('New user created:', newUser);

    return res.status(200).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



 




export async function authenticateClient(req, res) {
  try {
    const data = req.body;

    // Check if the provided email matches any user account
    const user = await User.findOne({ email: data.email, Role: 'client' });

    if (!user) {
      return res.status(404).send('Email and password are invalid!');
    }

    // Compare the provided password with the stored password
    if (data.password !== user.password) {
      return res.status(401).send('Email or password is invalid');
    }

    // User authentication
    const payload = {
      _id: user._id,
      username: user.UserName,
      email: user.email,
      role: user.Role, // Use the role from the user model
      // You can include additional user-specific attributes in the payload if needed
    };

    process.env.userId = user._id; // Corrected this line
    const apiKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, apiKey);

    // Include user ID in the response
    return res.status(200).send({ token, apiKey, _id: user._id, UserName: user.UserName, email: user.email, numeroTel: user.numeroTel });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
}
export async function authenticateAdmin(req, res) {
  try {
    const data = req.body;

    // Check if the provided email and password match any user account
    const admin = await User.findOne({ email: data.email, Role: 'admin' });

    if (!admin) {
      return res.status(404).send('Email and password are invalid for admin!');
    }

    const validPass = bcrypt.compareSync(data.password, admin.password);

    if (!validPass) {
      return res.status(401).send('Email or password is invalid for admin');
    }

    // Admin authentication
    const payload = {
      _id: admin._id,
      username: admin.UserName,
      email: admin.email,
      role: admin.Role, // Use the role from the admin user model
      // You can include additional admin-specific attributes in the payload if needed
    };

    const apiKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, apiKey);

    return res.status(200).send({ token, apiKey });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
}

  export async function recoverPasswordByPhoneNumber(req, res) {
    try {
      const { phoneNumber } = req.body; // Get the phone number from the request

      if (!phoneNumber) {
        return res.status(400).json({ error: 'Invalid phone number' });
      }

      // Generate a unique 4-digit OTP code
      const otpCode = generateOTP();

      // Send the OTP code to the user's phone number using Twilio
      const smsSent = await sendOTPWithTwilio(phoneNumber, otpCode);
      
      
      if (smsSent) {
        process.env.PHONE_OTP = otpCode;
        res.status(200).json({ message: 'OTP code sent to your phone number' });
      } else {
        res.status(500).json({ error: 'Error sending OTP code' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export async function verifyOTPFromTwilio(req, res) {
  const phoneOTP = process.env.PHONE_OTP;
  const requestBody = req.body; // Get the data from the request body

  if (requestBody.otpCode === phoneOTP) {
    // OTPs match
    res.json({ status: 'verified' }); // Respond with 'verified' status
  } else {
    // OTPs do not match
    res.json({ status: 'not verified' }); // Respond with 'not verified' status
  }
}



// Function for password recovery
export function recoverPassword(req, res) {
  // Implement password recovery logic here.
  // This is a placeholder function. You should replace it with your own logic.

  // Example: You might send a password reset code to the user's email.
  const { email } = req.body;
  const companyName = process.env.COMPANY_NAME;

  // Check if the email is valid (you can add more validation here)
  if (!email) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  // Generate a unique 4-digit OTP code
  const resetCode = generateOTP();

  // Store the reset code and email in environment variables
  process.env.RESET_CODE = resetCode;
  process.env.RESET_EMAIL = email;

  // Send an email with the password reset code
  sendPasswordResetCodeEmail(email, resetCode, companyName);

  // Respond with a success message
  res.status(200).json({ message: 'Password reset code sent to your email' });
}


// Function to generate a unique 4-digit OTP code
function generateOTP() {
  // Generate a random 4-digit OTP code
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
}


async function sendOTPWithTwilio(phoneNumber, otpCode) {
  try {
    // Log the details before sending the message
    console.log('Sending OTP to:', phoneNumber, 'from:', twilioPhoneNumber);

    // Send the OTP using Twilio
    await client.messages.create({
      body: `Your OTP code is: ${otpCode}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    console.log('OTP sent successfully');
    return true; // Message sent successfully
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    return false; // Message sending failed
  }
}



// Function to send a password reset code email
function sendPasswordResetCodeEmail(email, resetCode, companyName) {
  // Create a Nodemailer transporter with your email service configuration.
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
      user: 'katadjebbi@gmail.com', // your email address
      pass: 'fwotfbwkeqgmbyee', // your email password or an application-specific password
    },
  });

  // Define the email content
  const mailOptions = {
    from: 'katadjebbi@gmail.com',
    to: email,
    subject: `Password Reset Code for ${companyName}`,
    html: `
    <html>
      <head>
        <style>
          body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
          }

          .header {
            background-color: #f2f2f2;
            padding: 20px;
            text-align: center;
          }

          .header h1 {
            font-size: 24px;
            font-weight: bold;
          }

          .body {
            padding: 20px;
          }

          .body p {
            font-size: 16px;
            line-height: 1.5;
          }

          .footer {
            background-color: #f2f2f2;
            padding: 20px;
            text-align: center;
          }

          .footer p {
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Password Reset for ${companyName}</h1>
        </div>

        <div class="body">
          <p>Dear ${email},</p>

          <p>You have requested a password reset for your account on ${companyName}.</p>

          <p>Your password reset code is: ${resetCode}</p>

          <p>Please use this code to reset your password.</p>

          <p>Sincerely,</p>
          <p>The ${companyName} Team</p>
        </div>

        <div class="footer">
          <p>&copy; 2023 ${companyName}</p>
        </div>
      </body>
    </html>
  `,
};

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending password reset code email: ' + error);
    } else {
      console.log('Password reset code email sent: ' + info.response);
    }
  });
}



export function validateOTP(req, res) {
  const { otp } = req.body;

  // Retrieve the stored reset code from the environment variable
  const storedResetCode = process.env.RESET_CODE;

  if (!storedResetCode) {
    return res.status(400).json({ error: 'Reset code not found. Please request a new code.' });
  }

  if (otp !== storedResetCode) {
    return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
  }


  res.status(200).json({ message: 'OTP is valid.' });
}

/*export function validateOTPSms(req, res) {
  const { otp } = req.body;

  // Retrieve the stored reset code from the environment variable
  const storedResetCode = process.env.PHONE_OTP;

  if (!storedResetCode) {
    return res.status(400).json({ error: 'Reset code not found. Please request a new code.' });
  }

  if (otp !== storedResetCode) {
    return res.status(400).json({ error: 'Invalid OTP. Please try again.' });
  }


  res.status(200).json({ message: 'OTP is valid.' });
}*/


// Function to change the password
export async function changePassword(req, res) {
  // Retrieve the email and new password from environment variables
  const email = process.env.RESET_EMAIL;
  const newPassword = req.body.password;
  const confirmPassword = req.body.confirmpassword;

  // Check if the email, newPassword, and confirmPassword are available
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'Email, password, or confirmPassword not provided.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'New password and confirmPassword do not match.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Clear the environment variables after the password change
    delete process.env.RESET_CODE;
    delete process.env.RESET_EMAIL;

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating the password.' });
  }
}
// Function to display nearby friends (implementation depends on your requirements)
export async function displayNearbyFriends(req, res) {
  try {
    // Find all nearby friends' usernames in the Amis collection
    const nearbyFriends = await Amis.find({}, 'nomAmis');

    // Extract the usernames from the nearbyFriends array
    const usernames = nearbyFriends.map((friend) => friend.nomAmis);

    return res.status(200).json(usernames);
  } catch (err) {
    return res.status(500).json({ error: 'Error: ' + err.message });
  }
}

  // Function to add a nearby friend (implementation depends on your requirements)
  export async function addNearbyFriend(req, res) {
    // Assuming you have a user Name in the request
    const { UserName } = req.body;
  
    try {
      // Find the user by their UserName
      const user = await User.findOne({ UserName: UserName });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the UserName matches the UserName in the database
      if (user.UserName === UserName) {
        // Create a new Amis document with the same UserName from the request
        const newAmis = new Amis({
          nomAmis: UserName, // Store the UserName from the request in Amis.NomAmis
          // You can add more fields as needed based on your Amis model
        });
  
        // Save the new Amis to the database
        await newAmis.save();
  
        return res.status(200).json({ message: 'Nearby friend added successfully' });
      } else {
        return res.status(400).json({ error: 'Usernames do not match' });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Error: ' + err.message });
    }
  }

// Function for account deletion (implementation depends on your requirements)
export async function deleteAccount(req, res) {
  const userId = req.params.userId; // Retrieve user ID from request parameters

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error deleting Account' });
  }
}

// Define the callback function for user deletion


export function deleteUser(req, res) {
  const customIdToDelete = req.params.id; // Assuming 'id' is the parameter for the custom identifier

  console.log('CustomId to delete:', customIdToDelete); // Debugging statement

  User.findOneAndDelete({ customId: customIdToDelete })
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export async function getUserIdByEmail(req, res) {
  try {
    const email = req.params.email;

    // Retrieve user by email
    const user = await User.findOne({ email });

    if (user && user._id) {
      const userId = user._id;
      res.status(200).json({ userId });
    } else {
      res.status(404).json({ error: 'User not found or does not have a userId' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




// Function to display users (implementation depends on your requirements)

export async function displayAllUsers(req, res) {
  try {
    // Use Mongoose to find all users in the database
    const users = await User.find();

    // Send the list of users as a JSON response
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Function to display user profile
export async function displayUserProfile(req, res) {
  try {
    const userIdToFind = req.params._id; // Assuming '_id' is the parameter for the user's _id

    console.log('User ID to find:', userIdToFind); // Debugging statement

    const user = await User.findOne({ "_id": userIdToFind });
    if (user) {
      res.status(200).json({ data: user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
