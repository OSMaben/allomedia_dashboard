import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineUpload,
  AiOutlineSetting,
} from "react-icons/ai";
import { userWithResto } from "../redux/features/adminSlice";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.admin);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [profileImage, setProfileImage] = useState("./images/user/user-06.png");
  const [coverImage, setCoverImage] = useState("./images/cover/cover-01.png");
  const [bio, setBio] = useState("Write a short bio about yourself here.");
  const [jobTitle, setJobTitle] = useState("Super Admin at Rusters");
  const [location, setLocation] = useState("Your Location");
  const [darkMode, setDarkMode] = useState(false);

  const onSubmit = (data) => {
    if (data.image[0] && data.image[0].size > 2097152) {
      setError("image", {
        type: "manual",
        message: "Image size must be less than 2MB",
      });
    } else {
      dispatch(userWithResto(data));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCoverImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex flex-col items-center p-6">
        <div className="flex justify-between w-full mb-4">
          <h1 className="text-3xl font-bold">Admin Profile</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="relative h-32 rounded-t-lg overflow-hidden">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <label className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full px-4 py-1 cursor-pointer">
              Change Cover
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex flex-col items-center -mt-16">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 dark:bg-gray-700 object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white rounded-full px-2 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileChange}
                  className="hidden"
                />
                Change
              </label>
            </div>
            <h3 className="mt-2 text-lg font-semibold">{jobTitle}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {location}
            </p>
          </div>
          <div className="p-4">
            <h4 className="text-lg font-semibold">About Me</h4>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full h-20 p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
              placeholder="Write a short bio..."
            />
          </div>
        </div>

        {/* Registration Form */}
        <div className="w-full max-w-md mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Create Manager & Restaurant
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Upload Image
              </label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 bg-gray-50 dark:bg-gray-700">
                <AiOutlineUpload className="text-4xl text-gray-500" />
                <p className="text-gray-500 mt-2">Click or drag image here</p>
                <input
                  type="file"
                  {...register("image", {
                    required: "Image is required",
                    validate: {
                      fileSize: (files) =>
                        files[0]?.size > 2097152
                          ? "Image size must be less than 2MB"
                          : true,
                      fileType: (files) =>
                        ["image/jpeg", "image/png"].includes(files[0]?.type) ||
                        "Only JPEG or PNG images are allowed",
                    },
                  })}
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 w-32 h-32 object-cover rounded-md"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Name"
                icon={AiOutlineUser}
                type="text"
                register={register("name", { required: "Name is required" })}
                error={errors.name}
              />
              <Field
                label="Email"
                icon={AiOutlineMail}
                type="email"
                register={register("email", { required: "Email is required" })}
                error={errors.email}
              />
              <Field
                label="Phone"
                icon={AiOutlinePhone}
                type="text"
                register={register("phone", { required: "Phone is required" })}
                error={errors.phone}
              />
              <Field
                label="Address"
                icon={AiOutlineHome}
                type="text"
                register={register("address", {
                  required: "Address is required",
                })}
                error={errors.address}
              />
              <Field
                label="Password"
                icon={AiOutlineLock}
                type="password"
                register={register("password", {
                  required: "Password is required",
                })}
                error={errors.password}
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-md ${
                isLoading
                  ? "bg-gray-500"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, icon: Icon, type, register, error }) => (
  <div className="relative">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <div className="flex items-center border rounded-md p-2 bg-gray-50 dark:bg-gray-600">
      <Icon className="mr-2 text-gray-600 dark:text-gray-300" />
      <input
        type={type}
        {...register}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`w-full border-0 bg-transparent focus:outline-none text-sm ${
          error ? "text-red-500" : ""
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

export default AdminProfile;
