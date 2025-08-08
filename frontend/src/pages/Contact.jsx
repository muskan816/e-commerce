const Contact = () => {
  return (
    <div className="bg-white">
      <h1 className="text-2xl font-semibold text-center pt-4 -mb-1">Feel Free To Contact Us</h1>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.625524302271!2d77.6964011!3d12.995786700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae110b04a3be4b%3A0xcffb252dab2e9643!2sPhoenix%20Marketcity!5e0!3m2!1sen!2sin!4v1751654535157!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="mb-10 mt-6"
      ></iframe>

      <div className="max-w-xl mx-auto px-4 -mb-8 -mt-4">
        <form
          action="https://formspree.io/f/mblyejrz"
          method="POST"
          className=" p-6 space-y-4"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="5"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
