import type { Job } from "@/lib/get-job-postings";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type JobCardProps = {
  job: Job;
  isSaved: (id: string) => boolean;
  handleUnsaveJob: (id: string) => void;
  handleSaveJob: (job: Job) => void;
};

export function JobCard({
  job,
  isSaved,
  handleUnsaveJob,
  handleSaveJob,
}: JobCardProps) {
  return (
    <Card key={job.id}>
      <Link href={`/job/${job.id}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://avatar.vercel.sh/1" />
                {/* vercel, nextjs, 1*/}
                <AvatarFallback>Company</AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{job.company_name}</div>
                <div className="text-sm text-muted-foreground">
                  {job.location}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <h3 className="text-md font-semibold">{job.job_title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {job.job_description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div>$120k - $150k</div>
              <Separator
                orientation="vertical"
                className="hidden sm:inline-flex"
              />
              <div>3+ years experience</div>
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="gap-3 px-6">
        <Button className="w-full flex items-center justify-center">
          <LightningBoltIcon className="mr-2 h-4 w-4" />
          Fast Apply
        </Button>
        {isSaved(job.id) ? (
          <Button
            variant="outline"
            className="w-full "
            onClick={() => handleUnsaveJob(job.id)}
          >
            <BookmarkFilledIcon color="blue" className="mr-2 h-4 w-4" />
            Saved
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full "
            onClick={() => handleSaveJob(job)}
          >
            <BookmarkIcon className="mr-2 h-4 w-4" />
            Save Job
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
