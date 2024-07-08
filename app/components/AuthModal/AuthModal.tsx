'use client';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

type dataType = {
  email: string;
  password: string;
};

export default function AuthModal({ type }: { type?: boolean }) {
  const [data, setData] = useState<dataType>({ email: '', password: '' });
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://crudnestback.onrender.com/auth/sign-${type ? 'up' : 'in'}`,
        {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        if (!type) {
          if (res.status == 401) setError('incorrect password');
          if (res.status === 400) setError('user does not exist');
        }
        if (type) {
          if (res.status === 400) setError('user already exists');
        }
        return;
      }
      if (type) {
        setSuccess('User Created Successfully');
        await setTimeout(() => {
          setSuccess('');
          router.push('/');
        }, 2000);
      }
      if (!type) {
        const response = await res.json();
        setCookie('accessToken', response.accessToken, {
          path: '/',
          maxAge: 3600,
          httpOnly: false,
        });
        router.push('/home');
      }
    } catch (r) {
      console.log(type);
    }
    setError('');
    setData({ email: '', password: '' });
  }
  return (
    <form
      className="w-[380px] h-[500px] bg-slate-800 relative rounded-xl border-2 border-black flex items-center text-white  justify-start pt-20 px-10 flex-col gap-10"
      onSubmit={handleSubmit}
    >
      <p
        className={`${
          success == 'User Created Successfully'
            ? 'text-green-600'
            : 'text-red-500 '
        } absolute top-4`}
      >
        {success !== '' ? success : error}
      </p>
      <h1 className="text-2xl">{type ? 'Sign up' : ' Sign In'}</h1>
      <div className="w-full flex flex-col items-start justify-center gap-1 text-black">
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input
          value={data.email}
          name="email"
          type="text"
          id="email"
          className="w-full h-8 rounded-lg pl-2"
          placeholder="Something@something.com"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-1 text-black">
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          value={data.password}
          name="password"
          type="password"
          id="password"
          className="w-full h-8 rounded-lg"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col justify-center w-full items-start gap-5">
        <button className="self-center w-[150px] h-[50px] bg-slate-400 rounded-[30px] flex items-center justify-center text-2xl">
          {type ? 'Sign up' : 'Sign in'}
        </button>
        {!type ? (
          <p>
            Dont have an account ?{' '}
            <span className="text-blue-700">
              <Link href="/sign-up">Sign Up</Link>
            </span>
          </p>
        ) : (
          <p>
            Already have an account ?{' '}
            <span className="text-blue-700">
              <Link href="/">Log In</Link>
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
