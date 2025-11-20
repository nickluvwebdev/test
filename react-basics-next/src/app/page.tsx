import ProfileCard from "@/components/ProfileCard";
import AdvancedCounter from "@/components/AdvancedCounter";
import Userform from "@/components/UserForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="p-6 mb-40">
        <h1 className="mb-4 text-2xl font-bold">Profile Cards Demo</h1>

        <section className="grid gap-20 sm:grid-cols-2 lg:grid-cols-3">
          <ProfileCard
            name="Alex Chen"
            role="Frontend Dev"
            isActive={false} 
            avatar="https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png"
          />
          <ProfileCard
            name="Mia Park"
            role="UI/UX Designer"
            isActive={false} 
            avatar="https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png"
          />
          <ProfileCard
            name="Nick"
            role="ITCS257 Student"
            isActive={true} 
            avatar="https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png"
          />
        </section>
      </section>
            <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Advanced Counter</h2>
        <AdvancedCounter />
      </section>
            <section>
        <h2 className="text-2xl font-semibold mb-4">User Form</h2>
        <Userform />
      </section>
    </main>
  );
}
