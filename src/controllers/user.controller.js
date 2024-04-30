import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //Get the data from the frontend
  //validate the data(empty)
  //check the user i.e. (username,email already existed)
  //check for the Images and avtar
  //upload them into cloudinary,avatar
  //create user object - create entry in db
  //remove the password and refreshToken from response field
  //check for userCreation
  //return response

  const { email, username, fullname, password } = req.body;
  // console.log("Email: ",email);

  // if (
  //     [fullName, email, username, password].some((field) => field?.trim() === "")
  // ) {
  //     throw new ApiError(400, "All fields are required")
  // }          OR

  if (email === "") {
    throw new ApiError(400, "Email is required");
  }
  if (username === "") {
    throw new ApiError(400, "username is required");
  }
  if (fullname === "") {
    throw new ApiError(400, "fullname is required");
  }
  if (password === "") {
    throw new ApiError(400, "password is required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email and username already existed");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
//   const coverImageLocalPath = req.files?.coverImage[0]?.path;


  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0 ){
    coverImageLocalPath=req.files.coverImage[0].path;
  }
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
     const coverImg=await uploadOnCloudinary(coverImageLocalPath);
  //    console.log(avatar.url);
  const user = await User.create({
    fullname,
    email,
    avatar: avatar.url,
    coverImage: coverImg?.url || "",
    password,
    username: username.toLowerCase()
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went really wrong");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "Registered Sucessfully"));
});

export { registerUser };
