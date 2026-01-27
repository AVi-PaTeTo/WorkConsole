import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    picture: { 
            type: String, 
    },
    name: { 
            type: String, 
            required: true
        },
    email: {
            type: String, 
            unique:true, 
            lowercase:true, 
            required: true, 
            match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"]
        },
    password: {
                type: String, 
                minlength:6, 
                required: true, 
                select: false
            }
}, {timestamps: true})

userSchema.pre("save", async function() {
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }

})

export const User = mongoose.model('User', userSchema);