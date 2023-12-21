
const TargetAudienceSection = () => {

  return (
    <section
      id="target-audience"
      className="py-10 bg-gray-100"
      data-aos="fade-up"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Who Can Benefit from Our Website?
        </h2>
        <p className="text-gray-600 mb-8">
          Our platform is designed to cater to a diverse audience. Whether you
          are a developer, corporate professional, banker, or someone else, you
          will find value in what we offer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
          <div className="bg-white p-6 rounded shadow" data-aos="fade-right">
            <h3 className="text-xl font-semibold mb-2">Developers</h3>
            <p className="text-gray-700">
              Access resources, tutorials, and tools tailored to enhance your
              coding skills. Stay updated with the latest trends and
              technologies.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">
              Corporate Professionals
            </h3>
            <p className="text-gray-700">
              Explore business solutions, management strategies, and industry
              insights. Connect with a community of professionals for networking
              opportunities.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow" data-aos="fade-left">
            <h3 className="text-xl font-semibold mb-2">Bankers</h3>
            <p className="text-gray-700">
              Stay informed about financial trends, regulations, and
              innovations. Access tools that streamline banking processes and
              enhance efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
