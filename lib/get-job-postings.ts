import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

export type Job = {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  job_description: string;
  requirements: string;
};

export const getJobPostings = (): Job[] => {
  const filePath = path.join(process.cwd(), "public", "jobs.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");

  const parsedData = Papa.parse(fileContent, { header: true }).data.map(
    (job: any) => {
      if (job["Job Title"]) {
        return {
          id: uuidv4(),
          job_title: job["Job Title"],
          company_name: job["Company Name"],
          location: job["Location"],
          job_description: job["Job Description"],
          requirements: job["Requirements"],
        };
      }
    },
  );

  return parsedData;
};
