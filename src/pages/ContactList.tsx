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

const ContactList = () => {
  const { user } = useAuth();
  const { data: users, isLoading: isUsersLoading } = useUsersQuery();
  const { data: contacts, isLoading: isContactsLoading } =
    useContactsByUserIdQuery("ac73b7bc-b58f-47e1-bda1-25538022302c");
  const deleteContact = useDeleteContactMutation();
  const addContact = useAddContactMutation();
  const updateContact = useUpdateContactMutation();

  // State
  const [selectedUser, setSelectedUser] = useState();

  const filteredUsers = () => {
    return users?.filter((user) =>
      contacts?.every((contact) => contact.to.id !== user.id)
    );
  };

  const handleUpdateContact = (
    from_id: string,
    to_id: string,
    is_favorite: boolean
  ) => {
    updateContact.mutate({ from_id, to_id, is_favorite });
  };

  const handleAddContact = () => {
    addContact.mutate({ from_id: user.id, to_id: selectedUser });
  };

  const handleDeleteContact = (from_id: string, to_id: string) => {
    deleteContact.mutate({ from_id, to_id });
  };

  console.log("contacts", contacts);

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Contact list</h1>
        <div className="flex gap-x-8">
          <Select
            value={selectedUser}
            onValueChange={(value) => setSelectedUser(value)}
          >
            <SelectTrigger className="w-[180px] ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {filteredUsers()?.map(({ id, first_name, last_name }) => (
                <SelectItem key={id} value={id}>
                  {first_name} {last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleAddContact}>
            Add contact
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts?.map(
            ({ to: { id, first_name, last_name }, is_favorite }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">
                  {first_name} {last_name} {is_favorite && "⭐️"}
                </TableCell>
                <TableCell className="flex gap-x-8">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleUpdateContact(user.id, id, !is_favorite)
                    }
                  >
                    {is_favorite ? "Remove from favorites" : "Add to favorites"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteContact(user.id, id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </main>
  );
};

export default ContactList;
