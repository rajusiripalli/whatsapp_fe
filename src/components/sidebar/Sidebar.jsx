import React, { useState } from "react";
import SidebarHeader from "./header/SidebarHeader";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";

export default function Sidebar() {
  const [searchResults, setSearchResults] = useState([]);

  console.log("Search Results --->", searchResults);

  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/*Sidebar Header*/}
      <SidebarHeader />
      {/*Notifications */}
      <Notifications />
      {/* Search */}
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />

      {searchResults.length > 0 ? (
        // Search Results
        <SearchResults
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      ) : (
        <>
          {/* Conversations */}
          <Conversations />
        </>
      )}
    </div>
  );
}
