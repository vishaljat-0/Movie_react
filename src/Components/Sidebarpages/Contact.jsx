import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaLinkedin, FaGithub } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const navigate = useNavigate();
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_po2df1r", // Service ID
        "template_vufchli", // Template ID
        form.current,
        "4Ti5f_9UGx3rCv9M4" // Public Key
      )
      .then(
        () => {
          setStatus("success");
          e.target.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("error");
        }
      );
  };

  return (
    <div className="min-h-screen w-full bg-[#1F1E24] flex flex-col overflow-x-hidden">

      {/* Top Navigation */}
      <div className="mt-5 px-5 md:px-10 w-full flex items-center">
        <i
          onClick={() => navigate(-1)}
          className="text-white bg-[#6556CD] p-3 rounded-full shadow-md hover:bg-[#5248b2] mr-3 transition-all duration-300 transform hover:scale-110 hover:rotate-[-10deg] hover:shadow-2xl cursor-pointer"
        >
          <FaArrowLeft className="text-sm" />
        </i>
        <h1 className="text-2xl font-semibold text-zinc-300">Contact Me</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-5 py-10 bg-gradient-to-b from-[#1F1E24] to-[#161616]">

        {/* Form Section */}
        <div className="bg-[#2A2A2A] rounded-2xl shadow-lg p-8 max-w-2xl w-full border border-zinc-700">
          <h2 className="text-3xl font-bold text-[#FFDD57] mb-6 text-center">Send a Message ✉️</h2>
          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Subject"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white border border-zinc-600 focus:outline-none focus:border-[#FFDD57]"
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white border border-zinc-600 focus:outline-none focus:border-[#FFDD57]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1F1E24] text-white border border-zinc-600 focus:outline-none focus:border-[#FFDD57]"
            />
            <textarea
              name="message"
              placeholder="Write your message..."
              required
              className="w-full h-[150px] md:h-[180px] px-4 py-2 rounded-lg bg-[#1F1E24] text-white border border-zinc-600 focus:outline-none focus:border-[#FFDD57] resize-none"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className={`bg-[#FFDD57] text-black font-semibold py-2 px-6 rounded-lg hover:bg-[#e6c94f] transition-all duration-300 ${
                status === "sending" ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Status Messages */}
          {status === "success" && (
            <p className="mt-4 text-green-400 font-semibold text-center animate-fade-in">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-500 font-semibold text-center animate-fade-in">
              ❌ Failed to send message. Please try again.
            </p>
          )}
        </div>

        {/* Developer Links */}
        <div className="mt-8 flex flex-col items-center">
          <div className="flex gap-5 mt-4 flex-wrap justify-center">
            <a
              href="https://www.linkedin.com/in/Vishal9685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#FFDD57] hover:text-[#5248b2] transition-all duration-300"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
            <a
              href="https://github.com/Vishal9685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#FFDD57] hover:text-[#5248b2] transition-all duration-300"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
