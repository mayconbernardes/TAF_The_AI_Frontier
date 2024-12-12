import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to TAF - The AI Frontier! Our mission is to explore and share the latest advancements,
            trends, and innovations in artificial intelligence. Whether you're an AI enthusiast, a tech
            professional, or simply curious about how AI is transforming the world, we aim to provide
            valuable insights through expert interviews, in-depth articles, and tutorials.
          </p>
          <p className="text-lg mb-6">
            I am Maycon Bernardes, a passionate web developer with a strong interest in AI. My goal is
            to share knowledge about AI's potential to revolutionize industries, societies, and everyday
            life. Join me as we journey together into the frontier of AI technology!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;