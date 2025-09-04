import { Button } from "@oliasoft-open-source/react-ui-library";
import { useState, useEffect } from "react";

export function SortToggleButton({ onChange }) {
  const [sortDesc, setSortDesc] = useState(
    () => localStorage.getItem("sortDesc") === "true"
  );

  useEffect(() => {
    localStorage.setItem("sortDesc", sortDesc);
    onChange(sortDesc);
  }, [sortDesc, onChange]);

  return (
    <Button
      label={sortDesc ? "Sort A-Z" : "Sort Z-A"}
      onClick={() => setSortDesc((prev) => !prev)}
    />
  );
}
