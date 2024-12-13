import Header from "../components/Header";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to TAF - The AI Frontier. By accessing and using this website,
            you agree to comply with and be bound by the following terms and
            conditions.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-lg mb-6">
            By accessing and using TAF - The AI Frontier, you acknowledge that you
            have read, understood, and agree to be bound by these terms and
            conditions. If you do not agree with any part of these terms, please do
            not use our website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Content Usage</h2>
          <p className="text-lg mb-6">
            All content provided on this website is for informational purposes only.
            The content is subject to change without notice, and we make no
            warranties about the accuracy, reliability, or completeness of the
            information provided.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Intellectual Property</h2>
          <p className="text-lg mb-6">
            All content, including but not limited to text, graphics, logos,
            images, and software, is the property of TAF - The AI Frontier and is
            protected by copyright and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. User Conduct</h2>
          <p className="text-lg mb-6">
            Users agree to use the website in a manner consistent with all
            applicable laws and regulations. Any conduct that restricts or inhibits
            any other user from using the website is strictly prohibited.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Modifications</h2>
          <p className="text-lg mb-6">
            We reserve the right to modify these terms at any time without prior
            notice. Your continued use of the website following any changes
            indicates your acceptance of the modified terms.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;