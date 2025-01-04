# Understanding Next.js Server Actions: A Practical Guide

## Introduction
Next.js Server Actions provide a powerful way to handle form submissions and data mutations directly from the client while executing the logic on the server. Let's explore this concept through a practical todo application implementation.

## Server Actions Setup

First, let's look at how server actions are defined. In our project, we have a server action in `actions.ts`:


```1:21:app/actions.ts
'use server'

export async function create(formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');
  const imageUrl = formData.get('imageUrl');
  const articleUrl = formData.get('articleUrl');
  const slug = formData.get('slug');
  console.log(name, description, imageUrl, articleUrl, slug);
  try {
    const response = await fetch('http://localhost:3000/api/todo', {
    method: 'POST',
    body: JSON.stringify({name, description, imageUrl, articleUrl, slug}),
  });
  const data = await response.json();
  return data;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}
```


The key points here are:
- The `'use server'` directive marks this as a server action
- The function can directly access server resources
- It handles form data submission

## Client-Side Implementation

The client-side form component demonstrates how to use server actions:


```1:40:components/form.tsx
'use client'

import { create } from "@/app/actions";


export const Form = () => {
  return (
     <form action={create}>
     <div className="flex flex-col gap-4 p-4">
      <input
       type="text"
       name="name"
       placeholder="Name"
       className="border p-2 rounded text-black"
      />
      <input
       type="text" 
       name="description"
       placeholder="Description"
       className="border p-2 rounded text-black"
      />
      <div className="flex items-center gap-2">
        <label htmlFor="completed">Mark as completed</label>
        <input
         id="completed"
         type="checkbox"
         name="completed"
         className="border p-2 rounded text-black"
        />
      </div>
      <button 
       type="submit"
       className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
       Submit
      </button>
     </div>
    </form>
  );
};
```


Notable features:
- The `'use client'` directive marks this as a client component
- The form uses the `action` prop to connect to the server action
- No need for manual `preventDefault` or fetch calls

## Database Integration

The server action connects to a SQLite database through an API route:


```1:55:app/api/todo/route.ts
import { apiGet, apiPost } from "../database";

export async function POST(req: Request) {
 const body = await req.json();
 const { name, description, completed } = body;
 const query = `
    INSERT INTO todo (name, description, completed)
    VALUES(?, ?, ?)
  `;
 const values = [name, description, completed];

 let status, respBody;
 await apiPost(query, values)
  .then(() => {
   status = 200;
   respBody = { message: "Successfully created todo" };
  })
  .catch((err) => {
   status = 400;
   respBody = err;
  });
 return Response.json(respBody, {
  status,
 });
}

export async function GET() {
 const query = `
    SELECT * from todo
  `;

 let status, body;
 try {
  await apiGet(query)
   .then((res) => {
    status = 200;
    body = res;
   })
   .catch((err: Error) => {
    status = 400;
    body = { error: err };
   });
  return Response.json(body, {
   status,
  });
 } catch (error: any) {
  console.error(error.message);
  return Response.json(
   { error: error },
   {
    status: 400,
   }
  );
 }
}
```


## Key Benefits of Server Actions

1. **Type Safety**: Full TypeScript support across client and server
2. **Progressive Enhancement**: Forms work even without JavaScript
3. **Simplified Data Mutations**: No need for separate API endpoints
4. **Reduced Client-Side Code**: Less boilerplate for form handling
5. **Direct Database Access**: Server actions can safely interact with the database

## Best Practices

1. Always mark server files with `'use server'`
2. Keep server actions in separate files
3. Use proper error handling
4. Validate data on both client and server sides
5. Consider progressive enhancement

## Resources Used:
1. [Next.js Documentation](https://nextjs.org/docs)
2. [Next.js Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)
3. [React Server Components](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components)

This implementation showcases how Next.js server actions simplify the development process by providing a seamless bridge between client and server-side code, making form handling and data mutations more straightforward and secure.
