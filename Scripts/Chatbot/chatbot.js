const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input i");
const chatbox = document.querySelector(".chatbox");
const typingIndicator = document.querySelector(".typing");
const chatbotToggle = document.querySelector(".chat-toggle");
const chatCloseButton = document.querySelector(".close-icon");

let userMessage;

const responses = {
    "Hi": "Hello! 👋 How can I assist you today?",
    "Hello":"Hi! 👋 How can I assist you today?",
    "Eita": "Hello! 👋 How can I assist you today?",
    "Huzit": "Ola! 👋 How can I assist you today?",
    "Howzit": "Exe! 👋 How can I assist you today?",
    "Ola": "Sho! 👋 How can I assist you today?",
    "Exe": "Ola! 👋 How can I assist you today?",
    "Fede": "Sho! 👋 How can I assist you today?",
    "How are you": "I am doing great how about you?",
    "How are you doing": "I am doing great how about you?",
    "How are you feeling": "I am doing great how about you?",
    "I am doing great": "Glad to know! How can i be of assistance today?",
    "I am doing well": "Glad to know! How can i be of assistance today?",
    "I'm good": "Glad to know! How can i be of assistance today?",
    "I am okay": "Glad to know! How can i be of assistance today?",
    "Where are you from": "I am originally from Free State, Bloemfontein but currently in Johannesburg",
    "I'm okay and yourself": "Glad to know! How can i be of assistance today?",
    "Where are you currently located 🏠": "I am currently located in Johannesburg, Gauteng",
    "What 💻 services do you offer": "I offer web development, web design,mobile dev , mobile design, and SEO services.",
    "Can you tell me about yourself 🧑": "I'm a software developer with over 2 years in web dev and over 3 years in mobile app dev currently based in Johannesburg Gauteng.",
    "How can I 📲 contact you": "You can reach me through the contact form on this website contact form or via a phone call 0748632478. ",
    "What 💼 projects have you worked on": "I have worked on various web development projects, Mobile Appliacation Projects also including design. For more, visit: <a href='https://github.com/NuffSaid-Bore?tab=repositories' target='_blank'>my GitHub repositories</a>.",
    "What is your experience 🏢": "I have several years of experience in web development, mobile development and recenty started with design.",
    "🗣 Speak to an agent": "Connecting you to an agent. You’ll receive a response soon!",
    "Goodbye bye": "Goodbye! Have a great day!",
};

const optionResponses = [
    { text: "What 💻 services do you offer?", value: "What 💻 services do you offer?" },
    { text: "Can you tell me about yourself 🧑?", value: "Can you tell me about yourself 🧑?" },
    { text: "How can I 📲 contact you?", value: "How can I 📲 contact you?" },
    { text: "Where are you currently located 🏠?", value: "Where are you currently located 🏠?" },
    { text: "What is your experience 🏢?", value: "What is your experience 🏢?" },
    { text: "What 💼 projects have you worked on?", value: "What 💼 projects have you worked on" },
    { text: "🗣 Speak to an agent?", value: "🗣 Speak to an agent?" },
    { text: "Goodbye", value: "Goodbye" }
];

const createChatLi = (message, className) => {
    const chatli = document.createElement("li");
    chatli.classList.add("chat", className);
    const currentTime = new Date();
    const hours = currentTime.getHours() % 12 || 12;
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const ampm = currentTime.getHours() >= 12 ? "PM" : "AM";
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    let chatContent = className === "outgoing" 
    ? `<div class="message-container"><p>${message}</p><span class="timestamp">${formattedTime}</span></div>` 
    : `<i class='bx bxs-bot'></i><div class="message-container"><p>${message}</p><span class="timestamp">${formattedTime}</span></div>`;
    chatli.innerHTML = chatContent;
    return chatli;
}

const createOptionLi = (option) => {
    const optionLi = document.createElement("li");
    optionLi.classList.add("option");
    optionLi.innerHTML = `<div class="option-btn">${option.text}</div>`;
    return optionLi;
}

const displayOptions = () => {
    const optionsContainer = document.createElement("ul");
    optionsContainer.classList.add("options");

    optionResponses.forEach(option => {
        const optionLi = createOptionLi(option);
        optionsContainer.appendChild(optionLi);

        optionLi.addEventListener("click", () => {
            handleChatWithOption(option.value);
        });
    });

    chatbox.appendChild(optionsContainer);
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatInput.value = '';
    chatbox.scrollTo(0, chatbox.scrollHeight);

    typingIndicator.classList.remove("hidden");
    
    let botResponse = "I'm sorry, I don't understand that.";
    let understood = false;

    for (const question in responses) {
        if (userMessage.toLowerCase().includes(question.toLowerCase())) {
            botResponse = responses[question];
            understood = true;
            break;
        }
    }

    setTimeout(() => {
        typingIndicator.classList.add("hidden");

        chatbox.appendChild(createChatLi(botResponse, "incoming"));

        if (!understood) {
            displayOptions();
        }

        chatbox.scrollTo(0, chatbox.scrollHeight);
    }, 4000);
}

const handleChatWithOption = (selectedOption) => {
    chatInput.value = selectedOption;
    handleChat();
}
chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotToggle.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
chatCloseButton.addEventListener("click", () => document.body.classList.remove("show-chatbot"));