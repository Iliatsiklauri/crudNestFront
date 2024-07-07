'use client';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <div className="w-full h-[80px] bg-slate-800 absolute top-0 flex items-center px-20 justify-between">
      <h2 className="text-3xl text-blue-650">Expenses Manager</h2>
      <Link href="/" legacyBehavior>
        <span
          className="w-[100px] h-[40px] rounded-2xl cursor-pointer bg-red-500 flex items-center justify-center"
          onClick={() => deleteCookie('accessToken')}
        >
          Log out
        </span>
      </Link>
    </div>
  );
}
