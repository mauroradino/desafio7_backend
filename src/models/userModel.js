import { Schema, model } from "mongoose";

const userSchema = new Schema ({
    first_name:{
        type: String,
        required:  true
    },
    last_name:{
        type: String,
        required:  true
    },
    email:{
        type: String
    },
    age:{
        type: Number,
        required:  true
    },
    password:{
        type: String,
        required:  true
    },
    rol:{
        type: String,
        default: "user"
    }
})

export const userModel = model ("users", userSchema);