import React, { useState } from 'react';
import EditModal from '../EditModal/EditModal';
import { getCookie } from 'cookies-next';
type PropType = {
  title: string;
  description: string;
  cost: number;
  _id: string;
};

export default function SingleExpenseBox({
  data,
  setClick,
  click,
}: {
  data: PropType;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  click: boolean;
}) {
  const [modal, setModal] = useState(false);
  async function deleteExpense(_id: string) {
    try {
      const token = getCookie('accessToken');
      const response = await fetch(
        `https://crudnestback.onrender.com/expenses/${_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.log(error, 'error');
    }
  }
  return (
    <div className="">
      {modal ? (
        <EditModal
          modal={modal}
          setModal={setModal}
          id={data._id}
          click={click}
          setClick={setClick}
        />
      ) : null}
      <div className="bg-slate-400 h-[200px] relative p-5 flex flex-col items-start justify-center gap-4">
        <p className="text-[17px] font-medium">
          <span className="font-bold">title: </span>
          {data.title}
        </p>
        <p className="text-[17px] font-medium">
          <span className="font-bold">description: </span>
          {data.description}
        </p>
        <p className="text-[17px] font-medium">
          <span className="font-bold">cost: </span>
          {data.cost}
        </p>
        <button
          className="w-[80px] h-[30px] bg-red-600 text-black absolute top-2 right-2 cursor-pointer rounded-md"
          onClick={() => {
            deleteExpense(data._id);
            setClick(!click);
          }}
        >
          delete
        </button>
        <button
          className="w-[80px] h-[30px] bg-yellow-500 text-black absolute top-2 right-24 cursor-pointer rounded-md"
          onClick={() => setModal(true)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
