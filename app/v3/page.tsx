import { JobBoardComponent } from "@/components/job-board-component";
import { JobList } from "@/components/job-list";

export default function Home() {
  return (
    <main>
      <JobBoardComponent />
      <JobList />
    </main>
  );
}
