import  User  from '../models/user.js';
import { hash } from 'bcrypt';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import Amis from '../models/amis.js';
import UserRoles from '../models/userRoles.js';

// Use the `config` method to load environment variables from the .env file

dotenv.config();

//import  Geocodio from 'geocodio-library-node';
//const geocoder = new Geocodio('ff4368cc5fc2084156641546cc5548415c40066');
//geocoder.reverse('38.©,-76.9990361')
  //.then(response => {
    //console.log(response);
  //})
 
  
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





// Rest of your functions...

// Function for creating a user account
export async function createAccount(req,res){
  // Trouver les erreurs  de validation dans cette requete et les envelopper dans un objet
  if (!validationResult(req).isEmpty())
  {
      res.status(400).json({errors: validationResult(req).array()});
  }
  else{

  User
  .create({
    UserName: req.body.UserName,
      email: req.body.email,
      password: await hash(req.body.password, 10),
      latitudeDeUser: null,
      longitudeDeUser: null,
      numeroTel: req.body.numeroTel,
      
  })
  .then(newUser=> {
      res.status(200).json(newUser);

  })
  .catch(err => {
      res.status(500).json({error:err});
  });
  }
}

export async function authentificateUser(req, res) {
  try {
    const data = req.body;

    // Check if the provided email and password match the admin credentials from .env
    if (
      data.email === 'mr.djebbi@gmail.com' &&
      data.password === process.env.ADMIN_PASSWORD
    ) {
      // Admin authentication
      const payload = {
        _id: 'admin_id', // Replace 'admin_id' with the desired admin user ID
        username: 'admin', // Set the username for admin
        email: 'mr.djebbi@gmail.com', // Use the fixed email for admin
        password: process.env.ADMIN_PASSWORD, // Use the admin password from .env
        Role: UserRoles.ADMIN, // Add Role information for admin
      };

      const apiKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, apiKey);

      return res.status(200).send({ token, apiKey });
    }

    // If not admin, perform user authentication
    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(404).send('Email and password are invalid!');
    }

    const validPass = bcrypt.compareSync(data.password, user.password);

    if (!validPass) {
      return res.status(401).send('Email or password is invalid');
    }

    const payload = {
      _id: user._id,
      username: user.UserName,
      email: user.email,
      password: user.password,
      Role: user.UserRoles.CLIENT, // Add Role information for the user
    };

    const apiKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, apiKey);

    return res.status(200).send({ token, apiKey });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
}


// Function for password recovery
export function recoverPassword(req, res) {
  // Implement password recovery logic here.
  // This is a placeholder function. You should replace it with your own logic.

  // Example: You might send a password reset code to the user's email.
  const { email } = req.body;

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
  sendPasswordResetCodeEmail(email, resetCode);

  // Respond with a success message
  res.status(200).json({ message: 'Password reset code sent to your email' });
}

// Function to generate a unique 4-digit OTP code
function generateOTP() {
  // Generate a random 4-digit OTP code
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
}

// Function to send a password reset code email
function sendPasswordResetCodeEmail(email, resetCode) {
  // Create a Nodemailer transporter with your email service configuration.
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
      user: 'katadjebbi@gmail.com', // your email address
      pass: 'tmaagphndmedkolz', // your email password or an application-specific password
    },
  });

  // Define the email content
  const mailOptions = {
    from: 'katadjebbi@gmail.com',
    to: email,
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${resetCode}`,
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
export function deleteAccount(req, res) {
  // Assuming you have the user's _id in the payload
  const userId = req.user._id; // Assuming you have set the user object in the request

  // Find and delete the user based on the _id
  User.findByIdAndDelete(userId, (err, deletedUser) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting the user' });
    }

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  });
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
