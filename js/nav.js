function tonav(){document.getElementById("name-container").setAttribute("style","display:none");var e=$(window).scrollTop();$(window).scroll((function(){var t=$(window).scrollTop();t>e?(document.getElementById("name-container").setAttribute("style",""),document.getElementsByClassName("menus_items")[1].setAttribute("style","display:none!important")):(document.getElementsByClassName("menus_items")[1].setAttribute("style",""),document.getElementById("name-container").setAttribute("style","display:none")),e=t})),document.getElementById("page-name").innerText=document.title.split(" | Rugu🐱‍🏍")[0]}function scrollToTop(){document.getElementsByClassName("menus_items")[1].setAttribute("style",""),document.getElementById("name-container").setAttribute("style","display:none"),btf.scrollToDest(0,500)}document.addEventListener("pjax:complete",tonav),document.addEventListener("DOMContentLoaded",tonav);