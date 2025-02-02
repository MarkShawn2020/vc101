'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto">
      <div className="flex flex-col items-center mb-8">
        <Logo mode="svg" className="w-[120px] h-auto mb-4" color="currentColor" />
        <h1 className="text-2xl font-semibold">登录到 CS Magic</h1>
      </div>
      <form className="flex-1 flex flex-col w-full gap-4" onSubmit={handleLogin}>
        <Input
          name="email"
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? '登录中...' : '登录'}
        </Button>
        <p className="text-sm text-center text-gray-600">
          还没有账号？{' '}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            立即注册
          </a>
        </p>
      </form>
    </div>
  );
}
