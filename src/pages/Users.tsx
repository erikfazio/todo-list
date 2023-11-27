import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { Input } from "@/components/ui/input";
import useUsersQuery from "@/hooks/users/useUsersQuery";
import { Link } from "react-router-dom";

function Skills() {
  const { user, isAdmin, signOut } = useAuth();
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
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map(({ id, first_name, last_name }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell className="font-medium">
                  <Link to={`/cv/${id}`}>{`${first_name} ${last_name}`}</Link>
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
