const colors = document.querySelectorAll(".color");
const body = document.querySelector("body");
const title = document.querySelector(".title");

colors.forEach((box) => {
  const originalText = box.childNodes[0].nodeValue.trim();  
  const copyIcon = box.querySelector(".fa-copy");
  const colorId = box.id; 

  // Change Background on Click
  box.addEventListener("click", () => {
    const selectedColor = `#${colorId}`; 
    body.style.backgroundColor = selectedColor;
  
    if (isLightColor(selectedColor)) {
      title.style.color = "black";
      // colors.forEach(colorBox => {
      //   colorBox.style.color = "black";
      // });

    } else {
      title.style.color = "white";  
      // colors.forEach(colorBox => {
      //   colorBox.style.color = "white";
      // });
    }
  });
  

  function isLightColor(hexColor) {
    // Extract RGB from hex
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
  
    // Standard brightness formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    // If brightness is high, it’s a light color
    return brightness > 150;
  }
  

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


