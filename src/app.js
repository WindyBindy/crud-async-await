import { getStuAPI } from "./api/getstuAPI";
import { postStuAPI } from "./api/postStuAPI"
import { delStuAPI } from "./api/delStuAPI";
import { updateStuApi } from "./api/updateStuAPI";

const listOfStudents = document.querySelector(".list-of-students")
const getStuBtn = document.querySelector("#get-students-btn")
const AddStudentsForm = document.querySelector("#add-student-form")
const backdropEl = document.querySelector(".backdrop")
const formEl = document.querySelector(".modal-form")

let currentEdit = null;

getStuBtn.addEventListener("click", ()=>{
    getStuAPI().then((res) => getStudents(res));
})


function openModal() {
    backdropEl.style.display = "flex"
}
function closeModal(){
    backdropEl.style.display = "none"
}


// Функція для отримання всіх студентів
function getStudents(array) {

 // твій код
const item = array
    .map(({id, name, age, course, skills, email, isEnrolled  }) => {
    return `<tr>
        <th name="id" class="id">${id}</th>
        <th name="name" class="name">${name}</th>
        <th name="age" class="age">${age}</th>
        <th name="course" class="course">${course}</th>
        <th name="skills" class="skills">${skills}</th>
        <th name="email" class="email">${email}</th>
        <th name="isEnrolled" class="isEnrolled">${isEnrolled}</th>
        <th name="btns"><button type="button" class="delete" id="${id}">delet</button>
<button type="button" class="edit">edit</button></th>
        </tr>`;
    })
    .join("");

  listOfStudents.innerHTML  = item

}


// Функція для відображення студентів у таблиці

function renderStudents(students) {

 // твій код



}


// Функція для додавання нового студента
AddStudentsForm.addEventListener("submit", (e)=>{
    addStudent(e)
})
let StudataGLOBAL = ""
function addStudent(e) {
    e.preventDefault()

    const elements = e.currentTarget.elements

    const StuData = {
        name: elements.name.value.trim(),
        age: Number(elements.age.value.trim()),
        course: elements.course.value.trim(),
        skills: elements.skills.value.trim(),
        email: elements.email.value.trim(),
        isEnrolled: elements.isEnrolled.checked
    }
StudataGLOBAL = StuData
    postStuAPI(StuData).then(() => {
        AddStudentsForm.reset()
       
    })
}

// Функція для оновлення студента

function updateStudent(id) {

 // твій код


}
formEl.addEventListener("submit", (event)=>{
    event.preventDefault()
    

if (currentEdit) {
console.log(currentEdit);
 const elements = event.currentTarget.elements
  const StuData = {
        name: elements.name.value.trim(),
        age: Number(elements.age.value.trim()),
        course: elements.course.value.trim(),
        skills: elements.skills.value.trim(),
        email: elements.email.value.trim(),
        isEnrolled: elements.isEnrolled.checked
    }
  updateStuApi(currentEdit,StuData).then(res => {
    formEl.reset()
    closeModal()
    getStuAPI().then((res) => getStudents(res));
  })
}
})


listOfStudents.addEventListener("click", ()=>{
const action = event.target.className
console.log(action);

const tr = event.target.closest("tr")
console.log(tr);


const id = event.target.id
if(action === "delete" ){
 deleteStudent(Number(id))
 console.log(id);
 
 console.log("deleted");
 
}
 if(action === "edit") {
    console.log("done");
    const idfixed = tr.querySelector(".id").textContent
    currentEdit =  idfixed


    // formEl.elements.url.value = li.querySelector(".item-img").src;
    formEl.elements.name.value = tr.querySelector(".name").textContent
    formEl.elements.age.value = tr.querySelector(".age").textContent
    formEl.elements.course.value = tr.querySelector(".course").textContent


    formEl.elements.skills.value = tr.querySelector(".skills").textContent
    formEl.elements.email.value = tr.querySelector(".email").textContent
    formEl.elements.isEnrolled.value = tr.querySelector(".isEnrolled").textContent
        openModal()
    
  }





})
function deleteStudent(id) {


delStuAPI(id).then(res => getStuAPI(res)).then(res => getStudents(res))

}






