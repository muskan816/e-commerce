import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0a1435] text-white relative mt-32">
      {/* CTA Box */}
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 bg-gray-100 text-black p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-lg font-semibold">Ready to get started?</p>
          <p className="text-sm">Talk to us today</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition cursor-pointer">
          Get Started
        </button>
      </div>

      {/* Footer content */}
      <div className="max-w-6xl mx-auto px-4 pt-28 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Market Store</h3>
          <p className="text-sm text-gray-400">
            Your one-stop shop for the latest gadgets, fashion, and home essentials. Discover top deals and seamless shopping experiences.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Subscribe to get important updates</h3>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your e-mail"
              className="p-2 rounded text-white border border-white bg-transparent cursor-pointer"
              required
            />
            <button className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </form>
        </div>

        <div className=' lg:ml-8'>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <FaFacebookF className="hover:text-indigo-400 cursor-pointer" />
            <FaInstagram className="hover:text-indigo-400 cursor-pointer" />
            <FaTwitter className="hover:text-indigo-400 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Call Us</h3>
          <p className="text-sm text-gray-400 cursor-pointer">+91 12345678978</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        <p>@2025 MarketStore. All Rights Reserved</p>
        <p className="mt-1">
          <span className="mr-4 cursor-pointer">PRIVACY POLICY</span>
          <span className="cursor-pointer">TERMS & CONDITIONS</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
