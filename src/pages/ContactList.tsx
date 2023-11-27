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
import useUsersQuery from "@/hooks/users/useUsersQuery";

import { useParams } from "react-router-dom";

const ContactList = () => {
  const { user } = useAuth();
  const { data: users, isLoading: isUsersLoading } = useUsersQuery();
  const { data: contacts, isLoading: isContactsLoading } =
    useContactsByUserIdQuery("ac73b7bc-b58f-47e1-bda1-25538022302c");

  console.log(contacts);

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Contact list</h1>
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
                <Button variant="outline">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default ContactList;
