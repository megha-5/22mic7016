const BASE_URL = 'http://4.224.186.213/evaluation-service';

export async function getAuthToken() {

  const credentials = {

    email: "ramkrishna@abc.edu",
    name: "ram krishna",
    rollNo: "aa1bb",
    accessCode: "xgAsNC",
    clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
    clientSecret: "tVJaaaRBSeXcRXeM"

  };

  const response = await fetch(`${BASE_URL}/auth`, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(credentials)

  });

  if (!response.ok) {
    throw new Error('Authentication failed');
  }

  const data = await response.json();

  return data.token;
}

export async function fetchNotifications(
  token,
  limit = 10,
  page = 1,
  type = ''
) {

  let url =
    `${BASE_URL}/notifications?limit=${limit}&page=${page}`;

  if (type) {
    url += `&notification_type=${type}`;
  }

  const response = await fetch(url, {

    method: 'GET',

    headers: {

      'Authorization': `Bearer ${token}`,

      'Content-Type': 'application/json'

    }

  });

  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }

  const data = await response.json();

  return data.notifications;
}