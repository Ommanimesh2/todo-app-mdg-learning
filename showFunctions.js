function showDataCompleted(itemContent, scheduledTime) {
  let div = document.createElement("div");
  div.classList.add("hiding")
    div.innerHTML = ` 
    <div class="newAllTasks">
    <i class="fa fa-2x fa-regular fa-circle done"></i>
    <div class="taskName">${itemContent}</div>
    <div class="time">Time scheduled: ${scheduledTime}</div>
    `;
    completedTasks.appendChild(div);
  }

  function showDataMissed(itemContent, scheduledTime) {
    let div = document.createElement("div");
    div.classList.add("hiding")
    div.innerHTML = `          
    <div class="taskName">${itemContent}</div>   
    <input type="datetime-local" class="datetime" id="timeStamp">
    <button class="reschedule">reschedule</button>
    `;
    missedTasks.appendChild(div);
  }
  
  function showDataAll(itemContent, itemTime, scheduledTime) {
    let div = document.createElement("div");
    div.classList.add("hiding")
    div.innerHTML = ` 
    <div class="newAllTasks">
    <button class="done">done</button>
    <button class="gone">gone</button>
    <div class="taskName">${itemContent}</div>
    
    </div>
    <div class="times">
    <div class="time">Time scheduled: ${itemTime}</div>
    <div class="toComplete">To be done in: ${scheduledTime}</div>        
    </div>
    `;
    allTasks.appendChild(div);
  }
  function removeall() {
 document.querySelector(".allTasks").innerHTML=''
  }
  function removemiss() {
 document.querySelector(".missedTasks").innerHTML=''
  }
  function removecomp() {
 document.querySelector(".completedTasks").innerHTML=''
  }
 