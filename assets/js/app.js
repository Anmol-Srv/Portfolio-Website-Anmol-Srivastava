import gsap from "gsap";
const bar=document.querySelector(".loading__bar--inner");
const counter_num=document.querySelector(".loading__counter--number");
const landing_page=document.querySelector(".landing")
var c=0;

gsap.from(".loading__box",{
    duration: 1,
    opacity:0,
    y : -100,
    ease : "bounce.out"
})

var barInterval=setInterval(function()
{
    // landing_page.style.display="none";
    counter_num.innerText=c+"%";
    bar.style.width=c+"%";
    c=c+1;
    if(c==101)
    {
        clearInterval(barInterval);
        gsap.to(".loading__bar",{
            duration : 5,
            rotate : "90deg",
            left:"900%"
            })
        gsap.to(".loading__text,.loading__counter",{
            duration:0.5,
            opacity:0
            })
        gsap.to(".loading__box",{
            duration:1,
            height : "500px",
            borderRadius: "50%"
            })
        gsap.to(".loading__svg",{
            opacity:1,
            duration:10,
            rotate :"360deg"
        })
        gsap.to(".loading__box",{
            delay :3,
            border:"none", 
        })
        gsap.to(".loading",{
            delay :3,
            duration: 0.5,
            zIndex:1,
            opacity:0,
            display:"none",
            background:"transparent"
        })
        gsap.to(".loading__svg",{
            delay :3,
            display : "none"
        })
        gsap.to(".landing",{
            zIndex: 3
        })
        gsap.from(".items",{
            delay:3.5,
            duration: 3,
            opacity:0,
            y : -100,
            ease : "elastic.out(1,0.2)"
        })
    }
},30);
