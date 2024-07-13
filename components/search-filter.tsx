import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type SearchFilterProps = {
  filterInput: string;
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFilterInput: (value: string) => void;
};

export default function SearchFilter({
  filterInput,
  handleUserInput,
  setFilterInput,
}: SearchFilterProps) {
  return (
    <form className="bg-background border rounded-sm p-1 flex items-center gap-4 mb-8">
      <MagnifyingGlassIcon className="w-5 h-5 ml-1" />
      <Input
        type="search"
        placeholder="Filter job title, company, location..."
        className="flex-1 border-none focus:ring-0"
        value={filterInput}
        onChange={(e) => handleUserInput(e)}
      />
      {filterInput && (
        <Button onClick={() => setFilterInput("")} variant="outline">
          Clear filter
        </Button>
      )}
    </form>
  );
}
