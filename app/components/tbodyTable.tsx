'use client';
import React, { FocusEvent, useState } from 'react';
import { ApiFindUser, UserProps } from '../constants/api';

export type UserState = {
  id?: number;
  first_name?: string;
  last_name?: string;
  position?: string;
  phone_number?: string;
  email?: string;
  edit?: boolean;
};

interface TbodyTableProps extends UserProps {
  setAddNewData?: (value: UserState) => void;
  isNewData?: boolean;
  addData?: boolean;
}
const TbodyTable: React.FC<TbodyTableProps> = ({
  setAddNewData,
  isNewData,
  addData,
  ...props
}) => {
  const { id, first_name, last_name, position, phone_number, email } = props;
  const [user, setUser] = useState({
    ...props,
  });
  const [userFocus, setUserFocus] = useState({
    firstNameEdit: false,
    lastNameEdit: false,
    positionEdit: false,
    phoneNumberEdit: false,
    emailEdit: false,
  });
  const [existData, setExistData] = useState({
    email: false,
    phone_number: false,
  });

  const handleOnBlur = (
    e: FocusEvent<HTMLInputElement>,
    key: keyof typeof user,
    typeEdit: keyof typeof userFocus
  ) => {
    const { value, id, name } = e.target;
    const isValueChanged = user[key] !== value;
    setUser({ ...user, [key]: value });
    setUserFocus({ ...userFocus, [typeEdit]: isValueChanged });
    setExistData({ ...existData, [key]: false });
    if (setAddNewData) {
      setAddNewData({ ...user, [key]: value, id: Number(id) });
    }

    if ((name == 'email' || name == 'phone_number') && addData) {
      checkUserExist(value);
    }
  };

  const checkUserExist = async (param: string) => {
    try {
      const response = await ApiFindUser(param);

      setExistData((prev) => {
        return {
          ...prev,
          email: prev.email || response.email === param,
          phone_number: prev.phone_number || response.phone_number === param,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr className="bg-white border-b">
      <td className="font-medium text-gray-900 whitespace-nowrap">
        <input
          type="text"
          defaultValue={first_name}
          className={`w-full h-full px-6 py-4 focus:outline-none border-b-2 border-transparent ${
            user.first_name === ''
              ? 'focus:border-b-rose-400'
              : 'focus:border-b-emerald-400'
          } ${
            user.first_name === '' && userFocus.firstNameEdit && !isNewData
              ? 'bg-rose-400'
              : userFocus.firstNameEdit && !isNewData
              ? 'bg-emerald-400'
              : ''
          }`}
          onBlur={(e) => handleOnBlur(e, 'first_name', 'firstNameEdit')}
          id={String(id)}
        />
      </td>
      <td className="font-medium text-gray-900 whitespace-nowrap">
        <input
          type="text"
          defaultValue={last_name}
          className={`w-full h-full px-6 py-4 focus:outline-none border-b-2 border-transparent ${
            user.last_name === ''
              ? 'focus:border-b-rose-400'
              : 'focus:border-b-emerald-400'
          } ${
            user.last_name === '' && userFocus.lastNameEdit && !isNewData
              ? 'bg-rose-400'
              : userFocus.lastNameEdit && !isNewData
              ? 'bg-emerald-400'
              : ''
          }`}
          onBlur={(e) => handleOnBlur(e, 'last_name', 'lastNameEdit')}
          id={String(id)}
        />
      </td>
      <td className="font-medium text-gray-900 whitespace-nowrap">
        <input
          type="text"
          defaultValue={position}
          className={`w-full h-full px-6 py-4 focus:outline-none border-b-2 border-transparent ${
            user.position === ''
              ? 'focus:border-b-rose-400'
              : 'focus:border-b-emerald-400'
          } ${
            user.position === '' && userFocus.positionEdit && !isNewData
              ? 'bg-rose-400'
              : userFocus.positionEdit && !isNewData
              ? 'bg-emerald-400'
              : ''
          }`}
          onBlur={(e) => handleOnBlur(e, 'position', 'positionEdit')}
          id={String(id)}
        />
      </td>
      <td className="relative font-medium text-gray-900 whitespace-nowrap">
        <input
          type="text"
          defaultValue={phone_number}
          className={`w-full h-full px-6 py-4 focus:outline-none border-b-2 border-transparent ${
            user.phone_number === ''
              ? 'focus:border-b-rose-400'
              : 'focus:border-b-emerald-400'
          } ${
            (user.phone_number === '' &&
              userFocus.phoneNumberEdit &&
              !isNewData) ||
            (existData.phone_number && !id)
              ? 'bg-rose-400'
              : userFocus.phoneNumberEdit && !isNewData
              ? 'bg-emerald-400'
              : ''
          }`}
          onBlur={(e) => handleOnBlur(e, 'phone_number', 'phoneNumberEdit')}
          id={String(id)}
          name="phone_number"
        />

        {existData.phone_number && addData && (
          <div className="absolute bg-rose-600 w-full h-8 text-[12px] -bottom-[30px] grid place-items-center text-white z-10">
            Phone number {''}
            already exist
          </div>
        )}
      </td>
      <td className="relative font-medium text-gray-900 whitespace-nowrap">
        <input
          type="text"
          defaultValue={email}
          className={`w-full h-full px-6 py-4 focus:outline-none border-b-2 border-transparent ${
            user.email === ''
              ? 'focus:border-b-rose-400'
              : 'focus:border-b-emerald-400'
          } ${
            (user.email === '' && userFocus.emailEdit && !isNewData) ||
            (existData.email && !id)
              ? 'bg-rose-400'
              : userFocus.emailEdit && !isNewData
              ? 'bg-emerald-400'
              : ''
          }`}
          onBlur={(e) => handleOnBlur(e, 'email', 'emailEdit')}
          id={String(id)}
          name="email"
        />
        {existData.email && addData && (
          <div className="absolute bg-rose-600 w-full h-8 text-[12px] -bottom-[30px] grid place-items-center text-white z-10">
            Email already exist
          </div>
        )}
      </td>
    </tr>
  );
};

export default TbodyTable;
