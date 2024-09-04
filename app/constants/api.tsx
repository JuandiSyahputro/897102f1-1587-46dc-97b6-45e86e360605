'use server';
export interface SortFilter {
  first_name?: string;
  last_name?: string;
  position?: string;
  page?: number;
  email?: string;
  phone_number?: string;
}

export interface UserProps {
  id?: number;
  first_name?: string;
  last_name?: string;
  position?: string;
  phone_number?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

const buildQueryString = (params: SortFilter) => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
    )
    .join('&');
  return queryString;
};

const ApiGet = async ({
  first_name,
  last_name,
  position,
  page,
}: SortFilter) => {
  const queryString = buildQueryString({
    first_name,
    last_name,
    position,
    page,
  });

  const response = await fetch(
    `http://localhost:5000/api/users?${queryString}`
  );
  const users = await response.json();

  return users;
};

const ApiPost = async (data: UserProps) => {
  const response = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.log('Failed to fetch data');
  }

  const users = await response.json();
  return users;
};

const ApiPut = async (data: UserProps, id: number) => {
  const response = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.log('Failed to fetch data');
  }

  const users = await response.json();
  return users;
};

const ApiFindUser = async (params: string) => {
  try {
    const typeEmail = params.includes('@');
    const response = await fetch(
      `http://localhost:5000/api/users/find?${
        typeEmail ? 'email' : 'phone_number'
      }=${params}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Periksa jika respons kosong

    // Parsing JSON
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export { ApiGet, ApiPost, ApiPut, ApiFindUser };
