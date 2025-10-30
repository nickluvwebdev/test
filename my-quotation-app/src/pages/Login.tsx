import { Link } from 'react-router-dom';
// Note: You'll need to add your logo to src/assets and import it
// import logo from '../assets/logo.png'; 
// import bg from '../assets/bg.png';

export default function Login() {
  
  // You will add state and handlers here later (Step 3)
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Prevents the browser from refreshing
    console.log("Form submitted!");
    // TODO: Add API call logic here
  };

  return (
    // Note: The Login page in the image doesn't have the main nav/footer,
    // so we can just use the HTML structure as-is.
    <div className="bg-gray-50 font-sans">
      {/* Banner */}
      <header className="relative">
        <div 
          className="h-56 bg-cover bg-center flex items-center justify-center" 
          // style={{ backgroundImage: `url(${bg})` }} // Use this once you import the bg image
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white  px-4 py-2 rounded">
            Financial Management System
          </h1>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex items-center justify-center py-12 px-4">
        <section className="w-full max-w-md bg-white rounded-xl shadow p-8">
          {/* Logo + Title */}
          <div className="text-center mb-8">
            {/* <img src={logo} alt="Logo" className="mx-auto w-12 mb-4" /> */}
            <h2 className="text-xl font-bold">Sign in to your account</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input id="email" type="email" required autoComplete="email"
                     className="mt-2 block w-full rounded-lg bg-gray-100 border border-gray-300 px-2 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-base" />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="#" className="text-sm text-blue-600 hover:text-blue-500">Forgot password?</Link>
              </div>
              <input id="password" type="password" required autoComplete="current-password"
                     className="mt-2 block w-full rounded-lg bg-gray-100 border border-gray-300 px-2 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:text-base" />
            </div>

            {/* Button */}
            <div>
              <button type="submit"
                      className="w-full flex justify-center py-3 px-4 rounded-lg bg-blue-600 text-white font-medium text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Sign in
              </button>
            </div>
          </form>

          {/* Footer text */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?
            <Link to="#" className="font-medium text-blue-600 hover:text-blue-500"> Start a 14 day free trial</Link>
          </p>
        </section>
      </main>
    </div>
  );
}