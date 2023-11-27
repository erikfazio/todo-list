import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSkillLevelQuery from "@/hooks/skillLevels/useSkillLevelQuery";
import useSkillQuery from "@/hooks/useSkillQuery";
import useAddUserSkillMutation from "@/hooks/userSkills/useAddUserSkillMutation";
import useDeleteUserSkillMutation from "@/hooks/userSkills/useDeleteUserSkillMutation";
import useUserSkillsByUserIdQuery from "@/hooks/userSkills/useUserSkillsQuery";
import useUserByIdQuery from "@/hooks/users/useUserByIdQuery";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CvUser = () => {
  const { userId } = useParams();
  const { data: user, isLoading: isProfileLoading } = useUserByIdQuery(
    userId || ""
  );
  const { data: skills, isLoading: isSkillsLoading } = useSkillQuery();
  const { data: userSkills, isLoading: isUserSkillsLoading } =
    useUserSkillsByUserIdQuery(userId || "");
  const { data: skillLevels, isLoading: isSkillLevelsLoading } =
    useSkillLevelQuery();
  const addUserSkill = useAddUserSkillMutation();
  const deleteUserSkill = useDeleteUserSkillMutation();

  // State
  const [selectedSkill, setSelectedSkill] = useState();
  const [selectedSkillLevel, setSelectedSkillLevel] = useState();

  const filteredSkills = () =>
    skills?.filter(
      (skill) =>
        !userSkills?.some((userSkill) => userSkill.name.name === skill.name)
    );

  const handleAddUserSkill = () => {
    addUserSkill.mutate(
      {
        user_id: userId,
        skill_id: selectedSkill,
        skill_level_id: selectedSkillLevel,
      },
      {
        onSuccess: () => {
          setSelectedSkill("");
          setSelectedSkillLevel("");
        },
      }
    );
  };

  const deleteSkill = (skillId: number, userId: string) => {
    deleteUserSkill.mutate({ skillId, userId });
  };

  return (
    <main className="mt-16 container mx-auto flex flex-col gap-y-8">
      <div className="flex justify-between">
        {!isProfileLoading && (
          <h1 className="font-bold text-4xl">
            {user.first_name} {user.last_name}
          </h1>
        )}
      </div>
      <div>
        <div className="flex gap-x-8">
          <Select
            value={selectedSkill}
            onValueChange={(value) => setSelectedSkill(value)}
          >
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {filteredSkills()?.map(({ id, name }) => (
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
      </div>
      {!isUserSkillsLoading && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Skill</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userSkills?.map(({ skill_id, user_id, name, level }) => (
              <TableRow key={name?.name}>
                <TableCell className="font-medium">{name?.name}</TableCell>
                <TableCell>{level?.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => deleteSkill(skill_id, user_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </main>
  );
};

export default CvUser;
