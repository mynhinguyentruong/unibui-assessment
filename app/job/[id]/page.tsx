import Details from "@/components/details";
import { getJobDetails } from "@/lib/get-job-postings";

export default function Page({ params }: { params: { id: string } }) {
  const job = getJobDetails(params.id);

  if (!job) {
    throw new Error(`cannot find job, job id: ${params.id}`);
  }

  return <Details job={job} />;
}
