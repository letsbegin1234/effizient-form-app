require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const cors = require("cors");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
app.use(cors());
app.use(bodyParser.json());

//mongoose code
const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://kishore:1234@cluster0.w7w19gv.mongodb.net/gformDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

const Userdata = mongoose.model("User", {
  name: String,
  email: String,
  age: String,
  university: String,
  degree: String,
  branch: String,
  instituteto: String,
  branchto: String,
});

const apiKey = process.env.OPEN;
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: apiKey,
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "shelbyltdx5@gmail.com",
    pass: "cakjmihgkfnxtvbd",
  },
});

//function to generate a custom letter
function generateCustomLetter(reqBody) {
  const {
    name,
    email,
    age,
    university,
    degree,
    branch,
    workexp,
    instituteto,
    branchto,
    country,
    goals,
    payQ,
    fee,
    gic,
    feegic,
  } = reqBody;

  const doc = new PDFDocument();
  const pdfFilePath = "output.pdf";
  const pdfStream = fs.createWriteStream(pdfFilePath);
  doc.pipe(pdfStream);

  // Custom letter content
  doc.fontSize(16).text(`Statement of Purpose for ${name}`);
  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .text(`Date: ${new Date().toDateString()}`, { align: "right" });

  doc.moveDown(1);

  doc.fontSize(12).text(`Recipient's Address:`, { underline: true });
  doc.fontSize(12).text(`[Recipient's Address Line 1]`);
  doc.fontSize(12).text(`[Recipient's Address Line 2]`);
  doc.fontSize(12).text(`[Recipient's Address Line 3]`);
  doc.fontSize(12).text(`[Recipient's City, State, ZIP Code]`);
  doc.moveDown(0.5);

  doc.fontSize(14).text("Dear Sir/Madam,", { align: "left" });
  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .text(
      `I am writing to express my interest in pursuing a ${degree} program at ${university}.`,
      { align: "left" }
    );
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(
      `My name is ${name} and I am ${age} years old. I hold a Bachelor's degree in ${branch} from ${university}.`,
      { align: "left" }
    );
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(
      `I have ${workexp} years of work experience in the field of ${branch}.`,
      { align: "left" }
    );
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(
      `My educational journey has instilled in me a passion for learning and a drive to excel in ${degree}.`,
      { align: "left" }
    );
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(`I am particularly interested in ${instituteto} in ${branchto}.`, {
      align: "left",
    });
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(
      `I aspire to contribute to the field of ${branchto} and believe that ${university} is the ideal place to nurture my skills and knowledge.`,
      { align: "left" }
    );
  doc.moveDown(0.2);

  doc.fontSize(12).text(`In terms of my future goals, I plan to ${goals}.`, {
    align: "left",
  });
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(
      `Regarding the payment of tuition fees, I have the following response to the payment question: ${payQ}.`,
      { align: "left" }
    );
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(
      `The fee structure for the ${degree} program at ${university} is as follows: ${fee}.`,
      { align: "left" }
    );
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(
      `I have arranged for the Guaranteed Investment Certificate (GIC) as a part of the financial requirements.`,
      { align: "left" }
    );
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(`The GIC amount for ${gic} covers my living expenses and more.`, {
      align: "left",
    });
  doc.moveDown(0.2);

  doc
    .fontSize(12)
    .text(
      `I have attached the fee receipt and GIC details with this application.`,
      { align: "left" }
    );

  doc.moveDown(1);

  doc.fontSize(12).text("Sincerely,", { align: "right" });

  doc.fontSize(12).text(`${name}`, { align: "right" });
  doc.fontSize(12).text(`Email: ${email}`, { align: "right" });

  doc.end();

  return pdfFilePath;
}

app.get("/", function (req, res) {
  res.send("Hello world");
});

let requestCount = 1;
const rateLimit = 0;
let rateLimitExceeded = false;

app.post("/generate-sop", async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      university,
      degree,
      branch,
      workexp,
      instituteto,
      branchto,
      country,
      goals,
      payQ,
      fee,
      gic,
      feegic,
    } = req.body;
    const newUser = new Userdata({
      name: name,
      email: email,
      age: age,
      university: university,
      degree: degree,
      branch: branch,
      instituteto: instituteto,
      branchto: branchto,
    });
    newUser.save();

    let pdfFilePath;
    requestCount++;

    if (requestCount > rateLimit) {
      rateLimitExceeded = true;
    }

    // Generates a custom letter if rate limit exceeds
    if (rateLimitExceeded) {
      console.log("Rate limit exceeded. Generating custom letter...");
      pdfFilePath = generateCustomLetter(req.body);
    } else {
      // Generates the AI-generated SOP
      const prompt = `Create a Statement of Purpose like a formal letter with my name and address and thank you at the end with the given details: Name: ${name}, Email: ${email}, Age: ${age}, University: ${university}, Degree: ${degree}, Branch: ${branch}, Work Experience: ${workexp}, Institute To: ${instituteto}, Branch To: ${branchto}, Country: ${country}, Goals: ${goals}, Payment Question: ${payQ}, Fee: ${fee}, GIC: ${gic}, Fee GIC: ${feegic}, Generate a Statement of Purpose (SOP) based on the provided information in a formal letter way with more than 2000 words by elaborating about the institutes. Also write thank you and name at the end`;

      const completion = await openai.completions.create({
        prompt: prompt,
        max_tokens: 600,
        model: "text-davinci-002",
        temperature: 1,
      });

      // Processes the response from the OpenAI API
      const generatedText = completion.choices[0].text;

      // Creates a PDF with AI-generated content
      const doc = new PDFDocument();
      pdfFilePath = "output.pdf";
      const pdfStream = fs.createWriteStream(pdfFilePath);
      doc.pipe(pdfStream);

      doc.fontSize(16).text(`Statement of Purpose for ${name}`);
      doc.moveDown(0.5);

      // Add AI-generated content to the PDF
      doc.fontSize(12).text(generatedText);

      doc.end();
    }

    // Send the generated PDF via email
    const mailOptions = {
      from: "shelbyltdx5@gmail.com", // Replace with your Gmail email address
      to: email,
      subject: "Your Statement of Purpose",
      text:
        `Dear ${name},\n\nHere is your Statement of Purpose in PDF format.\n\n` +
        `Here are the details you provided:\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Age: ${age}\n` +
        `University: ${university}\n` +
        `Degree: ${degree}\n` +
        `Branch: ${branch}\n` +
        `Work Experience: ${workexp}\n` +
        `Institute To: ${instituteto}\n` +
        `Branch To: ${branchto}\n` +
        `Country: ${country}\n` +
        `Goals: ${goals}\n` +
        `Payment Question: ${payQ}\n` +
        `Fee: ${fee}\n` +
        `GIC: ${gic}\n` +
        `Fee GIC: ${feegic}\n\n` +
        "Thank you for using our service!\n\n" +
        "Sincerely,\n" +
        "{name}", // Add your contact details here,
      attachments: [
        {
          filename: "sop.pdf",
          path: pdfFilePath,
          contentType: "application/pdf",
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
