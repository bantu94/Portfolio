const mouseCircle = document.querySelector(".mouse__circle")
const mouseDot = document.querySelector(".mouse__dot")

// mouseCircle
const mouseCircleFn = (x,y) => {
  mouseCircle.style.cssText = `top: ${y}px;left: ${x}px; opacity: 1;`
  mouseDot.style.cssText = `top: ${y}px;left: ${x}px; opacity: 1;`
}

document.body.addEventListener('mousemove', (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x,y)

})

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = '0'
  mouseDot.style.opacity = '0'
})
// End mouseCircle