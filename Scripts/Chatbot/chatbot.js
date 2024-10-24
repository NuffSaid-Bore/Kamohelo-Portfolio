const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input i");
const chatbox = document.querySelector(".chatbox");
const chatbotToggle = document.querySelector(".chat-toggle");

let userMessage;

const createChatLi = (message , className) => {
    const chatli = document.createElement("li");
    chatli.classList.add("chat", className);

    let chatContent = className === "outgoing" ? `<p>${message}</p>` : ` <i class='bx bxs-bot'></i><p>${message}</p>`;
    chatli.innerHTML = chatContent;
    return chatli;
}
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
        chatbox.appendChild(createChatLi(userMessage,"outgoing"));
        chatInput.value = '';
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() =>{
            chatbox.appendChild(createChatLi("Typing...","incoming"));
            chatbox.scrollTo(0, chatbox.scrollHeight);
        }, 800);
    
}


sendChatBtn.addEventListener("click", handleChat);
chatbotToggle.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));