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
import useSkillQuery from "@/hooks/useSkillQuery";
import useAddSkillMutation from "@/hooks/useAddSkillMutation";
import useDeleteSkillMutation from "@/hooks/useDeleteSkillMutation";
import useUserSkillsByUserIdQuery from "@/hooks/userSkills/useUserSkillsQuery";

function Skills() {
  const { user, isAdmin } = useAuth();
  const [newSkill, setNewSkill] = useState("");

  // Skills
  const { data: skills, isLoading: isSkillsLoading } = useSkillQuery();
  const { data: userSkills, isLoading: isUserSkillsLoading } =
    useUserSkillsByUserIdQuery(user.id || "");
  const addSkillMutation = useAddSkillMutation();
  const deleteSkillMutation = useDeleteSkillMutation();

  const addSkill = () => {
    addSkillMutation.mutate(newSkill);
    setNewSkill("");
  };

  const deleteSkill = (id: number) => {
    deleteSkillMutation.mutate(id);
  };

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
      {!isAdmin() && !isUserSkillsLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userSkills?.map(({ name, level }) => (
              <TableRow key={name?.name}>
                <TableCell className="font-medium">{name?.name}</TableCell>
                <TableCell>{level?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}

export default Skills;
