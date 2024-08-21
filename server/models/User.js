import mongoose from "mongoose";
// Ceci sera un schéma pour l'utilisateur qui représentera les données du modèle.
const UserSchema = new mongoose.Schema(
  {
    userID: {
      type: Number,
      default: 0,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["employee", "manager", "admin"],
      default: "manager",
    },
    location: String,
    occupation: String,
    phoneNumber: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
// Ceci est un schéma que nous passons à mongoose, et mongoDB utilisera ce modèle pour vérifier que chaque donnée réelle suit ce format.
