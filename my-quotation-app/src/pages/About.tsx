// src/pages/About.tsx

// Per the README, this page must display your information
// in a card format.

export default function About() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        About Us
      </h1>
      
      {/* This is a placeholder card.
        You should replace the information with your own.
      */}
      <div className="bg-white rounded-xl shadow-lg border p-8 max-w-sm mx-auto">
        <div className="text-center">
          {/* You can add an avatar image here */}
          <div 
            className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center 
                       justify-center border"
          >
            <span className="text-gray-500">Avatar</span>
          </div>
          
          <h2 className="text-xl font-semibold">
            {/* TODO: Add Your First and Last Name */}
            Your Firstname Lastname
          </h2>
          <p className="text-blue-600">
            {/* TODO: Add Your Email */}
            your.email@example.com
          </p>
        </div>
      </div>

    </div>
  );
}