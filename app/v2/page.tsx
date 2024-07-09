import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function Home() {
  let page;
  const filterValues: JobFilterValues = {
    q: "haha",
    type: "asdasd",
    location: "NY",
    remote: true,
  };
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Find your dream job
        </h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Volunteer",
];

const locationTypes = ["Remote", "On-site", "Hybrid"];

const distinctLocations = ["NY", "MTL", "TO"];

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

async function JobFilterSidebar({ defaultValues }: JobFilterSidebarProps) {
  // const distinctLocations = (await prisma.job
  //   .findMany({
  //     where: { approved: true },
  //     select: { location: true },
  //     distinct: ["location"],
  //   })
  //   .then((locations) =>
  //     locations.map(({ location }) => location).filter(Boolean),
  //   )) as string[];
  //
  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button className="w-full">Filter jobs</Button>
        </div>
      </form>
    </aside>
  );
}

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

async function JobResults({ filterValues, page = 1 }: JobResultsProps) {
  const { q, type, location, remote } = filterValues;

  return (
    <div className="grow space-y-4">
      JobResults
      <h1>{q}</h1>
      <h1>{type}</h1>
      <h1>{location}</h1>
      <h1>{remote}</h1>
      <h1>{page}</h1>
    </div>
  );
}
