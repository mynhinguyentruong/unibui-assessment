import { TestComponent } from "@/components/test-component";
import { getJobPostings, Job } from "@/lib/get-job-postings";

export default function Home() {
  const jobs: Job[] = getJobPostings();
  console.log("ASdasjdasjd");
  console.log({ jobs });
  console.log({ jobs });
  console.log({ jobs });
  console.log({ jobs });
  console.log({ jobs });
  return <TestComponent jobs={jobs} />;
}
