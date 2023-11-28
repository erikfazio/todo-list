import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthProvider";
import useContactsByUserIdQuery from "@/hooks/contacts/useContactsQuery";
import useDeleteContactMutation from "@/hooks/contacts/useDeleteContactMutation";
import useUsersQuery from "@/hooks/users/useUsersQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useAddContactMutation from "@/hooks/contacts/useAddContactMutation";
import useUpdateContactMutation from "@/hooks/contacts/useUpdateContactMutation";
import { Input } from "@/components/ui/input";

const ContactList = () => {
  const { user } = useAuth();
  const { data: contacts, isLoading: isContactsLoading } =
    useContactsByUserIdQuery(user.id);
  const deleteContact = useDeleteContactMutation();
  const addContact = useAddContactMutation();
  const updateContact = useUpdateContactMutation();

  console.log(contacts);

  // State
  const [type, setType] = useState("");
  const [value, setValue] = useState("");

  const handleUpdateContact = (
    user_id: string,
    type: string,
    is_favorite: boolean
  ) => {
    updateContact.mutate({ user_id, type, is_favorite });
  };

  const handleAddContact = () => {
    addContact.mutate({ user_id: user.id, type, value });
  };

  const handleDeleteContact = (user_id: string, type: string) => {
    deleteContact.mutate({ user_id, type });
  };

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Contact list</h1>
        <div className="flex gap-x-8">
          <Input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant="outline" onClick={handleAddContact}>
            Add contact
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts?.map(({ type, value, is_favorite }) => (
            <TableRow key={type}>
              <TableCell className="font-medium">
                {type} {is_favorite && "⭐️"}
              </TableCell>
              <TableCell className="font-medium">{value}</TableCell>
              <TableCell className="flex gap-x-8">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleUpdateContact(user.id, type, !is_favorite)
                  }
                >
                  {is_favorite ? "Remove from favorites" : "Add to favorites"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteContact(user.id, type)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default ContactList;
