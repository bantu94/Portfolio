// mouseCircle

const mouseCircle = document.querySelector(".mouse__circle")
const mouseDot = document.querySelector(".mouse__dot")

const mouseCircleFn = (x,y) => {
  mouseCircle.style.cssText = `top: ${y}px;left: ${x}px; opacity: 1;`
  mouseDot.style.cssText = `top: ${y}px;left: ${x}px; opacity: 1;`
}

// End mouseCircle

// Animating circles 
const circles = document.querySelectorAll('.circle');
const mainImg = document.querySelector('.main__circle img');

let mX = 0;
let mY = 0;
const z = 100
const animateCircles = (e,x,y) => {

  if(x < mX) {
    circles.forEach(circle => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if(x > mX) {
    circles.forEach(circle => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }

  if(y < mY) {
    circles.forEach(circle => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if(y > mY) {
    circles.forEach(circle => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }

  mX = e.clientX;
  mY = e.clientY;
}
// end Animating circles 


document.body.addEventListener('mousemove', (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x,y)
  animateCircles(e,x,y)

})

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = '0'
  mouseDot.style.opacity = '0'
})

// Main Button 
const mainBtns = document.querySelectorAll('.main__btn')

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener('mouseenter',(e) => {
  const left = e.clientX - e.target.getBoundingClientRect().left;
  const top = e.clientY - e.target.getBoundingClientRect().top;

  ripple = document.createElement('div');
  ripple.classList.add("ripple");
  ripple.style.left = `${left}px`;
  ripple.style.top = `${top}px`;
  btn.prepend(ripple);
  
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.removeChild(ripple);
  })

})



// End Main Button 



// About me Text 
const aboutMeText = document.querySelector('.aboutme__text');
const aboutMeTextContent = "Iam a designer & I create award winning webistes with the best user experience & I do not talk much just contact me.";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);

  span.addEventListener('mouseenter', (e) => {
    e.target.style.animation = "AboutMeTextAnimation 10s infinite"
  });
});
// end of About me Text 

// Projects
const container = document.querySelector('.container');
const projects = document.querySelectorAll('.project');
const projectHideBtn = document.querySelector('.project__hide_btn')

projects.forEach((project) => {
  project.addEventListener('mouseenter', () => {
    project.firstElementChild.style.top = `-${project.firstElementChild.offsetHeight - project.offsetHeight + 20}px`
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem"
  });

  // Big project image 
  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");
    bigImgWrapper.className = "project__img_wrapper";
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");
    bigImg.className = "project__img";
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];
    bigImg.setAttribute("src", `${imgPath}.jpeg`);
    bigImgWrapper.appendChild(bigImg);

    document.body.style.overflowY = "hidden";

    projectHideBtn.classList.add("change")
    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change")
      bigImgWrapper.remove()
      document.body.style.overflowY = "scroll";
    }


  });
  // End of Big project image 

});
// End of Projects