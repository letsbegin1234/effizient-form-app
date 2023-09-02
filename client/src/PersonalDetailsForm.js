import React, { useState } from "react";
import axios from "axios";

function PersonalDetailsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("Bachelors Degree");
  const [branch, setBranch] = useState("");
  const [workexp, setWorkexp] = useState("");
  const [instituteto, setInstituteto] = useState("");
  const [branchto, setBranchto] = useState("");
  const [country, setCountry] = useState("");
  const [goals, setGoals] = useState("");
  const [englishL, setEnglishL] = useState("");
  const [englishR, setEnglishR] = useState("");
  const [englishS, setEnglishS] = useState("");
  const [englishW, setEnglishW] = useState("");
  const [payQ, setPayQ] = useState("Yes");
  const [fee, setFee] = useState("");
  const [gic, setGic] = useState("Yes");
  const [feegic, setFeegic] = useState("");
  const [generatedSOP, setGeneratedSOP] = useState("");
  const [step, setStep] = useState(1); // Current step/page

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      // Check if Name or Email is empty
      alert("Name and Email are required fields.");
      setStep(2);
      return;
    }
    setStep(step + 1);
    try {
      const response = await axios.post(
        "https://formbackend-tqou.onrender.com/generate-sop",
        {
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
          englishL,
          englishR,
          englishS,
          englishW,
          payQ,
          fee,
          gic,
          feegic,
        }
      );
      setGeneratedSOP(response.data.generatedSOP);
      nextStep(); // Proceed to the SOP display step
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form">
      {step === 1 && (
        <div className="item">
          <h2>Effizient - Customized SOP Generator</h2>
          <br />
          <p>
            Fill this questionnaire for the student. After submitting, you will
            receive an email at the email address that you have provided with a
            Statement of Purpose customized for you. You can use and modify that
            as per your needs.
          </p>
          <br />
          <p>
            If you would like to get it edited, reviewed, or drafted by our
            experts, you can get in touch with us{" "}
            <a href="https://effizient-immigration-inc.square.site/s/shop">
              Here
            </a>
          </p>
          <br />
          <button className="rightbtn" onClick={nextStep}>
            Start
          </button>
          <br />
        </div>
      )}
      {step === 2 && (
        <div className="item">
          <label>Enter your Name</label>
          <input
            type="text"
            value={name}
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          />

          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="item">
          <label>Enter Your Email </label>
          <input
            type="email"
            value={email}
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 4 && (
        <div className="item">
          <label>
            Enter your Age
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 5 && (
        <div className="item">
          <label>Select Your Degree</label>
          <select value={degree} onChange={(e) => setDegree(e.target.value)}>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="PhD">PhD</option>
          </select>
          <br />
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 6 && (
        <div className="item">
          <label>
            Enter Your Institute Name
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 7 && (
        <div className="item">
          <label>
            Enter Your Branch
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 8 && (
        <div className="item">
          <label>
            Enter Your Work Experience
            <input
              type="text"
              value={workexp}
              onChange={(e) => setWorkexp(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 9 && (
        <div className="item">
          <label>
            Which institute you wanna Join?
            <input
              type="text"
              value={instituteto}
              onChange={(e) => setInstituteto(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 10 && (
        <div className="item">
          <label>
            Which Branch You Wanna Join?
            <input
              type="text"
              value={branchto}
              onChange={(e) => setBranchto(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 11 && (
        <div className="item">
          <label>
            Which Country You are from?
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 12 && (
        <div className="item">
          <label>
            Enter Your Goals
            <input
              type="text"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 13 && (
        <div className="item">
          <label>
            Enter Your Score in English Learning
            <input
              type="text"
              value={englishL}
              onChange={(e) => setEnglishL(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 14 && (
        <div className="item">
          <label>
            Enter Your Score in English Reading
            <input
              type="text"
              value={englishR}
              onChange={(e) => setEnglishR(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 15 && (
        <div className="item">
          <label>
            Enter Your Score in English Studying
            <input
              type="text"
              value={englishS}
              onChange={(e) => setEnglishS(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 16 && (
        <div className="item">
          <label>
            Enter Your Score in English Writing
            <input
              type="text"
              value={englishW}
              onChange={(e) => setEnglishW(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 17 && (
        <div className="item">
          <label>Have You Paid Fee?</label>
          <select value={payQ} onChange={(e) => setPayQ(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <br />
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 18 && (
        <div className="item">
          <label>
            How much fee did you paid?
            <input
              type="text"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 19 && (
        <div className="item">
          <label>Have You Paid GIC Fee?</label>
          <select value={gic} onChange={(e) => setGic(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <br />
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}
      {step === 20 && (
        <div className="item">
          <label>
            How Much Fee did you paid for GIC?
            <input
              type="text"
              value={feegic}
              onChange={(e) => setFeegic(e.target.value)}
            />
          </label>
          <button className="leftbtn" onClick={prevStep}>
            Previous
          </button>
          <button className="rightbtn" onClick={handleSubmit}>
            Next
          </button>
        </div>
      )}

      {step === 21 && (
        <div className="item">
          <p>
            Dear <b>{name}</b> , Thank you for submitting your information! .
            Your form has been successfully received. We have sent a
            confirmation email to <b>{email}</b> . If you have any questions or
            need further assistance, please feel free to contact us{" "}
            <a href="https://effizient-immigration-inc.square.site">Here</a>
          </p>
          <br />
          <p>
            Please Check Your Email : <b>{email}</b>
          </p>
        </div>
      )}
    </div>
  );
}

export default PersonalDetailsForm;
