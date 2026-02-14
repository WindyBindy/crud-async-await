export const getStuAPI = async () => {
  const res = await fetch("http://localhost:3000/students")
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};

