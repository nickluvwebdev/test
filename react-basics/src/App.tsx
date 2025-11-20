/*
AI Declaration:
I used ChatGPT to help structure the overall App layout and connect components.
I understand all parts of the code and customized the styling.

Reflection:
This helped me learn how to organize multiple React components and style them with Tailwind.
*/

import ProfileCard from "./components/ProfileCard";
import AdvancedCounter from "./components/AdvancedCounter";
import UserForm from "./components/UserForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
        React Lab 9 — Basic Components
      </h1>

      {/* ProfileCard Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Profile Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          <ProfileCard name="Nick Luv" role="Web Developer" isActive={true} avatar="https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png" />
          <ProfileCard name="Sara" role="Designer" isActive={false} avatar="https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png" />
          <ProfileCard name="Tom" role="Project Manager" isActive={false} avatar="https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png"/>
        </div>
      </section>

      {/* Counter Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Counter</h2>
        <AdvancedCounter />
      </section>

      {/* User Form Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">User Form</h2>
        <UserForm />
      </section>
    </div>
  );
}

export default App;
