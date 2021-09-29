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

inputBox.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      event.preventDefault();
      let userEnteredValue = {"data":inputBox.value,"checked":false};
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
});

showTasks();

addBtn.onclick = ()=>{
  let userEnteredValue = {"data":inputBox.value,"checked":false};
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
   
    if(listArray.length > 0){
      deleteAllBtn.classList.add("active");
    }else{
      deleteAllBtn.classList.remove("active"); 
    }
    let newLiTag = "";
    
    listArray.forEach((element, index) => {
      style = element.checked ? "text-decoration:line-through" : "text-decoration:none";
      checked = element.checked ? "checked" : ""
      newLiTag += `<li id=${index} style=${style}>  <input type="checkbox" ${checked} id="checkbox" class="custom_checkbox" onclick="todoChecked(this,${index})"  /> ${element.data}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  
      
    });
    todoList.innerHTML = newLiTag;
    inputBox.value = ""; 
  }
  
  
 
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}


deleteAllBtn.onclick = ()=>{
  listArray = [];
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
}

function todoChecked(checkBox,index){

  var text = document.getElementById(index);
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData)
 
  if (checkBox.checked){
   
    let check = true;
    listArray[index] = {data:listArray[index].data,checked:check}
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    text.style.textDecoration = "line-through"
  } else {
    let check = false;
    listArray[index] = {data:listArray[index].data,checked:check}
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    text.style.textDecoration = 'none'
    
  }

}