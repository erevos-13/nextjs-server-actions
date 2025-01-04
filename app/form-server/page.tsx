export default function FormServer() {
    const createServerAction = async (formData: FormData) => {
        'use server'
        const name = formData.get('name');
        const description = formData.get('description');
        const completed = formData.get('completed');
        console.log(name, description, completed);
    }

  return <div>
     <form action={createServerAction}>
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
  </div>;
}
