window.addEventListener("load", () => {
    //formulario inicial
    const form = document.getElementById("form")
    const taskList = document.getElementById("js-task-list")
    const input = document.getElementById("form-input")
    
    let date = new Date()
    
    let monthDay = date.toLocaleString('es', { day: 'numeric' });
    let day = date.toLocaleString('es', { weekday: 'long' });
    let month = date.toLocaleString('es', { month: 'numeric' });
    let year = date.toLocaleString('es', { year: 'numeric' });
    let hours = date.getHours()
    let minutes = date.getMinutes()
    //mantener la fecha actual como minima 
    if (month.length==1){ month= 0+month}
    if (monthDay.length==1){ monthDay= 0+monthDay}
    const currentDate =(`${year}-${month}-${monthDay}`)
    const currentTime =(`${hours}:${minutes}`)
    const inputDate = document.getElementById("date-input")
    inputDate.setAttribute("min",currentDate)
    const inputTime = document.getElementById("time-input")
    inputTime.setAttribute("min",currentTime)
    
    //cuenta regresiva
    function CountDown (taskDate,taskTime){

      const inputDateHour = new Date (`${inputDate.value} ${inputTime.value}`)
      const inputDateHourS = inputDateHour.getTime()
      let interval = setInterval(function(){
        const date = new Date()
        const dateS = date.getTime()
        //obtencion de la difrencia
        const difrencia= inputDateHourS-dateS
        //difrencia pasada de milisegundos/segundos/minutos/horas/dias
        let dayS = parseInt(difrencia / (1000*60*60*24))
        let hour = parseInt(difrencia % (1000*60*60*24) / (1000*60*60))
        let minute = parseInt(difrencia % (1000*60*60) / (1000*60))
        let second = parseInt(difrencia % (1000*60) / (1000))
        var days = `${dayS}`
        var time = `${hour}:${minute}:${second}`
        taskDate.textContent = days
        taskTime.textContent = time
        //finalizar la cuenta regresiva al llegar a 0
        if (difrencia<0) {
            clearInterval(interval)
            alert("tiempo agotado")
        }
      },1000)
    }
    
    function printTask (container,task){
      //validacion de la tarea
      if(task.length>=1 && taskDate!=NaM ){
        const list = document.createElement("li")
        list.classList.add("task__item")
        const spanContainer = document.createElement("span")
        //input checkbox
        const check = document.createElement("input")
        check.type = "checkbox"
        check.id = "checkbox"
        //contenedor de la tarea
        const spanInput = document.createElement("input")
        spanInput.classList.add("task__item-text")
        spanInput.value=task
        spanInput.setAttribute("readonly","readonly")
        //editores de la tarea 
        const editores = document.createElement("div")
        editores.classList.add("editores")
          
        const editIcon = document.createElement("span")
        editIcon.classList.add("material-symbols-outlined","task__item-edit")
        editIcon.textContent="edit"
          
        const deleteIcon = document.createElement("span")
        deleteIcon.classList.add("material-symbols-outlined","task__item-delete")
        deleteIcon.textContent = "delete"
        //contenedor de fecha
       const dateContainer = document.createElement("div")
       const taskTime = document.createElement("p")
       taskTime.classList.add("date-time")
       const taskDate = document.createElement("p")
       taskDate.classList.add("date-time")
       CountDown(taskDate,taskTime)
       
       
      //  console.log(days);
        // estructura de la tarea
        container.appendChild(list)
        list.appendChild(spanContainer)
        spanContainer.appendChild(check)
        spanContainer.appendChild(spanInput)
        list.appendChild(editores)
        editores.appendChild(editIcon)
        editores.appendChild(deleteIcon)
        list.appendChild(dateContainer)
        dateContainer.appendChild(taskDate)
        dateContainer.appendChild(taskTime)
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
