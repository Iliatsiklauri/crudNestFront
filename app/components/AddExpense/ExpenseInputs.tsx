import React, { useState } from 'react';
type propType = {
  title: string;
  description: string;
  cost: string | number;
};
type propsType = {
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  click: boolean;
};
export default function ExpenseInputs({ click, setClick }: propsType) {
  const [title, setTitle] = useState('');
  const [desctiption, setDesc] = useState('');
  const [cost, setcost] = useState('');
  const [info, setInfo] = useState<propType>({
    title: '',
    description: '',
    cost: '',
  });
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: name === 'cost' ? Number(value) : value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (info.title === '' || info.description === '' || info.cost === null) {
      if (info.title === '') {
        setTitle('description shoud not be empy');
      }
      if (info.description === '') {
        setDesc('description shoud not be empy');
      }
      if (info.cost === '') {
        setcost('cost must not me empty');
      }
      return;
    }
    setTitle('');
    setDesc('');
    setcost('');
    const res = await fetch('http://localhost:4000/expenses', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(info),
    });
    setInfo({
      title: '',
      description: '',
      cost: 0,
    });
    setClick(!click);
  };
  return (
    <form
      className="w-[400px] h-[200px] bg-slate-400 border-2 border-blacj rounded-lg flex items-center justify-center p-2 flex-col gap-3"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex justify-center flex-col relative">
        <div className="flex w-full items-center justify-between">
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            onChange={HandleChange}
            name="title"
            value={info.title}
          />
        </div>
        <p className="text-red-500 absolute text-[13px] right-0 top-5 font-medium">
          {title}
        </p>
      </div>
      <div className="w-full flex justify-center flex-col relative">
        <div className="flex w-full justify-between ">
          <label htmlFor="description">description</label>
          <input
            type="text"
            id="description"
            onChange={HandleChange}
            name="description"
            value={info.description}
          />
        </div>
        <p className="text-red-500 absolute text-[13px] right-0 top-5 font-medium">
          {desctiption}
        </p>
      </div>
      <div className="w-full flex justify-center flex-col relative">
        <div className="flex items-center justify-between">
          <label htmlFor="cost">cost</label>
          <input
            type="number"
            id="cost"
            onChange={HandleChange}
            name="cost"
            value={info.cost}
          />
        </div>
        <p className="text-red-500 absolute text-[13px] right-0 top-5 font-medium">
          {cost}
        </p>
      </div>
      <button className="bg-green-600 px-2 cursor-pointer">Create</button>
    </form>
  );
}
