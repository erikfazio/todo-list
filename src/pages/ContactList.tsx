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

const ContactList = () => {
  const { user } = useAuth();
  const { data: users, isLoading: isUsersLoading } = useUsersQuery();
  const { data: contacts, isLoading: isContactsLoading } =
    useContactsByUserIdQuery("ac73b7bc-b58f-47e1-bda1-25538022302c");
  const deleteContact = useDeleteContactMutation();
  const addContact = useAddContactMutation();

  // State
  const [selectedUser, setSelectedUser] = useState();

  const filteredUsers = () => {
    return users;
  };

  const handleAddContact = () => {
    addContact.mutate({ from_id: user.id, to_id: selectedUser });
  };

  const handleDeleteContact = (fromId: string, toId: string) => {
    deleteContact.mutate({ fromId, toId });
  };

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">CV</h1>
      </div>
      <div>
        <Select
          value={selectedUser}
          onValueChange={(value) => setSelectedUser(value)}
        >
          <SelectTrigger className="w-[180px] ">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {users?.map(({ id, first_name, last_name }) => (
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts?.map(({ to }) => (
            <TableRow key={to.id}>
              <TableCell className="font-medium">
                {to.first_name} {to.last_name}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleDeleteContact(user.id, to.id)}
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
