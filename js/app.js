const designs = document.querySelectorAll(".designs");
const input_sections = document.querySelectorAll('.input_section');
const input_wrapper = document.getElementById('input_wrapper');
const resume_wrapper = document.getElementById('resume_wrapper');
const pre_loader = document.getElementById('pre_loader');
const next_btn = document.getElementById('next_btn');
const submit_btn = document.getElementById('submit_btn');
const prev_btn = document.getElementById('prev_btn');
const edit_btn = document.getElementById('edit_btn');
const download_btn = document.getElementById('download_btn');
const new_btn = document.getElementById('new_btn');
const add_skill_btn = document.getElementById('add_skill_btn');
const add_education_btn = document.getElementById('add_education_btn');
const add_project_btn = document.getElementById('add_projects_btn');
const input_image = document.getElementById("input_image");
let current_input_section = 0;
let cropper;


// function for preloader
window.onload = () => {
    pre_loader.style.display = 'none';
}

//check validation 
const check_validity = () => {
    const required = document.querySelectorAll('input[required] , textarea[required]');
    let validity = true;

    required.forEach((requir) => {
        if (!requir.value.trim()) {
            validity = false;
            requir.classList.add('input_error');
        } else {
            requir.classList.remove('input_error')
        }
    })
    return validity;
}

// function to make skills in resume
const make_skills = (skills) => {
    const resume_skill_container = document.querySelector('#skill_section ul');
    resume_skill_container.innerHTML = ''

    skills.forEach((skill) => {
        let resume_skill = document.createElement('li');
        resume_skill.classList.add('section_item');
        resume_skill.innerHTML = `
                                <img src="assets/icons/skill.svg" alt="skill" class="icon">
                            ${skill.textContent}
    `

        resume_skill_container.append(resume_skill);
    })
}
// function to make projects in resume
const make_projects = (projects) => {
    const resume_project_container = document.querySelector('#project_section ul');
    resume_project_container.innerHTML = ''

    projects.forEach((project) => {
        let resume_project = document.createElement('li');
        resume_project.classList.add('section_item');

        let project_name = project.querySelector('.inputted_project_name');
        let project_url = project.querySelector('.inputted_project_url');
        resume_project.innerHTML = `
                            <img src="assets/icons/project.svg" alt="project" class="icon">
                            ${project_name.textContent}
                            <p class=" link section_item project_link">${project_url.textContent}</p>
    `

        resume_project_container.append(resume_project);
    })
}
// function to make education in resume
const make_education = (education) => {
    const resume_education_container = document.querySelector('#education_section ul');
    resume_education_container.innerHTML = ''

    education.forEach((project) => {
        let resume_education = document.createElement('li');
        resume_education.classList.add('section_item');

        let education_course = project.querySelector('.inputted_course');
        let education_college = project.querySelector('.inputted_college');
        let education_year = project.querySelector('.inputted_year');
        resume_education.innerHTML = `
                                     <img src="assets/icons/education.svg" alt="education" class="icon">
                                     "${education_course.textContent}" from "${education_college.textContent}" in ${education_year.textContent}
    `


        resume_education_container.append(resume_education);
    })
}

// function for making resume
const make_resume = (name, role, contact, email, url, address, skill, project, education, description) => {
    const resume_name = document.getElementById("name");
    const resume_label = document.getElementById("label");
    const resume_contact = document.getElementById("contact");
    const resume_email = document.getElementById("email");
    const resume_url = document.getElementById("url");
    const resume_address = document.getElementById("address");
    const resume_description = document.getElementById("description_text");

    resume_name.innerText = '';
    resume_name.innerText = name;
    resume_label.innerText = '';
    resume_label.innerText = role;
    resume_contact.innerText = '';
    resume_contact.innerText = contact;
    if (url == '') {
        resume_url.parentElement.innerHTML = '';
    } else {
        resume_url.innerText = url;
    }
    resume_email.innerText = email;
    resume_address.innerText = address;
    resume_description.innerText = description;

    make_skills(skill);
    if (project.length === 0) {
        document.getElementById('project_section').innerHTML = '';
    } else {
        make_projects(project);
    }
    make_education(education);
}

// function to add projects
const add_project = (name, url) => {
    const inputted_project_container = document.getElementById("inputted_projects");

    let inputted_project = document.createElement('li');
    inputted_project.classList.add("inputted_projects");
    inputted_project.innerHTML = `
                        <span class="inputted_project_name">${name}</span>
                        <span class="inputted_project_url">${url}</span>
    `;

    inputted_project_container.append(inputted_project);

    inputted_project.addEventListener('click', () => {
        inputted_project.remove();
    })
}
// function to add projects
const add_education = (course, college, year) => {
    const inputted_education_container = document.getElementById("inputted_education");

    let inputted_education = document.createElement('li');
    inputted_education.classList.add("inputted_education");
    inputted_education.innerHTML = `
                        <span class="inputted_course">${course}</span>
                        <span class="inputted_college">${college}</span>
                        <span class="inputted_year">${year}</span>
    `;

    inputted_education_container.append(inputted_education);

    inputted_education.addEventListener('click', () => {
        inputted_education.remove();
    })
}
// function to add skills in skill container
const add_skill = (skill) => {
    const inputted_skills = document.getElementById("inputted_skills");

    let inputted_skill = document.createElement('li');
    inputted_skill.classList.add("inputted_skill");
    inputted_skill.textContent = skill;

    inputted_skills.append(inputted_skill);

    inputted_skill.addEventListener('click', () => {
        inputted_skill.remove();
    })
}

