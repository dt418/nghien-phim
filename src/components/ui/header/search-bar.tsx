import { Search } from 'lucide-react';

import { Button } from '../button';
import { Input } from '../input';

export default function SearchBar() {
  return (
    <div className="relative flex w-full flex-row md:w-80">
      <Input
        type="search"
        placeholder="Search"
        className="w-full rounded-r-none pr-4"
      />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="rounded-l-none p-2"
      >
        <Search className="h-full w-auto" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}
