'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

//get all the elements 
//info - content section 
const name = document.getElementsByClassName('name')[0]
const title = document.getElementsByClassName("title")[0]
const email = document.getElementsByClassName('contact-link')[0]
const phone = document.getElementsByClassName('contact-link')[1]
const dateofbirth = document.getElementsByClassName("birthdate")[0]
const address = document.getElementsByClassName("address")[0]
const facebooklink = document.getElementsByClassName("social-link")[0]
const twitterlink = document.getElementsByClassName("social-link")[1]
const instgramlink = document.getElementsByClassName("social-link")[2]
const profilePic = document.getElementsByClassName("profilePic")[0]
const bio = document.getElementsByClassName("bio")[0]

const fetchAllDataFromAPIAndUpdate = async () => {

  const response = await fetch(`http://localhost:8080/enduser/getdetails/profile/${import.meta.env.VITE_PROFILE_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  })

  const jsonres = await response.json()
  console.log(jsonres.profile)
  let profile = jsonres.profile
  let personalDetails = profile.personalDetails[0]

  name.innerText = personalDetails.name
  profilePic.src = personalDetails.profilePic
  email.innerText = personalDetails.email
  email.href = `mailto:${personalDetails.email}`
  phone.innerText = personalDetails.mobilenum;
  phone.href = `tel:${personalDetails.mobilenum}`
  dateofbirth.innerText = personalDetails.birthdate
  address.innerText = personalDetails.location
  bio.innerText = personalDetails.bio

  let socialMedia = profile.socialMediaDetails
  let socialList = document.getElementById('social-list');

  for (let i = 0; i < socialMedia.length; i++) {
    let socialItem = document.createElement('li');
    socialItem.classList.add('social-item');

    let socialLink = document.createElement('a');
    socialLink.href = socialMedia[i].link;
    socialLink.classList.add('social-link');

    let socialIcon = document.createElement('ion-icon');
    socialIcon.name = socialMedia[i].icon;

    socialLink.appendChild(socialIcon);
    socialItem.appendChild(socialLink);
    socialList.appendChild(socialItem);
  }

  let testimonials = profile.testimonialsDetails
  if (testimonials.length > 0) {
    let testimonials = profile.testimonialsDetails;
    let testimonialsList = document.querySelector('.testimonials-list');

    for (let i = 0; i < testimonials.length; i++) {
      let testimonialItem = document.createElement('li');
      testimonialItem.classList.add('testimonials-item');

      let contentCard = document.createElement('div');
      contentCard.classList.add('content-card');
      contentCard.setAttribute('data-testimonials-item', '');

      let figure = document.createElement('figure');
      figure.classList.add('testimonials-avatar-box');

      let img = document.createElement('img');
      img.src = testimonials[i].avatar;
      img.alt = testimonials[i].name;
      img.width = 60;
      img.setAttribute('data-testimonials-avatar', '');

      figure.appendChild(img);

      let title = document.createElement('h4');
      title.classList.add('h4', 'testimonials-item-title');
      title.setAttribute('data-testimonials-title', '');
      title.textContent = testimonials[i].name;

      let textDiv = document.createElement('div');
      textDiv.classList.add('testimonials-text');
      textDiv.setAttribute('data-testimonials-text', '');

      let paragraph = document.createElement('p');
      paragraph.textContent = testimonials[i].text;

      textDiv.appendChild(paragraph);
      contentCard.appendChild(figure);
      contentCard.appendChild(title);
      contentCard.appendChild(textDiv);
      testimonialItem.appendChild(contentCard);
      testimonialsList.appendChild(testimonialItem);
    }
  } else {
    let testimonialSection = document.getElementsByClassName("testimonials")[0]
    testimonialSection.classList.add("d-none")
  }


  // Resume Part
  //education
  let educationData = profile.educationDetail
  let educationListEl = document.getElementsByClassName("timeline-list")[0]
  if (educationData.length > 0) {
    // let educationListEl = document.querySelector(".timeline-list")
    for (let i = 0; i < educationData.length; i++) {
      let educationChunk = educationData[i];

      let educationItemli = document.createElement("li")
      educationItemli.classList.add("timeline-item")

      let headingH4 = document.createElement("h4")
      headingH4.classList.add("h4")
      headingH4.classList.add("timeline-item-title")
      headingH4.innerText = educationChunk?.institutename

      let spanEl = document.createElement("span")
      spanEl.innerText = `${educationChunk?.startyear} - ${educationChunk?.endyear}`

      let paraEl = document.createElement("p")
      paraEl.classList.add("timeline-text")
      paraEl.innerText = educationChunk?.description

      educationItemli.appendChild(headingH4)
      educationItemli.appendChild(spanEl)
      educationItemli.appendChild(paraEl)

      educationListEl.appendChild(educationItemli)


    }
  }
  let experienceData = profile.experienceDetails;
  let experienceListEl = document.getElementsByClassName("timeline-list")[1]
  if (experienceData.length > 0) {
    // let educationListEl = document.querySelector(".timeline-list")
    for (let i = 0; i < experienceData.length; i++) {
      let educationChunk = experienceData[i];

      let educationItemli = document.createElement("li")
      educationItemli.classList.add("timeline-item")

      let headingH4 = document.createElement("h4")
      headingH4.classList.add("h4")
      headingH4.classList.add("timeline-item-title")
      headingH4.innerText = educationChunk?.companyname

      let spanEl = document.createElement("span")
      spanEl.innerText = `${educationChunk?.startyear} - ${educationChunk?.endyear}`

      let paraEl = document.createElement("p")
      paraEl.classList.add("timeline-text")
      paraEl.innerText = educationChunk?.description

      educationItemli.appendChild(headingH4)
      educationItemli.appendChild(spanEl)
      educationItemli.appendChild(paraEl)

      experienceListEl.appendChild(educationItemli)


    }
  }

  let skillsData = profile.skillsDetails;
  if (skillsData.length > 0) {
    console.log(skillsData)
    let skillsListEl = document.querySelector(".skills-list");
      for (let i = 0; i < skillsData.length; i++) {
        let skillChunk = skillsData[i];

        let skillLevel = 0;
        switch (skillChunk.knowledge.toLowerCase()) {
          case 'beginner':
            skillLevel = 33;
            break;
          case 'intermediate':
            skillLevel = 66;
            break;
          case 'pro':
            skillLevel = 100;
            break;
          default:
            skillLevel = 0;
        }

        let skillsItemli = document.createElement("li");
        skillsItemli.classList.add("skills-item");

        let titleWrapperDiv = document.createElement("div");
        titleWrapperDiv.classList.add("title-wrapper");

        let headingH5 = document.createElement("h5");
        headingH5.classList.add("h5");
        headingH5.innerText = skillChunk.skillname;

        let dataEl = document.createElement("data");
        dataEl.value = skillLevel;
        dataEl.innerText = `- ${skillChunk.knowledge.toUpperCase()}`;

        titleWrapperDiv.appendChild(headingH5);
        titleWrapperDiv.appendChild(dataEl);

        let skillProgressBgDiv = document.createElement("div");
        skillProgressBgDiv.classList.add("skill-progress-bg");

        let skillProgressFillDiv = document.createElement("div");
        skillProgressFillDiv.classList.add("skill-progress-fill");
        skillProgressFillDiv.style.width = `${skillLevel}%`;

        skillProgressBgDiv.appendChild(skillProgressFillDiv);

        skillsItemli.appendChild(titleWrapperDiv);
        skillsItemli.appendChild(skillProgressBgDiv);

        skillsListEl.appendChild(skillsItemli);
      
      }
  }

  //portfilio 


  let portfolioData = profile.portfolioDetails
  const uniqueCategories = [...new Set(portfolioData.map(project => project.category))];

  //get and append the categories
  let categoriesList = document.getElementsByClassName('filter-list')[0]
  for(let i=0;i<uniqueCategories.length;i++){
    let categoryEl = document.createElement("li")
    categoryEl.classList.add("filter-item")

    let categoryBtn = document.createElement("button")
    // categoryBtn.setAttribute("data-filter-btn")
    categoryBtn.innerText = uniqueCategories[i]

    categoryEl.appendChild(categoryBtn)

    categoriesList.appendChild(categoryEl)
  }


  let projectListEl = document.querySelector(".project-list");
  for (let i = 0; i < portfolioData.length; i++) {
    let project = portfolioData[i];
    console.log("hereeeeee")

    let projectItemLi = document.createElement("li");
    projectItemLi.classList.add("project-item", "active");
    projectItemLi.setAttribute("data-filter-item", "");
    projectItemLi.setAttribute("data-category", project.category.toLowerCase());

    let projectLink = document.createElement("a");
    projectLink.href = project.livelink;

    let figureEl = document.createElement("figure");
    figureEl.classList.add("project-img");

    let iconBoxDiv = document.createElement("div");
    iconBoxDiv.classList.add("project-item-icon-box");

    let iconEl = document.createElement("ion-icon");
    iconEl.setAttribute("name", "eye-outline");

    iconBoxDiv.appendChild(iconEl);

    let imgEl = document.createElement("img");
    imgEl.src = project.homepageimage;
    imgEl.alt = project.projectname;
    imgEl.loading = "lazy";

    figureEl.appendChild(iconBoxDiv);
    figureEl.appendChild(imgEl);

    let projectTitleH3 = document.createElement("h3");
    projectTitleH3.classList.add("project-title");
    projectTitleH3.innerText = project.projectname;

    let projectCategoryP = document.createElement("p");
    projectCategoryP.classList.add("project-category");
    projectCategoryP.innerText = project.category;

    projectLink.appendChild(figureEl);
    projectLink.appendChild(projectTitleH3);
    projectLink.appendChild(projectCategoryP);

    projectItemLi.appendChild(projectLink);
    projectListEl.appendChild(projectItemLi);
  }


}




fetchAllDataFromAPIAndUpdate()
