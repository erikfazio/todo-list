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

function Skills() {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Users</h1>
      </div>
      {isAdmin() && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {skills?.map(({ id, name }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => deleteSkill(id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      )}
    </main>
  );
}

export default Skills;
