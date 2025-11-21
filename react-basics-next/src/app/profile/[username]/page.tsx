"use client";

import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();

  return (
    <main className="p-6">
      <h1 className="mb-3 text-2xl font-bold">Welcome, {username}!</h1>
      <p className="text-gray-700">
        This page is rendered from a dynamic route:
        <code className="ml-1 rounded bg-gray-200 px-1 py-0.5 text-sm">
          /profile/[username]
        </code>
        .
      </p>
    </main>
  );
}
