import { UserData } from "@/widgets/Tables/Users/model/types";

export interface VacancyData {
  title: string;
  highestSalary: string;
  leastSalary: string;
  description: string;
  hardSkills: string;
  created: string;
  user: UserData | null;
  company: {
    name: string;
    address: string;
  };
}
