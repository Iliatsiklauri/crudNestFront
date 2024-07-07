'use client';
import ExpenseInputs from '@/app/components/AddExpense/ExpenseInputs';
import Header from '@/app/components/header/Header';
import SingleExpenseBox from '@/app/components/SingleExpense/SingleExpenseBox';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [realData, setData] = useState<any[]>([]);
  const [click, setClick] = useState(false);
  const [id, setId] = useState(null);
  async function currentUser() {
    const data = await fetch(`http://localhost:4000/auth/current-user`, {
      method: 'GET',
      credentials: 'include',
    });
    return data.json();
  }
  async function getData(id: string) {
    const data = await fetch(`http://localhost:4000/users/${id}`, {
      method: 'GET',
      credentials: 'include',
    });
    return data.json();
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const data2 = await currentUser();
        const data1 = await getData(data2.id);
        setData(data1.expenses);
      } catch (e) {
        console.log(e, 'error here');
      }
    }
    fetchData();
  }, [click]);
  return (
    <div className="w-full h-full bg-gray-500 text-xl flex items-center justify-center min-h-screen pt-[100px] relative overflow-hidden flex-col">
      <Header />
      <ExpenseInputs click={click} setClick={setClick} />
      <div className="w-full h-full p-5 grid grid-cols-3 gap-2 items-start">
        {realData.length > 0 ? (
          realData.map((el: any, key: number) => (
            <SingleExpenseBox
              data={el}
              key={key}
              setClick={setClick}
              click={click}
            />
          ))
        ) : (
          <p>empty</p>
        )}
      </div>
    </div>
  );
}
