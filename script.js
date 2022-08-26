window.addEventListener("load", () => {

    const form = document.getElementById("form")
    const taskList = document.getElementById("js-task-list")
    const submit = document.getElementById("form-submit")
    const input = document.getElementById("form-input")
    //  ``control y } 2 veces
    
    function printTask (container,task){
      if(task.length>=1){
      const list = document.createElement("li")
      list.classList.add("task__item")
      const spanContainer = document.createElement("span")
     
      const check = document.createElement("input")
      check.type = "checkbox"
      check.id = "checkbox"
      const spanInput = document.createElement("input")
      spanInput.classList.add("task__item-text")
      spanInput.value=task
      spanInput.setAttribute("readonly","readonly")


      const editores = document.createElement("div")
      editores.classList.add("editores")
      
      const editIcon = document.createElement("span")
      editIcon.classList.add("material-symbols-outlined","task__item-edit")
      editIcon.textContent="edit"
      
      const deleteIcon = document.createElement("span")
      deleteIcon.classList.add("material-symbols-outlined","task__item-delete")
      deleteIcon.textContent = "delete"

      container.appendChild(list)
      list.appendChild(spanContainer)
      spanContainer.appendChild(check)
      spanContainer.appendChild(spanInput)
      list.appendChild(editores)
      editores.appendChild(editIcon)
      editores.appendChild(deleteIcon)
      
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
