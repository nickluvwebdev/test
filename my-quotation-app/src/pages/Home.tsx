// src/pages/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    // Note: The <header> and <footer> are in Layout.tsx
    // The <main> tag here will be rendered by the <Outlet />
    <main className="flex-grow flex items-center justify-center text-center px-6">
      <section className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Empower Your <br />
          Financial Decisions
        </h1>
        <p className="text-slate-500 mb-8">
          Track, manage, and simplify your finances with clarity <br />
          and confidence — anytime, anywhere
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/quotation" className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            Get started
          </Link>
          <Link to="#" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            Learn more →
          </Link>
        </div>
      </section>
    </main>
  );
}