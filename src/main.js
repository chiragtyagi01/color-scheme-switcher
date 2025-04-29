const colors = document.querySelectorAll(".color");
const body = document.querySelector("body");
const title = document.querySelector(".title");
const random=document.querySelector(".random");
const icon=document.querySelector(".randomCopy");
const randomText = document.querySelector(".randomText");

// checkBrightness
const brightness=function (hexColor) {
  // Extract RGB from hex
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // Standard brightness formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // If brightness is high, it’s a light color
  return brightness > 150;
}
colors.forEach((box) => {
  const originalText = box.childNodes[0].nodeValue.trim();  
  const copyIcon = box.querySelector(".fa-copy");
  const colorId = box.id; 

  // Change Background on Click
  box.addEventListener("click", () => {
    const selectedColor = `#${colorId}`; 
    body.style.backgroundColor = selectedColor;
    const checkbright=brightness(selectedColor)
    
    if (checkbright) {
      title.style.color = "black";
      // colors.style.color = "black";
       
    } else {
      title.style.color = "white";  
      // colors.style.color = "white";
      
    }
  });
  
  
  // On Hover - Show Hex Code and Copy Button
  box.addEventListener("mouseenter", () => {
    box.childNodes[0].nodeValue = `#${colorId}`;
    if (copyIcon) {
      copyIcon.classList.remove("opacity-0");
      copyIcon.classList.add("opacity-100");
    }
  });

  // On Mouse Leave - Restore
  box.addEventListener("mouseleave", () => {
    box.childNodes[0].nodeValue = `${originalText}`;
    if (copyIcon) {
      copyIcon.classList.add("opacity-0");
      copyIcon.classList.remove("opacity-100");
    }
  });
  
  // copy color code to Clipboard
  if(copyIcon){
    copyIcon.addEventListener("click",(event)=>{
      event.stopPropagation();
      navigator.clipboard.writeText(`#${colorId}`).then( ()=>{
        copyIcon.classList.remove("fa-copy");
      copyIcon.classList.add("fa-check");

      setTimeout( ()=>{
        copyIcon.classList.remove("fa-check");
        copyIcon.classList.add("fa-copy");
      },1000);
      })
    })
  }
});

// generate random hex code
const randomColor=function(){
  const hexcode="1234567890ABCDEF";
  let color="#";
  for (let i = 0; i < 6; i++) {
    color += hexcode[Math.floor(Math.random()*16)]; 
  }  
  return color;
};


let intervalId; // To store setInterval ID

// Start Changing Color
const startChangingColor = function () {
  intervalId = setInterval(changeBgColor, 1000);

  function changeBgColor() {
    const color = randomColor();
    const isLight = brightness(color);
    random.style.color = isLight ? "black" : "white";
    random.style.backgroundColor = color;
    randomText.textContent = color;
  }
};

// Stop Changing Color
const stopChangingColor = function () {
  clearInterval(intervalId);
};

// Hover events for random color div
random.addEventListener("mouseenter", () => {
  stopChangingColor();


  if (icon) {
    icon.classList.remove("opacity-0");
    icon.classList.add("opacity-100");
  }
});

random.addEventListener("mouseleave", () => {
  startChangingColor();
  if (icon) {
    icon.classList.add("opacity-0");
    icon.classList.remove("opacity-100");
  }
});

random.addEventListener("click",changeBodyColor)
  
  function changeBodyColor(){
    const color = random.textContent.trim();   
    body.style.backgroundColor = color;
    const checkbright=brightness(color)
    title.style.color = checkbright ? "black" : "white";
  
  
}

// Copy color from random block
if (icon) {
  
  icon.addEventListener("click", (event) => {
    event.stopPropagation();
    // console.log("from copybtn");
    const color = random.textContent;
    navigator.clipboard.writeText(color).then(() => {
      icon.classList.remove("fa-copy");
      icon.classList.add("fa-check");

      setTimeout(() => {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-copy");
      }, 1000);
    });
  });
}


startChangingColor(); // Call it to begin
