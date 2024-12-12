import Header from "../components/Header";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            At TAF - The AI Frontier, we respect your privacy. When you visit our website, we collect
            personal data such as cookies, IP addresses, and other usage information to enhance your
            browsing experience and provide personalized content.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p className="text-lg mb-6">
            We may use third-party services such as Google Analytics and Google AdSense to analyze
            website traffic and serve targeted ads. These services may collect additional data to
            personalize your experience.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights</h2>
          <p className="text-lg mb-6">
            You have the right to manage your cookie preferences through your browser settings or via
            the options provided on our website. For questions or concerns, please contact us at{" "}
            <a
              href="mailto:mayconbernarde.pro@gmail.com"
              className="text-accent hover:underline"
            >
              mayconbernarde.pro@gmail.com
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;