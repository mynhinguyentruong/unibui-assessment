import fs from "fs";
import path from "path";
import Papa from "papaparse";
import { cache } from "react";

export type Job = {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  job_description: string;
  requirements: string;
};

type JobCSV = {
  ID: string;
  "Job Title": string;
  "Company Name": string;
  Location: string;
  "Job Description": string;
  Requirements: string;
};

export const getJobPostings = cache((): (Job | undefined)[] => {
  const filePath = path.join(process.cwd(), "public", "jobswithid.csv");
  const fileContent = fs.readFileSync(filePath, "utf8");

  const parsedData: (Job | undefined)[] = Papa.parse<JobCSV>(fileContent, {
    header: true,
  }).data.map((job: JobCSV) => {
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

  // if (!parsedData) {
  //   throw new Error("Failed to parse job postings data from CSV file.");
  // }
  return parsedData;
});

export const getJobDetails = cache((id: string): Job | undefined => {
  const job = getJobPostings()?.find((job) => job?.id === id);

  return job;
});
