"use client";

import type { Job } from "@/lib/get-job-postings";
import { ChangeEvent, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchMenu } from "@/components/search-menu";
import { JobCard } from "./job-card";
import SearchFilter from "./search-filter";

export function JobBoardComponent({ jobs }: { jobs: Job[] }) {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(() => {
    let savedJobsJSON;

    if (typeof window !== "undefined") {
      savedJobsJSON = localStorage.getItem("savedJobs");
    }

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
      <Tabs defaultValue="browse" className="m-6">
        <TabsList className="gap-9 mb-4 ">
          <TabsTrigger className="text-left" value="browse">
            Browse
          </TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent className="min-h-screen" value="browse">
          <SearchMenu />
          <main className="flex-1 py-8 ">
            <div className="max-w-3xl ">
              <SearchFilter
                filterInput={filterInput}
                setFilterInput={setFilterInput}
                handleUserInput={handleUserInput}
              />
              <div className="grid gap-8">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={isSaved}
                    handleSaveJob={handleSaveJob}
                    handleUnsaveJob={handleUnsaveJob}
                  />
                ))}
              </div>
            </div>
          </main>
        </TabsContent>

        <TabsContent value="saved">
          <div className="max-w-3xl">
            <div className="grid gap-8">
              {savedJobs.size > 0 ? (
                jobs
                  .filter((job) => isSaved(job.id))
                  .map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={isSaved}
                      handleSaveJob={handleSaveJob}
                      handleUnsaveJob={handleUnsaveJob}
                    />
                  ))
              ) : (
                <p>You haven’t saved any fast apply jobs yet.</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
