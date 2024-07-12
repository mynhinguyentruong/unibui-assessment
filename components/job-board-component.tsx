"use client";

import type { Job } from "@/lib/get-job-postings";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchMenu } from "@/components/search-menu";
import {
  MagnifyingGlassIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function JobBoardComponent({ jobs }: { jobs: Job[] }) {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(() => {
    const savedJobsJSON = localStorage?.getItem("savedJobs");
    return savedJobsJSON ? new Set(JSON.parse(savedJobsJSON)) : new Set();
  });
  const [filterInput, setFilterInput] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  useEffect(() => {
    updateUIWithFilteredKeywords(filterInput);
  }, [filterInput]);

  const updateUIWithFilteredKeywords = (input: string) => {
    const lowercasedFilter = input.toLowerCase();
    const filteredData = jobs.filter((job) => {
      return (
        job.job_title.toLowerCase().includes(lowercasedFilter) ||
        job.company_name.toLowerCase().includes(lowercasedFilter) ||
        job.location.toLowerCase().includes(lowercasedFilter) ||
        job.job_description.toLowerCase().includes(lowercasedFilter) ||
        job.requirements.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredJobs(filteredData);
  };

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

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Tabs defaultValue="account" className="m-6">
        <TabsList className="gap-9 mb-4 ">
          <TabsTrigger className="text-left" value="account">
            Browse
          </TabsTrigger>
          <TabsTrigger value="password">Saved</TabsTrigger>
        </TabsList>
        <TabsContent className="min-h-screen" value="account">
          <SearchMenu />
          <main className="flex-1 py-8 ">
            <div className="max-w-3xl ">
              <form className="bg-background border rounded-sm p-1 flex items-center gap-4 mb-8">
                <MagnifyingGlassIcon className="w-5 h-5 ml-1" />
                <Input
                  type="search"
                  placeholder="Filter job title, company, location..."
                  className="flex-1 border-none focus:ring-0"
                  value={filterInput}
                  onChange={(e) => handleUserInput(e)}
                />
                <Button onClick={() => setFilterInput("")} variant="outline">
                  Clear filter
                </Button>
              </form>
              <div className="grid gap-8">
                {filteredJobs.map((job) => (
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
                              <div className="font-medium">
                                {job.company_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {job.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2">
                          <h3 className="text-md font-semibold">
                            {job.job_title}
                          </h3>
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
                          <BookmarkFilledIcon
                            color="blue"
                            className="mr-2 h-4 w-4"
                          />
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
                ))}
              </div>
            </div>
          </main>
        </TabsContent>

        <TabsContent value="password">
          <div className="max-w-3xl ">
            {savedJobs.size > 0 ? (
              jobs
                .filter((job) => isSaved(job.id))
                .map((job) => (
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
                              <div className="font-medium">
                                {job.company_name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {job.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-2">
                          <h3 className="text-md font-semibold">
                            {job.job_title}
                          </h3>
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
                          className="w-full"
                          onClick={() => handleUnsaveJob(job.id)}
                        >
                          <BookmarkFilledIcon
                            color="blue"
                            className="mr-2 h-4 w-4"
                          />
                          Saved
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleSaveJob(job)}
                        >
                          <BookmarkIcon className="mr-2 h-4 w-4" />
                          Save Job
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
            ) : (
              <p>You haven’t saved any fast apply jobs yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
