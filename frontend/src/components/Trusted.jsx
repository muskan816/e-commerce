const Trusted = () => {
  return (
    <section className="bg-white py-10">
      <div className="text-center mb-8 px-4">
        <h2 className="text-gray-700 font-semibold text-lg md:text-xl">
          Trusted By 1000+ Companies
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center lg:gap-20 sm:gap-10">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="Google"
            className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft"
            className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png"
            alt="Slack"
            className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition"
          />
          <img
            src="https://cdn.shopify.com/assets/images/logos/shopify-bag.png"
            alt="Shopify"
            className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix"
            className="h-8 sm:h-10 object-contain grayscale hover:grayscale-0 transition"
          />
        </div>
      </div>
    </section>
  );
};

export default Trusted;