// function to hide all input sections
const hide_all_sections = () => {
    input_sections.forEach(section => section.classList.remove('active_section'));
}

input_image.addEventListener("change", (event) => {
    const inputted_image_container = document.getElementById('inputted_image_container')
    inputted_image_container.style.display = 'block';
    // Listen for the file input change event
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        const imageElement = document.querySelector('#inputted_image img');
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';  // Show the image for cropping

        // Initialize the cropper after the image is loaded
        cropper = new Cropper(imageElement, {
            aspectRatio: 1,
            viewMode: 2, // For restricting image to container size
            autoCropArea: 0.5,
            responsive: true
        });
    }
});

// When the crop button is clicked, get the cropped image and display it
document.getElementById('crop_btn').addEventListener('click', function (e) {
    e.preventDefault()
    const inputted_image_container = document.getElementById('inputted_image_container')
    inputted_image_container.style.display = 'none';
    const profile_image_container = document.getElementById('profile_image');
    if (cropper) {
        // Get the cropped image data (base64 format)
        const croppedCanvas = cropper.getCroppedCanvas();
        const croppedImageUrl = croppedCanvas.toDataURL();

        // Display the cropped image in the #croppedImage element
        const croppedImageElement = document.createElement('img');
        croppedImageElement.src = croppedImageUrl;
        profile_image_container.innerHTML = ''; // Clear previous
        profile_image_container.appendChild(croppedImageElement);
    }
});

// setting desing 
const set_design = (id) => {
    const exiting = document.getElementById('resume_design');
    if (exiting) {
        exiting.parentNode.removeChild(exiting);
    }

    const new_css = document.createElement('link');
    new_css.id = 'resume_design';
    new_css.href = `css/${id}.css`;
    new_css.rel = "stylesheet";

    document.head.appendChild(new_css);
}


// getting template design
designs.forEach((design) => {
    design.addEventListener('click', () => {
        designs.forEach(element => element.classList.remove('selected_design'));
        design.classList.add('selected_design');
        const design_id = design.getAttribute('id');
        console.log(design_id)
        set_design(design_id)
    })
})


next_btn.addEventListener("click", () => {
    prev_btn.style.display = 'inline-block';
    if (current_input_section < (input_sections.length - 1)) {
        hide_all_sections();
        current_input_section++;
        input_sections[current_input_section].classList.add("active_section");
        if (current_input_section === (input_sections.length - 1)) {
            next_btn.style.display = "none";
            submit_btn.style.display = "inline-block";
        }
    }
})
prev_btn.addEventListener("click", () => {
    hide_all_sections();
    current_input_section--;
    input_sections[current_input_section].classList.add("active_section");
    if (current_input_section === 0) {
        prev_btn.style.display = "none";
    }
    if (current_input_section < input_sections.length) {
        next_btn.style.display = "inline-block";
        submit_btn.style.display = 'none'
    }
})

add_education_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const input_course = document.getElementById("input_course");
    const input_college = document.getElementById("input_college");
    const input_year = document.getElementById("input_year");
    let course = input_course.value;
    let college = input_college.value;
    let year = input_year.value;

    if (course != '' && college != '' && year != '') {
        add_education(course, college, year);
        input_course.value = '';
        input_college.value = '';
        input_year.value = '';
        input_course.classList.remove("input_error");
        input_college.classList.remove("input_error");
        input_year.classList.remove("input_error");
    }
    else {
        input_course.classList.add("input_error");
        input_college.classList.add("input_error");
        input_year.classList.add("input_error");
    }
})


add_skill_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const input_skill = document.getElementById("input_skill");
    let skill = input_skill.value;

    if (skill != '') {
        add_skill(skill);
        input_skill.value = '';
        input_skill.classList.remove('input_error');
    }
    else {
        input_skill.classList.add('input_error');
    }
})


add_project_btn.addEventListener('click', (e) => {
    e.preventDefault();
    const input_project_name = document.getElementById("input_project_name");
    const input_project_url = document.getElementById("input_project_url");
    let name = input_project_name.value;
    let url = input_project_url.value;

    if (name != '' && url != '') {
        add_project(name, url);
        input_project_name.value = '';
        input_project_url.value = '';
        input_project_name.classList.remove('input_error');
        input_project_url.classList.remove('input_error');
    }
    else {
        input_project_name.classList.add('input_error');
        input_project_url.classList.add('input_error');
    }
})


submit_btn.addEventListener("click", () => {
    let validity = check_validity();
    if (validity) {
        const name = document.getElementById('input_name').value;
        const role = document.getElementById('input_role').value;
        const contact = document.getElementById('input_contact').value;
        const email = document.getElementById('input_email').value;
        const address = document.getElementById('input_address').value;
        const url = document.getElementById('input_url').value;
        const description = document.getElementById('input_description').value;
        const skills = document.querySelectorAll('.inputted_skill');
        const projects = document.querySelectorAll('.inputted_projects');
        const education = document.querySelectorAll('.inputted_education');

        make_resume(name, role, contact, email, url, address, skills, projects, education, description)
        input_wrapper.style.display = 'none';
        resume_wrapper.style.display = 'block';
    } else if (!validity) {
        alert("All mendetory fields must be filled. \nPlease check all fields.");
    }
})

new_btn.addEventListener('click', () => {
    input_wrapper.style.display = 'block';
    resume_wrapper.style.display = 'none';
    window.location.reload();
})

edit_btn.addEventListener('click', () => {
    input_wrapper.style.display = 'block';
    resume_wrapper.style.display = 'none';
})


download_btn.addEventListener('click', () => {
    const element = document.getElementById('resume');
    window.print()
})