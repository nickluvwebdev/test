import { useState } from "react";

export default function UserForm() {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, age } = form;

    if (!name || !email || !age) return setError("All fields are required");
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Invalid email format");
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 10 || ageNum > 80)
      return setError("Age must be between 10 and 80");

    setError("");
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", age: "" });
    setSubmitted(false);
  };

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">User Information Form</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label className="block font-medium mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input" />

          <label className="block font-medium mb-1">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="input" />

          <label className="block font-medium mb-1">Age</label>
          <input name="age" value={form.age} onChange={handleChange} className="input" />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <div className="flex gap-2 mt-2">
            <button type="submit" className="btn btn-blue">
              Submit
            </button>
            <button type="button" onClick={resetForm} className="btn btn-gray">
              Reset
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-green-100 rounded-md text-left">
          <p className="font-semibold text-green-700 mb-2">
            ✅ Submission Successful
          </p>
          <ul className="list-disc ml-5">
            <li><strong>Name:</strong> {form.name}</li>
            <li><strong>Email:</strong> {form.email}</li>
            <li><strong>Age:</strong> {form.age}</li>
          </ul>
          <button onClick={resetForm} className="btn btn-blue mt-3">
            Submit another response
          </button>
        </div>
      )}
    </div>
  );
}
