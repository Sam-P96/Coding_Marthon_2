const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema()

const userSchema = new Schema(
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


const signupUser = async(data) => {
    
    //Validator
    const missing = REQUIRED_FIELDS.filter(field => !data[field]);

    if (missing.length > 0) throw new Error("Something is missing")
    
    if(!validator.isEmail(email)) throw new Error("Enter correct email!")

    if (!validator.isStrongPassword(password)) throw new Error("Ur password is to weak :(")

    const existed_email = User.findOne({email})
    if (existed_email) throw new Error("Email already existed")

    try {
        const salt = bcrypt.genSalt(10)
        const hashpwd = bcrypt.hash(data.password, salt)
        
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: hashpwd,
            phone_number: data.phone_number,
            gender: data.gender,
            date_of_birth: data.date_of_birth,
            address: {
                street: data.street,
                city: data.city,
                zipCode: data.zipCode
            }

        })
        return user;

    } catch (err) {
        console.error(err)
    }
}

const loginUser = async(email, password) => {
    
    //validator
    if (!email || !password) throw new Error("All fields required!")
    
    const user = await User.findOne({email});

    if (!user) throw new Error("User not found!")

    const isMatched = bcrypt.compare(password, user.password);
    if(!isMatched) throw new Error("Invalid credentials")

    return user;
    
}

export {
    signupUser,
    loginUser
}