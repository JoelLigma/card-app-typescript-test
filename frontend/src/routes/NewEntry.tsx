import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled_for: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };

  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    const isValid = newEntry.title !== "" && newEntry.description !== "";
    if (isValid) {
      saveEntry(newEntry);
      setNewEntry(emptyEntry);
    }
  };

  return (
    <section className="flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 p-8 rounded-md text-black  bg-gray-300 dark:bg-gray-600">
      <input
        className="p-3 rounded-md dark:bg-gray-200"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md dark:bg-gray-200"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <input
        className="p-3 rounded-md dark:bg-gray-200"
        type="date"
        name="scheduled_for"
        value={new Date(newEntry.scheduled_for).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md"
      >
        Create
      </button>
    </section>
  );
}
