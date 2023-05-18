// mouseCircle

const mouseCircle = document.querySelector(".mouse__circle")
const mouseDot = document.querySelector(".mouse__dot")

let mouseCircleBool = true;

const mouseCircleFn = (x,y) => {

  mouseCircleBool &&
    (mouseCircle.style.cssText = `top: ${y}px;left: ${x}px; opacity: 1;`)

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

let hoveredElementPosition = [];

const stickyElement = (x,y,hoveredElement) => {
  
  // sticky elements 
  if (hoveredElement.classList.contains("sticky")) {
    hoveredElementPosition.length < 1 &&
      (hoveredElementPosition = [hoveredElement.offsetTop, hoveredElement.offsetLeft]);

    hoveredElement.style.cssText = `top: ${y}px; left: ${x}px;`

    if (hoveredElement.offsetTop <= hoveredElementPosition[0] - 100 
      || hoveredElement.offsetTop >= hoveredElementPosition[0] + 100 
      || hoveredElement.offsetLeft <= hoveredElementPosition[1] - 100 
      || hoveredElement.offsetLeft >= hoveredElementPosition[1] + 100) {
      hoveredElement.style.cssText = "";
      hoveredElementPosition = [];
    }

    hoveredElement.onmouseleave = () => {
      hoveredElement.style.cssText = "";
      hoveredElementPosition = [];
    }

  }
  // end of sticky elements 
};

// Mouse circle transform 
const mouseCircleTransform = (hoveredElement) => {

  if (hoveredElement.classList.contains("pointer_enter")) {
    hoveredElement.onmousemove = () => {

      mouseCircleBool = false;

      mouseCircle.style.cssText = `
      width: ${hoveredElement.getBoundingClientRect().width}px;
      height: ${hoveredElement.getBoundingClientRect().height}px;
      top: ${hoveredElement.getBoundingClientRect().top}px;
      left: ${hoveredElement.getBoundingClientRect().left}px;
      opacity: 1;
      transform: translate(0,0);
      animation: none;
      border-radius: ${getComputedStyle(hoveredElement).borderBottomLeftRadius};
      transition: width .5s, height .5s, top .5s, left .5s, transform .5s, 
      border-radius .5s;
      `;
    };

    hoveredElement.onmouseleave = () => {
      mouseCircleBool = true;
    };

    document.onscroll = () => {
      if (!mouseCircleBool) {
        mouseCircle.style.top = `${hoveredElement.getBoundingClientRect().top}px`
      }
    }

  }

}
// End of Mouse circle transform 

document.body.addEventListener('mousemove', (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x,y)
  animateCircles(e,x,y)

  const hoveredElement = document.elementFromPoint(x,y);
  stickyElement(x,y,hoveredElement);
  mouseCircleTransform(hoveredElement);

});

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

});

// End Main Button 


//  Navigation 
const menuIcon = document.querySelector(".menu__icon");
const navbar = document.querySelector(".navbar");

const scrollFunc = () => {
  menuIcon.classList.add("show__menu__icon");
  navbar.classList.add("hide__navbar");

  if(window.scrollY === 0) {
    menuIcon.classList.remove("show__menu__icon");
    navbar.classList.remove("hide__navbar");
  }

  progressBarFunc();
}

document.addEventListener("scroll", scrollFunc);

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show__menu__icon");
  navbar.classList.remove("hide__navbar");
});
// End Navigation 

// Progress Bar 
const progressBar = document.querySelector(".progress__bar");
const sections = document.querySelectorAll("section");
const halfCircles = document.querySelectorAll(".half__circle");
const halfCircleTop = document.querySelector(".half__circle_top");
const progressBarCircle = document.querySelector(".progress__bar_circle");

let scrolledPortion = 0;
let scrollBool = false;
let imageWrapper = false;

