[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/GuFKHi9f)
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/10ULwQo3)
# Faculty of Information and Communication Technology <br/> ITCS257 Frontend Application Development <br/> Basic React (Next.js Edition)
## Objectives

This lab migrates the original Vite-based React exercise to Next.js so students learn React concepts in another real-world framework.
Stack: Next.js (App Router) + TypeScript + Tailwind CSS.. The primary objectives are:

- Understand React components, JSX, props, state (useState) and effects (useEffect) inside a **Next.js** app.

- Structure a project using Next.js App Router (src/app/**) and shared layout.

- Create pages and navigation using file-based routing (static, nested, dynamic).

- [**Re**]Build reusable components and manage state.

Implement a form with validation and user feedback.

Use modern tooling (Next.js, TypeScript, Tailwind).

## Exercise Tasks

This exercise set mirrors your previous React+Vite lab, adapted for Next.js. Complete all tasks to demonstrate competence with components, props, state, and routing.

Note: Anywhere you use React state or lifecycle (e.g., useState, useEffect), the component must be a Client Component in Next.js (add "use client" at the top of the file

### Exercise 1: Set Up a Next.js Project with Tailwind

Create a new Next.js (TypeScript, App Router) project and configure Tailwind.

1. Create project

-- Select use Default, Tailwind Css should be installed

```bash
npx create-next-app@latest react-basics-next \
  --typescript --src-dir --app --eslint
cd react-basics-next
```

**(Optional) Path alias for imports**
Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": { "@/*": ["*"] }
  }
}
```
2. Start the development server:

```bash
npm run dev
```

If you have not installed tailwindcss by the default setup:
Please consult https://nextjs.org/docs/app/guides/tailwind-v3-css

### Exercise 2: Creating a Profile Card Component

Create a reusable `ProfileCard` component that displays user information.

- File: `src/components/ProfileCard.tsx`
- Props:
```ts
export interface ProfileCardProps {
  name: string;
  role: string;
  avatar?: string;     // optional image URL
  isActive?: boolean;  // optional (default false)
}
```

- Requirements:
  - Display name, role, and avatar (fallback if missing)
  - Conditional styling for `isActive` (e.g., badge or border color)
  - Tailwind for layout/typography
- Demo on the home page `src/app/page.tsx`.

**Example render (home page):**
```tsx
import ProfileCard from "@/components/ProfileCard";

export default function Home() {
  return (
    <section className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ProfileCard name="Alex Chen" role="Frontend Dev" isActive />
      <ProfileCard name="Mia Park" role="UI/UX Designer" avatar="/avatar.png" />
    </section>
  );
}
```

---

### Exercise 3: Building an Advanced Counter (Multiple States)

Create an interactive counter demonstrating state management.

- File: `src/components/AdvancedCounter.tsx`
- **This must be a Client Component**:
```tsx
"use client";
```

- Features:
  - Show current count
  - Buttons: **Increment**, **Decrement**, **Reset**
  - Track and display how many times each button was clicked
  - A **Double** button to multiply the current count by 2
  - Tailwind styling

- Place it on a page (e.g., `src/app/page.tsx` or a dedicated `/counter` page you create).

---

### Exercise 4: Form with State Management & Validation

Create a form component that demonstrates controlled inputs and validation.

- File: `src/components/UserForm.tsx` (Client Component)
- Fields: **name**, **email**, **age**
- Requirements:
  - All fields required
  - Email format validation
  - Age must be a number between **10 and 80**
  - On submit, display collected info (or show validation errors)
  - Tailwind styling and clear error messages

- Render this form on a separate page (e.g. `/contact` page you’ll create in the routing lab).

---

### Exercise 5: Routing Lab (Static, Nested, Dynamic) ✅ *New*

Practice **Next.js App Router** by creating multiple routes and navigation.

#### A) Static Pages + Navigation
- Create:
  - `src/app/about/page.tsx` → renders “About”
  - `src/app/contact/page.tsx` → renders “Contact”
- Create a `Navbar` component with **client-side navigation**:
  - File: `src/components/Navbar.tsx` (Client Component)
  - Use `next/link` and `usePathname()` to highlight the active link
- Import `Navbar` in `src/app/layout.tsx` so it appears on all pages.

Note: https://nextjs.org/docs/app/api-reference/functions/use-pathname

**Navbar starter:**
```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const link = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-3 py-2 rounded ${
        pathname === href ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="flex gap-2 p-4 border-b">
      {link("/", "Home")}
      {link("/about", "About")}
      {link("/contact", "Contact")}
    </nav>
  );
}
```

#### B) Nested Route
- Create a nested page:
  - `src/app/team/member/page.tsx` → URL `/team/member`
  - Show a simple team member intro (static content is fine)

#### C) Dynamic Route
- Create: `src/app/profile/[username]/page.tsx` → URL `/profile/alice`
- Read the dynamic param using `useParams()` and render it.
```tsx
"use client";
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Welcome, {username}!</h1>
      <p className="text-gray-600">This page was generated from a dynamic route.</p>
    </div>
  );
}
```

**Bonus (optional):**
- Add `src/app/products/[id]/page.tsx` and render the `id`.
- Link to a few example product pages from `/` (e.g., `/products/1`, `/products/2`).
- Use Layout.tsx to provide a nested layout for team/member page

---

## Suggested File Structure

```
src/
  app/
    layout.tsx
    globals.css
    page.tsx                → Home
    about/
      page.tsx              → /about
    contact/
      page.tsx              → /contact
    team/
      member/
        page.tsx            → /team/member
    profile/
      [username]/
        page.tsx            → /profile/:username
  components/
    Navbar.tsx              → site-wide nav (client)
    ProfileCard.tsx
    AdvancedCounter.tsx
    UserForm.tsx
  public/
    avatar.png              → assets if needed
```

---

## The user interface of the application

- **Home**: shows `ProfileCard`, `AdvancedCounter`, or links to other pages  
- **About / Contact**: simple content pages  
- **/team/member**: nested route example  
- **/profile/[username]**: dynamic route page  
- **Navbar**: visible on all pages with active link highlight **<-- Hint is to use root's layout OwO9**

---

## Submission

1. **AI Declaration & Reflection**  
   Add your declaration at the top of **`src/app/page.tsx`** . See examples below.
2. **Push your code** to the provided GitHub Classroom repository.
3. Submit by the deadline to the LAs. Late submissions may not be accepted.

---

## AI Usage Declaration and Reflection

Students must add an AI Declaration and Reflection of Today's Learning to the top of their code file.

A reflection is not a summary of what you did or what the AI generated.
Instead, it is a personal explanation of your learning process.

- If you used AI, focus on how AI impacted your learning or understanding of the code.
- If you did not use AI, focus on your learning, tools, and experience from the lab.

Here are examples:

### Example 1 – No AI Used

```tsx
/*
AI Declaration:
No Generative AI tools were used for this lab.
All code was written manually by the student.

Reflection:
[ Your Reflection goes here
Today’s lab helped me learn [key takeaway].
I practiced ...
]
*/

```

### Example 2 – AI Used for Reference

```tsx
/*
AI Declaration:
I used ChatGPT only to clarify HTML semantic tags.
No code was directly copied without modification.

Reflection:
[ Write 1–2 sentences reflecting on your learning or how AI impacted your understanding]
*/

```

### Example 3 – AI Assisted in Debugging

```tsx
/*
AI Declaration:
I used ChatGPT to help debug the table structure in my invoice layout.
I wrote all the other code, and I understand the entire implementation.

Reflection:
[ Write 1–2 sentences reflecting on your learning or how AI impacted your understanding ]
*/

```

### Note:
### CSS Modules (recommended for per-component styling)

1. Create a .module.css file next to your component

```
src/components/ProfileCard.tsx
src/components/ProfileCard.module.css
```

2. Add your styles in the module file
```
/* ProfileCard.module.css */
.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-3px);
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}
.name {
  font-size: 1.25rem;
  font-weight: bold;
}
.role {
  color: #555;
}
```

3. Import and apply the classes in your component
```
import styles from "./ProfileCard.module.css";

export default function ProfileCard() {
  return (
    <div className={styles.card}>
      <img src="/avatar.png" alt="Profile" className={styles.avatar} />
      <h2 className={styles.name}>Alex Chen</h2>
      <p className={styles.role}>Frontend Developer</p>
    </div>
  );
}
```
