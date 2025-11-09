"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/login', { email, password });
      router.push('/dashboard');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Log in</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="border p-3 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-3 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="rounded-full bg-primary text-white py-2" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
      </form>
    </div>
  );
}
