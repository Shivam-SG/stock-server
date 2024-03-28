const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact");

router.post('/', contactForm.submitContactForm);

module.exports = router;