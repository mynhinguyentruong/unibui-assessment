import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import { cache } from "react";

export type Job = {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  job_description: string;
  requirements: string;
};

export const getJobPostings = cache((): Job[] => {
  const filePath = path.join(process.cwd(), "public", "jobswithid.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");

  const parsedData: Job[] | undefined = Papa.parse(fileContent, {
    header: true,
  }).data.map((job: any) => {
    if (job["Job Title"]) {
      return {
        id: job["ID"],
        job_title: job["Job Title"],
        company_name: job["Company Name"],
        location: job["Location"],
        job_description: job["Job Description"],
        requirements: job["Requirements"],
      };
    }
  });

  if (!parsedData) {
    throw new Error("Failed to parse job postings data from CSV file.");
  }
  return parsedData;
});

export const getJobDetails = cache((id: string): Job => {
  const job = getJobPostings().find((job) => job.id === id);
  return job;
});
