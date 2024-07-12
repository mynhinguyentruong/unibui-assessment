import { JobBoardComponent } from "@/components/job-board-component";
import { getJobPostings, Job } from "@/lib/get-job-postings";

export default function Home() {
  const jobs: Job[] = getJobPostings();

  return <JobBoardComponent jobs={jobs} />;
}
