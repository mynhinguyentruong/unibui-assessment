import { JobBoardComponent } from "@/components/job-board-component";
import { getJobPostings } from "@/lib/get-job-postings";

import type { Job } from "@/lib/get-job-postings";

export default function Home() {
  const jobs = getJobPostings() as Job[];

  if (!jobs) {
    throw new Error("failed to fetch jobs data");
  }

  return <JobBoardComponent jobs={jobs} />;
}
