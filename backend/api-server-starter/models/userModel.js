const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
      name: { type: String, required: true }, // Full name of the user
      email: { type: String, required: true, unique: true }, // Unique username for login
      password: { type: String, required: true }, // Hashed password for authentication
      phone_number: { type: String, required: true }, // Contact phone number
      gender: { type: String, required: true }, // Gender of the user
      date_of_birth: { type: Date, required: true },
      address: {
          street: { type: String, required: true }, // Street address
          city: { type: String, required: true }, // City
          zipCode: { type: String, required: true } // Postal/ZIP code
      }
  },
  { timestamps: true, versionKey: false }
  );

const REQUIRED_FIELDS = ['name', 'email', 'password']

const User = mongoose.model("User", userSchema);


const signupUser = async (data) => {
    const missing = REQUIRED_FIELDS.filter(field => !data[field]);
    if (missing.length > 0) {
        return { error: `Missing required fields: ${missing.join(', ')}` };
    }

    const email = String(data.email).toLowerCase().trim() ;

    //Check unique email before signing up
    const exists = await User.findOne({ email });
    if (exists) {
        return {error: "Email existed!"}
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt)

        const user = await User.create({
            name: data.name,
            email: email,
            password: hashedPassword,
            phone_number: data.phone_number,
            gender: data.gender,
            date_of_birth: data.date_of_birth,
            address: {
                street: data.address?.street,
                city: data.address?.city,
                zipCode: data.address?.zipCode
            }

        })
        return user;
        
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return { error: `${field} already in use` };
        }
        return { error: err.message };
    }
};

const loginUser = async(email, password) => {
    
    //validator
    if (!email || !password) throw new Error("All fields required!")
    
    const user = await User.findOne({email});

    if (!user) throw new Error("User not found!")

    const isMatched = bcrypt.compare(password, user.password);
    if(!isMatched) throw new Error("Invalid credentials")

    return user;
    
}

// module.exports = mongoose.model("User", userSchema);
module.exports = {
  signupUser,
  loginUser
}