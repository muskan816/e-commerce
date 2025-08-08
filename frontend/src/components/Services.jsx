import { FaTruck, FaShieldAlt, FaMoneyBillWave, FaLock } from "react-icons/fa";

const Services = () => {
  return (
    <section className="py-12 bg-[#f5faff]">
      <div className="max-w-[1200px] mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="bg-white rounded-full p-4 mb-4">
            <FaTruck size={28} className="text-indigo-600" />
          </div>
          <p className="text-sm font-medium text-gray-800">
            Super Fast and Free Delivery
          </p>
        </div>

        {/* Service 2 - stacked */}
        <div className="flex flex-col gap-8">
          <div className="bg-gray-100 p-6 rounded-lg flex items-center gap-4 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="bg-white rounded-full p-3">
              <FaShieldAlt size={24} className="text-indigo-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">
              Non-contact Shipping
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg flex items-center gap-4 shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <div className="bg-white rounded-full p-3">
              <FaMoneyBillWave size={24} className="text-indigo-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">
              Money-back Guaranteed
            </p>
          </div>
        </div>

        {/* Service 3 */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
          <div className="bg-white rounded-full p-4 mb-4">
            <FaLock size={28} className="text-indigo-600" />
          </div>
          <p className="text-sm font-medium text-gray-800">
            Super Secure Payment System
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
