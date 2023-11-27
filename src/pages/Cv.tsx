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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "../context/AuthProvider";
import { Input } from "@/components/ui/input";
import useUsersQuery from "@/hooks/users/useUsersQuery";
import useSkillQuery from "@/hooks/useSkillQuery";
import useSkillLevelQuery from "@/hooks/skillLevels/useSkillLevelQuery";
import useAddUserSkillMutation from "@/hooks/userSkills/useAddUserSkillMutation";

function Cv() {
  const { user, isAdmin, signOut } = useAuth();
  const { data: users, isLoading: isUsersLoading } = useUsersQuery(); //TODO: Delete from list user I'm not
  const { data: skills, isLoading: isSkillsLoading } = useSkillQuery();
  const { data: skillLevels, isLoading: isSkillLevelsLoading } =
    useSkillLevelQuery();
  const addSkill = useAddUserSkillMutation();

  // State
  const [selectedUser, setSelectedUser] = useState();
  const [selectedSkill, setSelectedSkill] = useState();
  const [selectedSkillLevel, setSelectedSkillLevel] = useState();

  const handleAddUserSkill = () => {
    addSkill.mutate(
      {
        user_id: selectedUser,
        skill_id: selectedSkill,
        skill_level_id: selectedSkillLevel,
      },
      {
        onSuccess: () => {
          setSelectedUser("");
          setSelectedSkill("");
          setSelectedSkillLevel("");
        },
      }
    );
  };

  console.log(users);

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl">CV</h1>
      </div>
      <div className="flex gap-x-8">
        <Select
          value={selectedUser}
          onValueChange={(value) => setSelectedUser(value)}
        >
          <SelectTrigger className="w-[180px] bg-white">
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
        <Select
          value={selectedSkill}
          onValueChange={(value) => setSelectedSkill(value)}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {skills?.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedSkillLevel}
          onValueChange={(value) => setSelectedSkillLevel(value)}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {skillLevels?.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleAddUserSkill}>
          Add a new user skill
        </Button>
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
                  {first_name} {last_name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
}

export default Cv;