const progressBarFunc = (bigImgWrapper) => {
  imageWrapper = bigImgWrapper;

  let pageHeight = 0;

  if (!imageWrapper) {
    pageHeight = document.documentElement.scrollHeight;
    scrolledPortion = window.scrollY;
  } else {
    pageHeight = imageWrapper.firstElementChild.scrollHeight;
    scrolledPortion = imageWrapper.scrollTop;
  }

  const pageViewPortHeight = window.innerHeight

  const scrolledPortionDegree = (scrolledPortion / (pageHeight - pageViewPortHeight)) * 360
  
  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)`;

    if(scrolledPortionDegree >= 180) {
      halfCircles[0].style.transform = "rotate(180deg)";
      halfCircleTop.style.opacity = "0";
    } else {
      halfCircleTop.style.opacity = "1";
    }

  });

  scrollBool = scrolledPortion + pageViewPortHeight === pageHeight;



  // Arrow rotation 
  if(scrollBool) {
    progressBarCircle.style.transform = "rotate(180deg)";
  } else {
    progressBarCircle.style.transform = "rotate(0)";
  }
  // End Arrow rotation 


};

// on click progress 
progressBar.addEventListener("click", e => {
  e.preventDefault()

  if (!imageWrapper) {
    const sectionPositions = Array.from(sections).map((section) => scrolledPortion + section.getBoundingClientRect().top
    );

    const position = sectionPositions.find((sectionPosition) => {
      return sectionPosition > scrolledPortion
    });

    scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
    
  } else {
    scrollBool ? imageWrapper.scrollTo(0, 0) : imageWrapper.scrollTo(0, imageWrapper.scrollHeight)
  }

});
// End on click progress 

progressBarFunc();

// End of Progress Bar 



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

projects.forEach((project, i) => {
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

    document.removeEventListener("scroll", scrollFunc);

    mouseCircle.style.opacity = 0

    // call progressBar function 
    progressBarFunc(bigImgWrapper);
    bigImgWrapper.onscroll = () => {
      progressBarFunc(bigImgWrapper);
    }

    projectHideBtn.classList.add("change")
    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change")
      bigImgWrapper.remove()
      document.body.style.overflowY = "scroll";

      document.removeEventListener("scroll", scrollFunc);

      progressBarFunc();

    }


  });
  // End of Big project image 
  i >= 6 && (project.style.cssText = "display:none; opacity:0;");
});
// End of Projects

// Project button  
const section3 = document.querySelector(".section__3");
const projectsBtn = document.querySelector(".projects__btn");
const projectBtnText = document.querySelector(".projects__btn span");
let showHideBool = true


// show projects function 
const showProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "flex"
    section3.scrollIntoView({block:"end"})
  }, 600)

  setTimeout(() => {
    project.style.opacity = "1"
  }, i * 200)
}

// hide projects function 
const hideProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "none"
    section3.scrollIntoView({block:"end"})
  }, 1200)

  setTimeout(() => {
    project.style.opacity = "0"
  }, i * 100)
}

projectsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change")

  showHideBool 
  ? (projectBtnText.textContent = "Show less") 
  : (projectBtnText.textContent = "Show more")

  projects.forEach((project, i) => {
    i >= 6 && (showHideBool 
      ? showProjects(project, i) 
      : hideProjects(project, i))
  });
  showHideBool = !showHideBool;
});
// End of Project button 

// Section 4
document.querySelectorAll(".service__btn").forEach((service) => {
  service.addEventListener("click", e => {
    e.preventDefault();

    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle("change")

    const rightPosition = serviceText.classList.contains("change") 
    ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})` 
    : 0;

    service.firstElementChild.style.right = rightPosition;

  })
})
// End  of Section 4

// Section 5

const formHeading = document.querySelector(".form__heading");
const formInputs = document.querySelectorAll(".contact__form_input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0"
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1"
    }, 300);
  });

  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0"
    setTimeout(() => {
      formHeading.textContent = "Let's Talk";
      formHeading.style.opacity = "1"
    }, 300);
  });

});

const slideshow = document.querySelector(".slideshow") 

setInterval(() => {
  const firstIcon = slideshow.firstElementChild;
  firstIcon.classList.add("faded__out");

  const thirdIcon = slideshow.children [3];
  thirdIcon.classList.add("light");
  thirdIcon.previousElementSibling.classList.remove("light");

  setTimeout(() => {
    slideshow.removeChild(firstIcon);
    slideshow.appendChild(firstIcon);
    setTimeout(() => {
      firstIcon.classList.remove("faded__out");
    }, 500);
  }, 500);
}, 3000);

// End  of Section 5