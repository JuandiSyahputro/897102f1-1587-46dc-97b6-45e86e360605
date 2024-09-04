'use client';

import { useEffect, useRef, useState } from 'react';
import HeaderAction from './components/headerAction';
import HeaderTable from './components/headerTable';
import TbodyTable, { UserState } from './components/tbodyTable';
import { ApiGet, ApiPost, ApiPut, UserProps } from './constants/api';
import Loading from './loading';
const Home: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState({
    first_name: '',
    last_name: '',
    position: '',
    page: 1,
    total_page: 1,
  });
  const [newData, setAddNewData] = useState<UserState>({
    first_name: '',
    last_name: '',
    position: '',
    phone_number: '',
    email: '',
  });
  const [paginate, setPaginate] = useState({
    total_items: 0,
    current_items: 0,
  });
  console.log(newData);
  const [users, setUsers] = useState([]);
  const [addData, setAddData] = useState(false);
  const [isNewData, setIsNewData] = useState(false);
  const [typeSort, setTypeSort] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [typePaginate, setTypePaginate] = useState('next');
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiGet({
          first_name: typeFilter.first_name,
          last_name: typeFilter.last_name,
          position: typeFilter.position,
          page: typeFilter.page,
        });
        setUsers(data.data);
        setIsNewData(false);
        setTypeFilter((prev) => {
          return {
            ...prev,
            page: data.current_page,
            total_page: data.total_pages,
          };
        });
        if (!typeSort) {
          setPaginate((prev) => {
            return {
              ...prev,
              total_items: data.total_items,
              current_items:
                typePaginate == 'next'
                  ? prev.current_items + data.data.length
                  : Math.max(prev.current_items - users.length, 0),
            };
          });
        }
        if (isLoading) {
          setIsLoading(false);
        }
        setTypeSort(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (isLoading) {
        fetchData();
      }
    }
  }, [
    isLoading,
    typeFilter.first_name,
    typeFilter.last_name,
    typeFilter.page,
    typeFilter.position,
  ]);

  async function handleSubmit() {
    try {
      const payload = { ...newData };
      let response;
      console.log(payload.id);
      if (payload.id) {
        response = await ApiPut(payload, payload.id);
      } else {
        delete payload.id;
        response = await ApiPost(payload);
      }
      setIsNewData(true);
      setTypeFilter((prev) => {
        return {
          ...prev,
          first_name: '',
          last_name: '',
          position: '',
        };
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const getTypeSort = (type?: 'first_name' | 'last_name' | 'position') => {
    if (type && typeFilter.hasOwnProperty(type)) {
      setTypeFilter((prev) => {
        const newValue = prev[type] === 'asc' ? 'desc' : 'asc';
        return {
          ...prev,
          first_name: type === 'first_name' ? newValue : '',
          last_name: type === 'last_name' ? newValue : '',
          position: type === 'position' ? newValue : '',
        };
      });
    }
    setIsLoading(true);
    setTypeSort(true);
  };

  const handlePaginate = (type: string) => {
    setTypeFilter((prev) => {
      return {
        ...prev,
        page: type == 'next' ? prev.page + 1 : prev.page - 1,
      };
    });
    setIsLoading(true);
    setTypePaginate(type);
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <HeaderAction setAddData={setAddData} handleSubmit={handleSubmit} />
      <div className="relative overflow-x-auto w-full mt-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-md cursor-pointer text-gray-700 bg-gray-50  ">
            <HeaderTable typeSort={getTypeSort} typeFilter={typeFilter} />
          </thead>
          <tbody>
            {addData && (
              <TbodyTable
                setAddNewData={setAddNewData}
                isNewData={isNewData}
                addData={addData}
              />
            )}
            {users?.length > 0 ? (
              users.map((user: UserProps) => (
                <TbodyTable
                  key={user.id}
                  {...user}
                  setAddNewData={setAddNewData}
                  isNewData={isNewData}
                />
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={6} className="py-5">
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-5 flex w-full justify-end">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700">
              Showing
              <span className="font-semibold text-gray-900 px-1">
                {paginate.current_items}
              </span>
              of
              <span className="font-semibold text-gray-900 px-1">
                {paginate.total_items}
              </span>
              Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900"
                type="button"
                onClick={() => handlePaginate('prev')}
                disabled={typeFilter.page == 1}
              >
                Prev
              </button>
              <button
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 "
                type="button"
                onClick={() => handlePaginate('next')}
                disabled={typeFilter.page == typeFilter.total_page}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
