const { sign } = require("jsonwebtoken");
const {z} = require("zod");

const signupSchema = z.object({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3, {message:"Name must be at least 3 characters"})
    .max(255, {message:"Name must not be more than 255 characters"}),
    email: z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"invalid email address"})
    .min(3, {message:"Email must be at least 3 characters"})
    .max(255, {message:"Email must not be more than 255 characters"}),
    phone: z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10, {message:"Phone must be at least 10 characters"})
    .max(20, {message:"Phone must not be more than 20 characters"}),
    tagline: z
    .string({required_error:"tagline is required"})
    .trim()
    .min(3, {message:"tagline must be at least 3 characters"})
    .max(255, {message:"tagline must not be more than 255 characters"}),
    description: z
    .string({required_error:"description is required"})
    .trim()
    .min(3, {message:"description must be at least 3 characters"})
    .max(255, {message:"description must not be more than 255 characters"}),
    password: z
    .string({required_error:"Password is required"})
    .min(7, {message:"Password must be at least 7 characters"})
    .max(1024, {message:"Password must not be more than 1024 characters"}),
});

const loginSchema = z.object({
    email: z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"invalid email address"})
    .min(3, {message:"Email must be at least 3 characters"})
    .max(255, {message:"Email must not be more than 255 characters"}),
    password: z
    .string({required_error:"Password is required"})
    .min(7, {message:"Password must be at least 7 characters"})
    .max(1024, {message:"Password must not be more than 1024 characters"}),
});

module.exports = {signupSchema, loginSchema};