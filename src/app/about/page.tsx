import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - HuberSoftware",
  description: "Learn about Wes Huber and HuberSoftware's mission to deliver exceptional software solutions with over 10 years of experience in software engineering and product management.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">HuberSoftware</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building innovative software solutions with precision, expertise, and a passion for technology.
              Founded on the principles of quality, innovation, and client success.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Wes Huber</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  With over <strong>10 years of experience</strong> as a software engineer and product manager,
                  Wes Huber founded HuberSoftware to bridge the gap between complex technical challenges
                  and innovative business solutions.
                </p>
                <p>
                  His journey began with a passion for creating efficient, scalable software that makes a
                  real difference. From startup environments to enterprise-level projects, Wes has
                  consistently delivered high-quality solutions that drive business growth and success.
                </p>
                <p>
                  As both a technical expert and strategic thinker, Wes brings a unique perspective to
                  every project, ensuring that technology serves not just functionality, but business
                  objectives and user experience.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Expertise & Experience</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Software Engineering</h4>
                    <p className="text-gray-600 text-sm">Full-stack development, system architecture, and performance optimization</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Product Management</h4>
                    <p className="text-gray-600 text-sm">Strategic planning, agile methodologies, and cross-functional team leadership</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Technology Leadership</h4>
                    <p className="text-gray-600 text-sm">Technical decision-making, team mentoring, and innovation strategy</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Client Relations</h4>
                    <p className="text-gray-600 text-sm">Requirement analysis, project delivery, and long-term partnerships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every project and client relationship at HuberSoftware.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                Every line of code, every feature, and every solution is crafted with attention to detail
                and commitment to excellence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Staying at the forefront of technology to deliver cutting-edge solutions that give our
                clients a competitive advantage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Partnership</h3>
              <p className="text-gray-600">
                Building long-term relationships with clients through transparent communication,
                collaboration, and shared success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A decade of growth, learning, and delivering exceptional software solutions.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">Early Career & Foundation (2014-2017)</h3>
                <p className="text-gray-600 mt-2">
                  Started as a software engineer, building expertise in web development, database design,
                  and system architecture while working on diverse projects across different industries.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">Product Management Transition (2018-2020)</h3>
                <p className="text-gray-600 mt-2">
                  Evolved into product management roles, gaining expertise in agile methodologies,
                  stakeholder management, and strategic product planning while maintaining technical depth.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">Technology Leadership (2021-2023)</h3>
                <p className="text-gray-600 mt-2">
                  Led engineering teams and complex projects, specializing in blockchain technology,
                  mobile applications, and scalable web platforms for startups and established companies.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="ml-6">
                <h3 className="text-lg font-semibold text-gray-900">HuberSoftware Launch (2024)</h3>
                <p className="text-gray-600 mt-2">
                  Founded HuberSoftware to combine deep technical expertise with product management
                  experience, offering comprehensive software solutions that drive business success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}