import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthProvider";
import { Input } from "@/components/ui/input";
import useSkillQuery from "@/hooks/useSkillQuery";
import useAddSkillMutation from "@/hooks/useAddSkillMutation";
import useDeleteSkillMutation from "@/hooks/useDeleteSkillMutation";

function Skills() {
  const { isAdmin } = useAuth();
  const [newSkill, setNewSkill] = useState("");

  // Skills
  const { data: skills, isLoading: isSkillsLoading } = useSkillQuery();
  const addSkillMutation = useAddSkillMutation();
  const deleteSkillMutation = useDeleteSkillMutation();

  const addSkill = () => {
    addSkillMutation.mutate(newSkill);
    setNewSkill("");
  };

  const deleteSkill = (id: number) => {
    deleteSkillMutation.mutate(id);
  };

  console.log(isAdmin());

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">Skills</h1>
        {isAdmin() && (
          <div className="flex gap-x-4 items-center">
            <Input
              type="text"
              placeholder="Add skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <Button variant="outline" onClick={addSkill}>
              Add skill
            </Button>
          </div>
        )}
      </div>
      {isAdmin() && !isSkillsLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills?.map(({ id, name }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>
                  <Button variant="outline" onClick={() => deleteSkill(id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {/* {isAdmin() && !isSkillsLoading && (
        <ul className="flex flex-col gap-y-4">
          {skills?.map(({ id, name }) => (
            <li
              className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded"
              key={id}
            >
              <div className="flex items-center justify-between gap-x-8">
                <span className="">{name}</span>
              </div>
              <Button variant="outline" onClick={() => deleteSkill(id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )} */}
    </main>
  );
}

export default Skills;
