var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-contents");

        function opentab(tabname){
           for(tablink of tablinks){
                tablink.classList.remove("active-link");
           }
           for(tabcontent of tabcontents){
                tabcontent.classList.remove("active-tab");
           }
           event.currentTarget.classList.add("active-link");
           document.getElementById(tabname).classList.add("active-tab");
        }


        var sidemenu = document.getElementById("sidemenu");

        function openmenu(){
            sidemenu.style.right = "0";
        }
        function closemenu(){
            sidemenu.style.right = "-200px";
        }

//Get all needed elements from the DOM
const contactForm = document.querySelector("#contact-form");
const submitBtn = document.querySelector(".submit-btn");
const nameInput = document.querySelector("#user_name");
const emailInput = document.querySelector("#user_email");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");

//Get needed data from email JS
const publicKey = "51eAbHxO25TsRhYFr";
const serviceID = "service_fnztb84";
const templateID = "template_p8kzqfh";

//Initialize email JS with public key
emailjs.init(publicKey);

//Add submit event to the form
contactForm.addEventListener("submit", e => {
    //Prevent from default behaviour
    e.preventDefault();
    //Change button text
    submitBtn.innerText = "Just A Moment...";
    //Get all input field values
    const inputFields = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    }
    // Send the email
    // (Add service, template ID and input Field values)
    emailjs.send(serviceID, templateID, inputFields)
        .then(() => {
            //Change Button Text
            submitBtn.innerText = "Done";
            //Clear out all input fields
            nameInput.value = "";
            emailInput.value = "";
            subjectInput.value = "";
            messageInput.value = "";
        }, (error) => {
            //console log the error
            console.log(error);
            //Change Button Text
            submitBtn.innerText = "Faild!";
        });
});