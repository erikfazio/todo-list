import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "../context/AuthProvider";
import useUsersQuery from "@/hooks/users/useUsersQuery";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Skills() {
  const { isAdmin } = useAuth();
  const { data: users, isLoading: isUsersLoading } = useUsersQuery();

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Users</h1>
      </div>
      {isAdmin() && !isUsersLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map(({ id, first_name, last_name }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">
                  <Link to={`/cv/${id}`}>{`${first_name} ${last_name}`}</Link>
                </TableCell>
                <TableCell>
                  <Link to={`/cv/${id}`}>
                    <Button variant="outline">Open CV</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}

export default Skills;
