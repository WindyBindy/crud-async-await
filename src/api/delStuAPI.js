export const delStuAPI = async (id) => {
    const res = await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) {
    throw new Error("Failed!");
    }
    return res.json();
}