window.addEventListener("load", () => {


    const form = document.getElementById("form")
    const taskList = document.getElementById("js-task-list")
    const submit = document.getElementById("form-submit")
    const input = document.getElementById("form-input")
    
    
    function printTask (container, task){
      container.innerHTML += `
      <li class="task__item">
              <input type="checkbox">
              <input type="text" readonly value=${task} class="task__item-text">
              <div class="editores">
                <span class="material-symbols-outlined task__item-edit">edit</span>
                <span class="material-symbols-outlined task__item-delete">delete</span>
              </div>
            </li>
        `
      // <li class="task__item" >
        //   <span class="task__item-text"> <input type="checkbox"> ${task} </span>
        //   <div class="editores">
        //     <span class="material-symbols-outlined task__item-edit">edit</span>
        //     <span class="material-symbols-outlined task__item-delete">delete</span>
        //   </div>
        // </li>
    }
    
    function deleteTask (btnDelete){
      const ul = btnDelete.target.parentNode.parentNode.parentNode
      const li = btnDelete.target.parentNode.parentNode
      ul.removeChild(li)
    }
    
    function editTask (btnEdit){
      const li = btnEdit.target.parentNode.parentNode
      let edit= li.childNodes[3]
      
      
      //cambio de apariencia del boton edit
      const btnEditUpdate = li.querySelector(".task__item-edit")
      
      if(btnEditUpdate.textContent=="edit"){
        btnEditUpdate.textContent =`done`
        edit.removeAttribute("readonly")
      }
      else if (btnEditUpdate.textContent=="done"){
        btnEditUpdate.textContent =`edit`
        edit.setAttribute("readonly","readonly") 
      }
    }
    // evento de agregar una tarea
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
    })
    
    })
