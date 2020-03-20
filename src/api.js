export default async function lambda(body) {
  const request = new Request(
    'https://0nw5r882o8.execute-api.us-east-1.amazonaws.com/api',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  );
  const response = await fetch(request);
  const data = await response.json();
  return data;
}
