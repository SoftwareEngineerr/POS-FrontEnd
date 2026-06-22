export const Token: string | undefined = (() => {
  const data = sessionStorage.getItem("User_Data");
  if (!data) return undefined;

  try {
    const parsed = JSON.parse(data);
    return parsed?.token; // optional chaining
  } catch (e) {
    console.error("Failed to parse User_Data from sessionStorage", e);
    return undefined;
  }
})();