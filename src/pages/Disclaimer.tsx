import Header from "../components/Header";
import Footer from "../components/Footer";

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to TAF - The AI Frontier. Please read this disclaimer carefully
            before using our website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information Accuracy</h2>
          <p className="text-lg mb-6">
            The information provided on this website is for general informational
            purposes only. While we strive to keep the information up to date and
            accurate, we make no representations or warranties of any kind, express
            or implied, about the completeness, accuracy, reliability, suitability,
            or availability of the information contained on the website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">External Links</h2>
          <p className="text-lg mb-6">
            Our website may contain links to external websites that are not
            provided or maintained by us. We do not guarantee the accuracy,
            relevance, timeliness, or completeness of any information on these
            external websites.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Professional Advice</h2>
          <p className="text-lg mb-6">
            The content on this website is not intended to be a substitute for
            professional advice. Always seek the advice of qualified professionals
            regarding any questions you may have about technical or business
            decisions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-lg mb-6">
            In no event will we be liable for any loss or damage including without
            limitation, indirect or consequential loss or damage, or any loss or
            damage whatsoever arising from loss of data or profits arising out of,
            or in connection with, the use of this website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Updates</h2>
          <p className="text-lg mb-6">
            We reserve the right to make changes and corrections to this disclaimer
            at any time without prior notice. Please check this page periodically
            for updates.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;