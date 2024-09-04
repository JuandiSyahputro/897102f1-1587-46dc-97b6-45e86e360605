'use client';

import IconArrowUp from '../../public/arrow-up.svg';
import IconArrowDown from '../../public/arrow-down.svg';
import Image from 'next/image';
import React from 'react';
interface HeaderTableProps {
  typeSort: (type?: 'first_name' | 'last_name' | 'position') => void;
  typeFilter: {
    first_name: string;
    last_name: string;
    position: string;
  };
}

const HeaderTable: React.FC<HeaderTableProps> = ({ typeSort, typeFilter }) => {
  return (
    <tr>
      <th className="px-6 py-7" onClick={() => typeSort('first_name')}>
        <div className="flex gap-3 items-center group">
          <span>First Name</span>
          <div
            className={`opacity-0 group-hover:opacity-100 ${
              typeFilter.first_name ? 'opacity-100' : ''
            }`}
          >
            <Image
              src={
                typeFilter.first_name === 'asc' ? IconArrowUp : IconArrowDown
              }
              alt="Icon Arrow Up"
              width={25}
              height={25}
            />
          </div>
        </div>
      </th>
      <th className="px-6 py-7" onClick={() => typeSort('last_name')}>
        <div className="flex gap-3 items-center group">
          <span> Last Name</span>
          <div
            className={`opacity-0 group-hover:opacity-100 ${
              typeFilter.last_name ? 'opacity-100' : ''
            }`}
          >
            <Image
              src={typeFilter.last_name === 'asc' ? IconArrowUp : IconArrowDown}
              alt="Icon Arrow Up"
              width={25}
              height={25}
            />
          </div>
        </div>
      </th>
      <th className="px-6 py-7" onClick={() => typeSort('position')}>
        <div className="flex gap-3 items-center group">
          <span>Position</span>
          <div
            className={`opacity-0 group-hover:opacity-100 ${
              typeFilter.position ? 'opacity-100' : ''
            }`}
          >
            <Image
              src={typeFilter.position === 'asc' ? IconArrowUp : IconArrowDown}
              alt="Icon Arrow Up"
              width={25}
              height={25}
            />
          </div>
        </div>
      </th>
      <th className="px-6 py-7">Phone Number</th>
      <th className="px-6 py-7">Email</th>
    </tr>
  );
};

export default HeaderTable;
