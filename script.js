window.addEventListener("load", () => {

    const form = document.getElementById("form")
    const taskList = document.getElementById("js-task-list")
    const submit = document.getElementById("form-submit")
    const input = document.getElementById("form-input")
     
    function printTask (container, task){
      console.log(task);
      if(task.length>=1){
      container.innerHTML += `
      <li class="task__item">
              <span>
              <input type="checkbox" id=checkbox>
              <input type="text" readonly value= ${task} class="task__item-text">
              </span>
              <div class="editores">              
                <span class="material-symbols-outlined task__item-edit">edit</span>
                <span class="material-symbols-outlined task__item-delete">delete</span>
              </div>
            </li>
        `
      }
      else{
        alert("ingrese una tarea")
      }
    }
    
    function deleteTask (btnDelete){
      const ul = btnDelete.target.parentNode.parentNode.parentNode
      const li = btnDelete.target.parentNode.parentNode
      ul.removeChild(li)
    }
    
    function editTask (btnEdit){
      const li = btnEdit.target.parentNode.parentNode
      const task = li.querySelector(".task__item-text")
      const btnEditUpdate = li.querySelector(".task__item-edit")
      
      if(btnEditUpdate.textContent=="edit"){
        btnEditUpdate.textContent =`done`
        task.removeAttribute("readonly")
        task.classList.add(`update-edit-btn`)
      }
      else{
        btnEditUpdate.textContent =`edit`
        task.setAttribute("readonly","readonly") 
        task.classList.remove(`update-edit-btn`)
      }
    }

    function CompleteTask(checkbox){
      const taskContainer = checkbox.target.parentNode
      const inputCheckbox = taskContainer.querySelector("#checkbox")
      inputCheckbox.setAttribute("checked", true)
      const task = taskContainer.querySelector(".task__item-text")
      task.classList.toggle("task-complete")
    }

    // evento del form para agregar una tarea
    form.addEventListener("submit", (e)=>{
      e.preventDefault()
      const data = new FormData(form)
      const textTask = data.get("text-task")
      printTask(taskList, textTask)
      input.value=""
      const textBackground = document.getElementById("task-background-text")
      textBackground.classList.remove("active")  
    })
    // evento de los botones
    taskList.addEventListener("click", (e)=>{
      if(e.target.className==="material-symbols-outlined task__item-delete"){
        deleteTask(e)
      }
      if(e.target.className==="material-symbols-outlined task__item-edit"){
        editTask(e)
      }
      if(e.target.type==="checkbox"){
        CompleteTask(e)
      }
    })
    
    })
