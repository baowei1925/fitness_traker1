import React from "react";
export const ListboxWrapper = ({children}) => (
  <div className="overflow-y-auto w-full max-w-[500px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
