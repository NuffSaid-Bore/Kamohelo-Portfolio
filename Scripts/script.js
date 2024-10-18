const menuLinks = document.querySelectorAll('.menu a');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menuList");
const filterItems = document.querySelectorAll('.filter-item');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const scrollers = document.querySelectorAll(".scroller");
const openForm = document.getElementById('openForm');
const contactForm = document.getElementById('contactForm');
const closeForm = document.getElementById('closeForm');

// Get the current year and set it in the footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

menuLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        // Remove active class from all links and sections
        menuLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to the clicked link and corresponding section
        link.classList.add('active');
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.classList.add('active');
    });
});


hamburger.addEventListener("click", function() {
    // Toggle the active class to show/hide the menu
    menu.classList.toggle("hidden");
    document.querySelector('.menu').classList.toggle('active'); // Toggle active class
    document.querySelector('.container').classList.toggle('hamburger-visible');
    hamburger.classList.toggle('open');
});

var typed = new Typed(".multiple-text", {
    strings: ["Student", "Programmer", "Video Games Enthusiast", "Dreamer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});



filterItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all filter items
        filterItems.forEach(i => i.classList.remove('active'));
        // Add active class to the clicked filter item
        item.classList.add('active');

        const category = item.textContent;

        portfolioItems.forEach(portfolioItem => {
            const itemCategory = portfolioItem.querySelector('.item-category').textContent;

            // Show or hide items based on selected filter
            if (category === 'All' || itemCategory === category) {
                portfolioItem.classList.add('active');
            } else {
                portfolioItem.classList.remove('active');
            }
        });
    });
});

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }
  
  function addAnimation() {
    scrollers.forEach((scroller) => {
      // add data-animated="true" to every `.scroller` on the page
      scroller.setAttribute("data-animated", true);
  
      // Make an array from the elements within `.scroller-inner`
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
  
      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
  
//  Contact form
document.addEventListener('DOMContentLoaded', function () {
    

    // Open the contact form
    openForm.addEventListener('click', function (event) {
        event.preventDefault();
        contactForm.classList.add('open');
    });

    // Close the form when clicking the close button
    closeForm.addEventListener('click', function () {
        contactForm.classList.remove('open');
    });

   // Close the form when clicking outside of it
    window.addEventListener('click', function (event) {
        // Check if the clicked target is outside the contact form
        if (!contactForm.contains(event.target) && event.target !== openForm) {
            contactForm.classList.remove('open'); // Close the form
        }
    });


});
//  TimeLine
document.addEventListener("DOMContentLoaded", function() {
    var timelines = document.querySelectorAll('.cd-horizontal-timeline'),
        eventsMinDistance = 30;

    if (timelines.length > 0) {
        initTimeline(timelines);
    }

    function initTimeline(timelines) {
        timelines.forEach(function(timeline) {
            var timelineComponents = {};
            // Cache timeline components
            timelineComponents['timelineWrapper'] = timeline.querySelector('.events-wrapper');
            timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].querySelector('.events');
            timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].querySelector('.filling-line');
            timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].querySelectorAll('a');
            timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
            timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
            timelineComponents['timelineNavigation'] = timeline.querySelector('.cd-timeline-navigation');
            timelineComponents['eventsContent'] = timeline.querySelector('.events-content');

            // Assign a left position to the single events along the timeline
            setDatePosition(timelineComponents, eventsMinDistance);
            // Assign a width to the timeline
            var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
            // The timeline has been initialized - show it
            timeline.classList.add('loaded');

            // Detect click on the next arrow
            timelineComponents['timelineNavigation'].querySelector('.next').addEventListener('click', function(event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'next');
            });
            // Detect click on the prev arrow
            timelineComponents['timelineNavigation'].querySelector('.prev').addEventListener('click', function(event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'prev');
            });
            // Detect click on a single event - show new event content
            timelineComponents['eventsWrapper'].addEventListener('click', function(event) {
                if (event.target.tagName === 'A') {
                    event.preventDefault();
                    timelineComponents['timelineEvents'].forEach(function(evt) {
                        evt.classList.remove('selected');
                    });
                    event.target.classList.add('selected');
                    updateOlderEvents(event.target);
                    updateFilling(event.target, timelineComponents['fillingLine'], timelineTotWidth);
                    updateVisibleContent(event.target, timelineComponents['eventsContent']);
                }
            });

            // Keyboard navigation
            document.addEventListener('keyup', function(event) {
                if (event.key === 'ArrowLeft' && elementInViewport(timeline)) {
                    showNewContent(timelineComponents, timelineTotWidth, 'prev');
                } else if (event.key === 'ArrowRight' && elementInViewport(timeline)) {
                    showNewContent(timelineComponents, timelineTotWidth, 'next');
                }
            });
        });
    }

    function updateSlide(timelineComponents, timelineTotWidth, string) {
        var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
            wrapperWidth = parseFloat(window.getComputedStyle(timelineComponents['timelineWrapper']).width);
        // Translate the timeline to the left('next')/right('prev') 
        if (string === 'next') {
            translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth);
        } else {
            translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
        }
    }

    function showNewContent(timelineComponents, timelineTotWidth, string) {
        var visibleContent = timelineComponents['eventsContent'].querySelector('.selected'),
            newContent = (string === 'next') ? visibleContent.nextElementSibling : visibleContent.previousElementSibling;

        if (newContent) { // If there's a next/prev event - show it
            var selectedDate = timelineComponents['eventsWrapper'].querySelector('.selected'),
                newEvent = (string === 'next') ? selectedDate.parentElement.nextElementSibling.querySelector('a') : selectedDate.parentElement.previousElementSibling.querySelector('a');

            updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
            updateVisibleContent(newEvent, timelineComponents['eventsContent']);
            newEvent.classList.add('selected');
            selectedDate.classList.remove('selected');
            updateOlderEvents(newEvent);
            updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
        }
    }

    function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
        var eventStyle = window.getComputedStyle(event),
            eventLeft = parseFloat(eventStyle.left),
            timelineWidth = parseFloat(window.getComputedStyle(timelineComponents['timelineWrapper']).width),
            timelineTotWidth = parseFloat(window.getComputedStyle(timelineComponents['eventsWrapper']).width);
        var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if ((string === 'next' && eventLeft > timelineWidth - timelineTranslate) || (string === 'prev' && eventLeft < -timelineTranslate)) {
            translateTimeline(timelineComponents, -eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
        }
    }

    function translateTimeline(timelineComponents, value, totWidth) {
        var eventsWrapper = timelineComponents['eventsWrapper'];
        value = (value > 0) ? 0 : value; // Only negative translate value
        value = (totWidth !== undefined && value < totWidth) ? totWidth : value; // Do not translate more than timeline width
        setTransformValue(eventsWrapper, 'translateX', value + 'px');
        // Update navigation arrows visibility
        if (value === 0) {
            timelineComponents['timelineNavigation'].querySelector('.prev').classList.add('inactive');
        } else {
            timelineComponents['timelineNavigation'].querySelector('.prev').classList.remove('inactive');
        }
        if (value === totWidth) {
            timelineComponents['timelineNavigation'].querySelector('.next').classList.add('inactive');
        } else {
            timelineComponents['timelineNavigation'].querySelector('.next').classList.remove('inactive');
        }
    }

    function updateFilling(selectedEvent, filling, totWidth) {
        var eventStyle = window.getComputedStyle(selectedEvent),
            eventLeft = parseFloat(eventStyle.left),
            eventWidth = parseFloat(eventStyle.width);
        eventLeft = eventLeft + (eventWidth / 2);
        var scaleValue = eventLeft / totWidth;

         filling.style.height = '2px'; 
        setTransformValue(filling, 'scaleX', scaleValue);
    }

    function setDatePosition(timelineComponents, min) {
        timelineComponents['timelineDates'].forEach(function(date, i) {
            var distance = daydiff(timelineComponents['timelineDates'][0], date),
                distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
            timelineComponents['timelineEvents'][i].style.left = distanceNorm * min + 'px';
        });
    }

    function setTimelineWidth(timelineComponents, width) {
        var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
            timeSpanNorm = Math.round(timeSpan / timelineComponents['eventsMinLapse']) + 4,
            totalWidth = timeSpanNorm * width;
        timelineComponents['eventsWrapper'].style.width = totalWidth + 'px';
        updateFilling(timelineComponents['timelineEvents'][0], timelineComponents['fillingLine'], totalWidth);
        return totalWidth;
    }

    function updateVisibleContent(event, eventsContent) {
        var eventDate = event.dataset.date,
            visibleContent = eventsContent.querySelector('.selected'),
            selectedContent = eventsContent.querySelector('[data-date="' + eventDate + '"]'),
            selectedContentHeight = selectedContent.offsetHeight;

        var classEntering, classLeaving;
        if (Array.prototype.indexOf.call(selectedContent.parentNode.children, selectedContent) > Array.prototype.indexOf.call(visibleContent.parentNode.children, visibleContent)) {
            classEntering = 'selected enter-right';
            classLeaving = 'leave-left';
        } else {
            classEntering = 'selected enter-left';
            classLeaving = 'leave-right';
        }

        selectedContent.className = classEntering;
        visibleContent.className = classLeaving;
        visibleContent.addEventListener('animationend', function() {
            visibleContent.classList.remove('leave-right', 'leave-left');
            selectedContent.classList.remove('enter-left', 'enter-right');
        }, { once: true });
        eventsContent.style.height = selectedContentHeight + 'px';
    }

    function updateOlderEvents(event) {
        var parentLi = event.closest('li');
        var previousSiblings = Array.from(parentLi.parentElement.children).slice(0, Array.prototype.indexOf.call(parentLi.parentElement.children, parentLi));
        previousSiblings.forEach(function(li) {
            li.querySelector('a').classList.add('older-event');
        });
        var nextSiblings = Array.from(parentLi.parentElement.children).slice(Array.prototype.indexOf.call(parentLi.parentElement.children, parentLi) + 1);
        nextSiblings.forEach(function(li) {
            li.querySelector('a').classList.remove('older-event');
        });
    }

    function getTranslateValue(timeline) {
        var timelineStyle = window.getComputedStyle(timeline),
            timelineTranslate = timelineStyle.transform;

        if (timelineTranslate.includes('(')) {
            var translateValue = timelineTranslate.split('(')[1].split(')')[0].split(',');
            return parseFloat(translateValue[4]);
        } else {
            return 0;
        }
    }

    function setTransformValue(element, property, value) {
        element.style.transform = property + "(" + value + ")";
    }

    function parseDate(events) {
        var dateArrays = [];
        events.forEach(function(event) {
            var dateComp = event.dataset.date.split('/'),
                newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
            dateArrays.push(newDate);
        });
        return dateArrays;
    }

    function daydiff(first, second) {
        return Math.round((second - first));
    }

    function minLapse(dates) {
        var dateDistances = [];
        for (var i = 1; i < dates.length; i++) {
            var distance = daydiff(dates[i - 1], dates[i]);
            dateDistances.push(distance);
        }
        return Math.min.apply(null, dateDistances);
    }

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkMQ() {
        return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
    }
});

