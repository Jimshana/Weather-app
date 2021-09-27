const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value;
  if(userEnteredValue.trim() != 0){ 
    addBtn.classList.add("active");
  }else{
    addBtn.classList.remove("active"); 
  }
}

showTasks();

addBtn.onclick = ()=>{
    let userEnteredValue = inputBox.value; 
    if(inputBox.value==""){
     return false;
    }
    let getLocalStorageData = localStorage.getItem("New Todo"); 
    if(getLocalStorageData == null){
      listArray = []; 
    }else{
      listArray = JSON.parse(getLocalStorageData); 
    }
  
    listArray.push(userEnteredValue); 
    localStorage.setItem("New Todo", JSON.stringify(listArray)); 
    showTasks();
    addBtn.classList.remove("active"); 
  }
  function showTasks(){
    let getLocalStorageData = localStorage.getItem("New Todo");
    if(getLocalStorageData == null){
      listArray = [];
    }else{
      listArray = JSON.parse(getLocalStorageData); 
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length;
    if(listArray.length > 0){
      deleteAllBtn.classList.add("active");
    }else{
      deleteAllBtn.classList.remove("active"); 
    }
    let newLiTag = "";
    
    listArray.forEach((element, index) => {
      newLiTag += `<li class="text">  <input type="checkbox" id="checkbox" class="custom_checkbox" onclick="todoChecked()"/> ${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = "";
  }
  