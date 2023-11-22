import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import supabase from "../supabase";
import { useAuth } from "../context/AuthProvider";
import clsx from "clsx";

function Skills() {
  const { user, signOut } = useAuth();
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  async function getSkills() {
    const { data, error } = await supabase.from("skills").select();
    if (error) console.log("error", error);
    else setSkills(data);
  }

  function getFilteredSkills() {
    console.log(skills, userSkills);
    return skills.filter((skill) =>
      userSkills.every((s) => s.skills.name !== skill.name)
    );
  }

  async function addUserSkill() {
    const skillId = skills.find((skill) => skill.name === selectedSkill)?.id;
    const { data, error } = await supabase
      .from("user_skills")
      .insert({ skill_id: skillId, user_id: user.id })
      .select("id, skills(name) as name");
    if (error) console.log("error", error);
    else setUserSkills([...userSkills, data[0]]);
  }

  async function deleteUserSkill(id: number) {
    const { error } = await supabase.from("user_skills").delete().eq("id", id);
    if (error) console.log("error", error);
    else setUserSkills(userSkills.filter((skill) => skill.id !== id));
  }

  async function getUserSkills() {
    const { data, error } = await supabase
      .from("user_skills")
      .select("id, skills(name) as name")
      .eq("user_id", user.id);
    if (error) console.log("Error", error);
    else setUserSkills(data);
  }

  useEffect(() => {
    getSkills().catch(console.error);
    getUserSkills().catch(console.error);
  }, []);

  console.log(getFilteredSkills());

  return (
    <div>
      <main className="mt-16 container mx-auto flex flex-col gap-y-8">
        <div className="flex gap-x-4 items-center">
          <Select onValueChange={(skill) => setSelectedSkill(skill)}>
            <SelectTrigger className="bg-white w-[180px]">
              <SelectValue placeholder="Choose one skill" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {getFilteredSkills()?.map(({ id, name }) => (
                <SelectItem key={id} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={addUserSkill}>
            Add skill
          </Button>
        </div>
        <ul className="flex flex-col gap-y-4">
          {userSkills &&
            userSkills.map(({ id, skills: { name } }) => (
              <li
                className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded"
                key={id}
              >
                <div className="flex items-center justify-between gap-x-8">
                  <span className={clsx("", {})}>{name}</span>
                </div>
                <Button variant="outline" onClick={() => deleteUserSkill(id)}>
                  Delete
                </Button>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}

export default Skills;
