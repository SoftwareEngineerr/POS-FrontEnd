import { useState } from "react";

export const usePagination = (data = [], rowsPerPage = 10) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return {
    page,
    setPage,
    totalPages,
    paginatedData,
    rowsPerPage,
  };
};