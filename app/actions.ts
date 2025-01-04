'use server'

export async function create(formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');
  const completed = formData.get('completed');
  try {
    const response = await fetch('http://localhost:3000/api/todo', {
    method: 'POST',
    body: JSON.stringify({name, description, completed}),
  });
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}