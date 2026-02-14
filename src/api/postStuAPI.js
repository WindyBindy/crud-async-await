
export const postStuAPI = async (students) => {
const options = {
method: "POST",
body: JSON.stringify(students),
headers: {
"Content-Type": "application/json; charset=UTF-8",
},
};
  const res = await fetch("http://localhost:3000/students", options)
  if (!res.ok) {
    throw new Error("Failed!");
  }
  return res.json();
};
