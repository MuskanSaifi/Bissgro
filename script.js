 (function(){
      // Reviews slider (only on pages that have it)
      const track = document.getElementById('review-track');
      const dots = document.querySelectorAll('#review-dots .dot');
      if (!track || !dots.length) return;
      let idx = 0;
      const total = track.children.length;

      function goTo(i){
        idx = (i + total) % total;

        // Get the width of a single card, including its margin
        const cardStyle = getComputedStyle(track.children[0]);
        const cardWidth = track.children[0].offsetWidth;
        const cardMarginRight = parseFloat(cardStyle.marginRight);
        const cardMarginLeft = parseFloat(cardStyle.marginLeft);
        const totalCardWidthWithMargin = cardWidth + cardMarginLeft + cardMarginRight;

        const sliderWidth = track.parentElement.offsetWidth; // Width of the visible slider area
        const contentWidth = totalCardWidthWithMargin * total; // Total width if all cards were laid out

        let transformX;

        if (contentWidth < sliderWidth) {
          // If all content fits, center it directly
          transformX = (sliderWidth - contentWidth) / 2;
        } else {
          // Calculate the offset needed to bring the current card to the visual center.
          const currentCardLeftEdge = idx * totalCardWidthWithMargin;
          const currentCardCenter = currentCardLeftEdge + (totalCardWidthWithMargin / 2);
          const sliderCenter = sliderWidth / 2;
          
          transformX = sliderCenter - currentCardCenter;

          // Boundary checks to prevent pushing content too far left or right
          const maxTransformX = 0; // First card's left edge aligns with slider's left edge
          const minTransformX = sliderWidth - contentWidth; // Last card's right edge aligns with slider's right edge

          transformX = Math.min(maxTransformX, Math.max(minTransformX, transformX));
        }

        track.style.transform = `translateX(${transformX}px)`;
        
        dots.forEach(d=>d.classList.remove('active'));
        if(dots[idx]) dots[idx].classList.add('active');
      }

      // attach dots
      dots.forEach(d=>{
        d.addEventListener('click', ()=> goTo(+d.dataset.index));
      });

      // autoplay
      let autoplay = setInterval(()=> goTo(idx+1), 4200);
      // pause on hover
      track.parentElement.addEventListener('mouseenter', ()=> clearInterval(autoplay));
      track.parentElement.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> goTo(idx+1), 4200));

      // adjust on resize (to keep proper offset)
      window.addEventListener('resize', ()=> goTo(idx));

      // initial
      goTo(0);
    })();

    

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav.main-nav");
  if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
  }

  // Contact form – WhatsApp redirect
  const whatsappForm = document.getElementById("whatsappForm");
  if (whatsappForm) {
    whatsappForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;
      const text = `Hello, I have an enquiry.%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
      window.open(`https://wa.me/917303981193?text=${text}`, "_blank");
    });
  }

  // Chatbot functionality - Lead Generation Flow
  const chatbotButton = document.getElementById("chatbotButton");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotSend = document.getElementById("chatbotSend");
  const chatbotMessages = document.getElementById("chatbotMessages");

  if (chatbotButton && chatbotWindow) {
    // Lead data storage
    let leadData = {
      service: null,
      subService: null,
      websiteType: null,
      seo: null,
      appType: null,
      name: null,
      phone: null,
      email: null
    };

    let currentStep = 'welcome';
    let isCollectingInfo = false;
    let infoStep = null; // 'name' | 'phone' | 'email'

    // Toggle chatbot window
    chatbotButton.addEventListener("click", () => {
      chatbotWindow.classList.toggle("open");
      if (chatbotWindow.classList.contains("open")) {
        chatbotInput.focus();
        // Show welcome message if first time
        if (chatbotMessages.children.length === 0) {
          startLeadFlow();
        }
      }
    });

    chatbotClose.addEventListener("click", () => {
      chatbotWindow.classList.remove("open");
    });

    // Start lead generation flow
    function startLeadFlow() {
      currentStep = 'service';
      addBotMessage("Hello! 👋 Welcome to Bissgro!\n\nI'm here to help you get started. Which service are you interested in?", [
        "Web Development",
        "App Development",
        "SEO Service",
        "Other Services"
      ]);
    }

    // Add message to chat
    function addMessage(text, isUser = false, quickReplies = null) {
      const messageDiv = document.createElement("div");
      messageDiv.className = `chatbot-message ${isUser ? "user" : "bot"}`;
      
      const avatar = document.createElement("div");
      avatar.className = "chatbot-avatar";
      avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
      
      const textDiv = document.createElement("div");
      textDiv.className = "chatbot-text";
      textDiv.innerHTML = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      
      messageDiv.appendChild(avatar);
      messageDiv.appendChild(textDiv);
      
      if (quickReplies && !isUser) {
        const quickRepliesDiv = document.createElement("div");
        quickRepliesDiv.className = "chatbot-quick-replies";
        quickReplies.forEach(reply => {
          const btn = document.createElement("button");
          btn.className = "chatbot-quick-reply";
          btn.textContent = reply;
          btn.addEventListener("click", () => {
            handleQuickReply(reply);
          });
          quickRepliesDiv.appendChild(btn);
        });
        textDiv.appendChild(quickRepliesDiv);
      }

      chatbotMessages.appendChild(messageDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addBotMessage(text, quickReplies = null) {
      addMessage(text, false, quickReplies);
    }

    function addUserMessage(text) {
      addMessage(text, true);
    }

    // Handle service selection
    function handleServiceSelection(service) {
      leadData.service = service;
      addUserMessage(service);
      
      setTimeout(() => {
        if (service === "Web Development") {
          currentStep = 'websiteType';
          addBotMessage("Great choice! What type of website do you need?", [
            "E-commerce Website",
            "Business Website",
            "Portfolio Website",
            "Blog Website",
            "Custom Website"
          ]);
        } else if (service === "App Development") {
          currentStep = 'appType';
          addBotMessage("Excellent! What type of app are you looking for?", [
            "iOS App",
            "Android App",
            "Cross-platform App",
            "Hybrid App"
          ]);
        } else {
          // For SEO or other services, go directly to info collection
          currentStep = 'info';
          isCollectingInfo = true;
          askForName();
        }
      }, 500);
    }

    // Handle website type selection
    function handleWebsiteTypeSelection(type) {
      leadData.websiteType = type;
      addUserMessage(type);
      
      setTimeout(() => {
        currentStep = 'seo';
        addBotMessage("Perfect! Would you like SEO (Search Engine Optimization) services as well?", [
          "Yes, I need SEO",
          "No, just website"
        ]);
      }, 500);
    }

    // Handle SEO selection
    function handleSEOSelection(seoChoice) {
      leadData.seo = seoChoice === "Yes, I need SEO" ? "Yes" : "No";
      addUserMessage(seoChoice);
      
      setTimeout(() => {
        currentStep = 'info';
        isCollectingInfo = true;
        askForName();
      }, 500);
    }

    // Handle app type selection
    function handleAppTypeSelection(type) {
      leadData.appType = type;
      addUserMessage(type);
      
      setTimeout(() => {
        currentStep = 'info';
        isCollectingInfo = true;
        askForName();
      }, 500);
    }

    // Collect user information (use main input at bottom – type & press Enter/Send)
    function askForName() {
      infoStep = 'name';
      addBotMessage("Perfect! To proceed, I'll need some information from you.\n\n**What's your name?** (Type below and press Enter)");
    }

    function askForPhone() {
      infoStep = 'phone';
      addBotMessage("Thanks! **What's your phone number?** (e.g. 9876543210)");
    }

    function askForEmail() {
      infoStep = 'email';
      addBotMessage("Great! **And your email address?**");
    }

    // Submit lead to WhatsApp
    function submitLead() {
      const message = formatLeadMessage();
      addBotMessage("Thank you! 🎉\n\nI'm sending your information to our team. You'll be contacted shortly!");
      
      setTimeout(() => {
        // Open WhatsApp with formatted message
        const whatsappMessage = encodeURIComponent(message);
        window.open(`https://wa.me/917303981193?text=${whatsappMessage}`, "_blank");
        
        // Reset for new lead
        setTimeout(() => {
          leadData = {
            service: null,
            subService: null,
            websiteType: null,
            seo: null,
            appType: null,
            name: null,
            phone: null,
            email: null
          };
          currentStep = 'welcome';
          isCollectingInfo = false;
          infoStep = null;
          addBotMessage("Is there anything else I can help you with?", [
            "Start New Inquiry",
            "View Pricing",
            "Contact Info"
          ]);
        }, 2000);
      }, 1000);
    }

    // Format lead message for WhatsApp
    function formatLeadMessage() {
      let message = "🆕 *NEW LEAD FROM WEBSITE CHATBOT*\n\n";
      message += "━━━━━━━━━━━━━━━━━━━━\n\n";
      
      message += "👤 *Name:* " + leadData.name + "\n";
      message += "📞 *Phone:* " + leadData.phone + "\n";
      message += "📧 *Email:* " + leadData.email + "\n\n";
      
      message += "━━━━━━━━━━━━━━━━━━━━\n\n";
      message += "📋 *Service Details:*\n\n";
      message += "• *Service:* " + leadData.service + "\n";
      
      if (leadData.websiteType) {
        message += "• *Website Type:* " + leadData.websiteType + "\n";
      }
      if (leadData.seo) {
        message += "• *SEO Required:* " + leadData.seo + "\n";
      }
      if (leadData.appType) {
        message += "• *App Type:* " + leadData.appType + "\n";
      }
      
      message += "\n━━━━━━━━━━━━━━━━━━━━\n";
      message += "✅ Ready to follow up!";
      
      return message;
    }

    // Handle user input
    function handleUserInput(input) {
      const trimmed = (input || '').trim();
      if (!trimmed) return;

      // Collecting name / phone / email – use main input
      if (isCollectingInfo && infoStep) {
        if (infoStep === 'name') {
          leadData.name = trimmed;
          addUserMessage(trimmed);
          setTimeout(() => askForPhone(), 400);
        } else if (infoStep === 'phone') {
          leadData.phone = trimmed.replace(/\s/g, '');
          addUserMessage(trimmed);
          setTimeout(() => askForEmail(), 400);
        } else if (infoStep === 'email') {
          leadData.email = trimmed;
          addUserMessage(trimmed);
          setTimeout(() => submitLead(), 400);
        }
        return;
      }

      const lowerInput = trimmed.toLowerCase();
      addUserMessage(trimmed);
      
      setTimeout(() => {
        if (currentStep === 'service') {
          if (lowerInput.includes("web") || lowerInput.includes("website")) {
            handleServiceSelection("Web Development");
          } else if (lowerInput.includes("app") || lowerInput.includes("application")) {
            handleServiceSelection("App Development");
          } else if (lowerInput.includes("seo")) {
            handleServiceSelection("SEO Service");
          } else {
            addBotMessage("Please select one of the options above to continue.", [
              "Web Development",
              "App Development",
              "SEO Service",
              "Other Services"
            ]);
          }
        } else if (currentStep === 'websiteType') {
          handleWebsiteTypeSelection(input);
        } else if (currentStep === 'seo') {
          if (lowerInput.includes("yes") || lowerInput.includes("need") || lowerInput.includes("want")) {
            handleSEOSelection("Yes, I need SEO");
          } else {
            handleSEOSelection("No, just website");
          }
        } else if (currentStep === 'appType') {
          handleAppTypeSelection(input);
        } else if (lowerInput.includes("start new") || lowerInput.includes("new inquiry")) {
          startLeadFlow();
        } else if (lowerInput.includes("pricing") || lowerInput.includes("price")) {
          addBotMessage("Check out our <a href='./plans.html' style='color: var(--accent); text-decoration: underline;'>pricing page</a> for all package details!");
        } else if (lowerInput.includes("contact")) {
          addBotMessage("📍 Address: 44, Block-H, Noida, Uttar Pradesh, India, 201301\n📞 Phone: +91 73039 81193\n📧 Email: info@bissgro.com");
        } else {
          addBotMessage("I'm here to help you get started! Please select a service option above.", [
            "Web Development",
            "App Development",
            "SEO Service"
          ]);
        }
      }, 500);
    }

    function handleQuickReply(reply) {
      if (currentStep === 'service') {
        handleServiceSelection(reply);
      } else if (currentStep === 'websiteType') {
        handleWebsiteTypeSelection(reply);
      } else if (currentStep === 'seo') {
        handleSEOSelection(reply);
      } else if (currentStep === 'appType') {
        handleAppTypeSelection(reply);
      } else if (reply === "Start New Inquiry") {
        chatbotMessages.innerHTML = "";
        startLeadFlow();
      } else if (reply === "View Pricing") {
        window.location.href = "./plans.html";
      } else if (reply === "Contact Info") {
        addBotMessage("📍 Address: 44, Block-H, Noida, Uttar Pradesh, India, 201301\n📞 Phone: +91 73039 81193\n📧 Email: info@bissgro.com");
      } else {
        handleUserInput(reply);
      }
    }

    // Send message on button click
    chatbotSend.addEventListener("click", () => {
      const input = chatbotInput.value.trim();
      if (input) {
        handleUserInput(input);
        chatbotInput.value = "";
      }
    });

    // Send message on Enter key
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const input = chatbotInput.value.trim();
        if (input) {
          handleUserInput(input);
          chatbotInput.value = "";
        }
      }
    });
  }
});



