
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <div className="text-2xl font-bold">DBDDAK</div>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/blog" className="hover:underline">Blog</Link>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Boda Boda Drivers Association of Kenya</h1>
          <p className="text-xl mb-8 text-gray-700">Empowering digital riders across Kenya through advocacy, education, and innovation.</p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/blog">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Read Our Blog
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Join DBDDAK
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Rider Advocacy</h2>
            <p className="text-gray-700">Fighting for fair commissions, better working conditions, and protecting rider rights.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Safety Programs</h2>
            <p className="text-gray-700">Promoting safe riding practices through training, verification, and community outreach.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Digital Innovation</h2>
            <p className="text-gray-700">Embracing technology solutions from electric bikes to improved rider verification systems.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
