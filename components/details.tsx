/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NqVlYNf4BO3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import {
  MagnifyingGlassIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  LightningBoltIcon,
  HamburgerMenuIcon,
  BackpackIcon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Job } from "@/lib/get-job-postings";

import { useState } from "react";

export default function Details({ job }: { job: Job }) {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(() => {
    const savedJobsJSON = localStorage.getItem("savedJobs");
    return savedJobsJSON ? new Set(JSON.parse(savedJobsJSON)) : new Set();
  });

  const handleSaveJob = (job: Job): void => {
    // Add the new job ID to the set
    const newSavedJobs = new Set(savedJobs);
    newSavedJobs.add(job.id);

    // Save the updated set back to local storage
    localStorage.setItem("savedJobs", JSON.stringify(Array.from(newSavedJobs)));

    // Update the state
    setSavedJobs(newSavedJobs);
  };

  const handleUnsaveJob = (id: string): void => {
    // Remove the job ID from the set
    const newSavedJobs = new Set(savedJobs);
    newSavedJobs.delete(id);

    // Save the updated set back to local storage
    localStorage.setItem("savedJobs", JSON.stringify(Array.from(newSavedJobs)));

    // Update the state
    setSavedJobs(newSavedJobs);
  };

  const isSaved = (id: string): boolean => {
    return savedJobs.has(id);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-background border rounded-sm p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://avatar.vercel.sh/1" />
                  {/* vercel, nextjs, 1*/}
                  <AvatarFallback>Company Logo</AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="text-2xl font-bold">{job.job_title}</h1>
                  <div className="text-muted-foreground">
                    {job.company_name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {job.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Job Description</h2>
                <p className="text-muted-foreground">{job.job_description}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Requirements</h2>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>{job.requirements}</li>
                </ul>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div>$120k - $150k</div>
                <Separator
                  orientation="vertical"
                  className="hidden sm:inline-flex"
                />
                <div>3+ years</div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button className="w-full flex items-center justify-center">
                <LightningBoltIcon className="mr-2 h-4 w-4" />
                Fast Apply
              </Button>
              {isSaved(job.id) ? (
                <Button
                  onClick={() => handleUnsaveJob(job.id)}
                  variant="outline"
                  className="w-full"
                >
                  <BookmarkFilledIcon color="blue" className="mr-2 h-4 w-4" />
                  Saved
                </Button>
              ) : (
                <Button
                  onClick={() => handleSaveJob(job)}
                  variant="outline"
                  className="w-full"
                >
                  <BookmarkIcon className="mr-2 h-4 w-4" />
                  Save Job
                </Button>
              )}
            </div>
          </div>
          <Button asChild variant="outline" className="gap-3 my-3 rounded-sm">
            <Link href={"/"}>
              <DoubleArrowLeftIcon />
              Back to listing
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CloudLightningIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
