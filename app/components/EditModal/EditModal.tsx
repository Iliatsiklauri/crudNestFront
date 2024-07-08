import { getCookie } from 'cookies-next';
import React, { useState } from 'react';

export default function EditModal({
  setModal,
  modal,
  id,
  click,
  setClick,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  id: string;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  click: boolean;
}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [cost, setCost] = useState<number | string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFields: { [key: string]: any } = {};

    if (title) updatedFields.title = title;
    if (desc) updatedFields.desc = desc;
    if (cost) updatedFields.cost = cost;

    if (Object.keys(updatedFields).length > 0) {
      const token = getCookie('accessToken');
      fetch(`https://crudnestback.onrender.com/expenses/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      })
        .then((response) => response.json())
        .then((data) => {
          setModal(false);
          setClick(!click);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    setCost('');
    setTitle('');
    setDesc('');
  };
  return (
    <div
      className={`absolute w-full h-full  top-0 left-0 flex items-center justify-center 
      `}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full bg-black opacity-50 z-30 cursor-pointer"
          onClick={() => {
            setModal(false);
          }}
        ></div>
        <form
          className="w-[400px] h-[300px] gap-2 z-50  rounded-xl relative flex flex-col items-center p-3 justify-center bg-slate-500"
          onSubmit={handleSubmit}
        >
          <div
            className="text-2xl absolute top-4 right-4 bg-red-700 px-2 cursor-pointer"
            onClick={() => setModal(false)}
          >
            X
          </div>
          <div className="w-full flex justify-center flex-col relative">
            <div className="flex w-full items-center justify-between">
              <label htmlFor="title">title</label>
              <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                value={title}
              />
            </div>
          </div>
          <div className="w-full flex justify-center flex-col relative">
            <div className="flex w-full justify-between ">
              <label htmlFor="description">description</label>
              <input
                type="text"
                id="description"
                onChange={(e) => setDesc(e.target.value)}
                name="description"
                value={desc}
              />
            </div>
          </div>
          <div className="w-full flex justify-center flex-col relative">
            <div className="flex items-center justify-between">
              <label htmlFor="cost">cost</label>
              <input
                type="number"
                id="cost"
                onChange={(e) => setCost(Number(e.target.value))}
                name="cost"
                value={cost}
              />
            </div>
          </div>
          <button className="bg-green-600 px-2 cursor-pointer">Update</button>
        </form>
      </div>
    </div>
  );
}
function getToken(arg0: string) {
  throw new Error('Function not implemented.');
}
