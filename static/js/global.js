// ========================================================================== //
// ~ GLOBAL scripts
// ========================================================================== //

const docReadyStartTime = new Date().getTime(); // Milliseconds elapsed since January 1, 1970

jQuery(document).ready(function($) { // Document Ready

console.log('global.js');

const docReadyEndTime = new Date().getTime(); // Milliseconds elapsed since January 1, 1970
const docReadyDuration = docReadyEndTime - docReadyStartTime;
console.log('Document Ready:', docReadyDuration, 'ms');

// ========================================================================== //
// Accessibility
// ========================================================================== //

// ========================================================================== //
// - Check if user prefers reduced motion

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ========================================================================== //
// - Focusable elements

const focusable = $("a[href], button, input, select, textarea, [tabindex]:not([tabindex='-1'])");

// ========================================================================== //
// - When element has focus, scroll so it is not hidden behind a fixed header

const headerHeight = $(".header-dummy").outerHeight(); // Height of fixed header

focusable.not("a.skip-link.screen-reader-text, header *").on("focusin", function() {
  const elementTop = $(this).offset().top;
  const viewportTop = $(window).scrollTop();
  const viewportHeight = $(window).height();
  const viewportBottom = viewportTop + $(window).height();
  if (elementTop < viewportTop + headerHeight ) {
    $("html, body").scrollTop(elementTop - headerHeight - 16);
  } else if (elementTop > viewportBottom - headerHeight) {
    $("html, body").scrollTop(elementTop - viewportHeight + headerHeight + 16);
  }
});

// ========================================================================== //
// - Focus trap for "modal--visible"

function trapFocus() {
  const visibleContainer = $(".modal--visible");
  // Get all focusable elements inside "visible" container
  const focusableElements = visibleContainer.find(focusable).not('#notification *');
  // Get first and last focusable element
  const firstFocusable = focusableElements.first();
  const lastFocusable = focusableElements.last();
  // Trap focus within "visible" container
  visibleContainer.on("keydown", function (e) {
    if (e.key === "Tab" || e.keyCode === 9) {
      if (e.shiftKey) { // Shift+Tab: go to previous focusable element
        if (document.activeElement === firstFocusable[0]) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else { // Tab: go to next focusable element
        if (document.activeElement === lastFocusable[0]) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// Trap focus when page loads if there is an element with class "modal--visible"
if ($(".modal--visible").length) {
  trapFocus();
}

// Check for "modal--visible" class when button is pressed
$("button.button--modal-toggle").click(function() {
  if ($(".modal--visible").length) {
    trapFocus();
  }
});

// ========================================================================== //
// DEV TOOLS
// ========================================================================== //

if (window.localStorage.getItem("static") == "true") {  // If static
  $("html").addClass("static");
  $("#static").addClass("active");
  $("#animated").removeClass("active");
};

if (window.localStorage.getItem("static") != "true") { // if not static
  $("html").removeClass("static");
  $("#static").removeClass("active");
  $("#animated").addClass("active");
};

// ========================================================================== //
// - Buttons

$("button#dev-tools-toggle").click(function() {  
  $(this).parent("#dev-tools").toggleClass("dev-tools--expanded");
});

$("button#static").click(function() {  
  $("html").removeClass("animated").addClass("static"); // Remove "animated" class, add "static" class
  console.log('HTML: Static');
  $("button#animated").removeClass("active");
  $(this).addClass("active");
  window.localStorage.setItem("static", true);
});

$("button#animated").click(function() {
  $("html").removeClass("static").addClass("animated"); // Remove "static" class, add "animated" class
  console.log('HTML: Animated');
  $("button#static").removeClass("button--active");
  $(this).addClass("button--active");
  window.localStorage.setItem("static", false);
});

$("button#loop").click(function() {
  $(this).toggleClass("button--active");
  console.log('Loop animations: Active');
  if (window.localStorage.getItem("static") != "true") { // If not static
    $("html").removeClass("animated");
    setTimeout(function() {
      $("html").addClass("animated");
    }, 600);
  }
});

$("button#clearStorage").click(function() {
  localStorage.clear();
  sessionStorage.clear();
  location.reload(true); 
});

$('button#labels').click(function() {
  $('body').toggleClass('show-labels');
  $(this).toggleClass("button--active");
  if ($('body').hasClass('show-labels')) {
    $('button#labels').text('Hide admin labels');
    console.log('Hide labels');
  } else {
    $('button#labels').text('Show admin labels');
    console.log('Show labels');
  }
});

// ========================================================================== //
// ANIMATION
// html.no-js > html.js.static (Document Ready) > html.js.loaded (Window Load)
// html.no-js > html.js.locked (Document Ready) > html.js.animated (Window Load)
// ========================================================================== //

// ========================================================================== //
// - Loader

const minTime = 400;
const maxTime = 2000;

// If user prefers reduced motion
if (prefersReducedMotion) {
  $("html").addClass("static"); // Add "static" class
  console.log('User prefers reduced motion');
  console.log('HTML: Static');
// If static
} else if (window.localStorage.getItem("static") == "true") {
  $("html").addClass("static"); // Add "static" class
  console.log('HTML: Static');
// If loader & not static
} else if ($('#loader').length > 0 && window.localStorage.getItem("static") !== true) { 
  console.log('Loader: Loading');
  $("html").addClass("locked"); // Lock scroll
  console.log('Scroll: Locked');
  function loadPage() { // Hide the loader and reveal content
    const elapsedTime = docReadyEndTime - docReadyStartTime;
    const remainingTime = Math.max(0, minTime - elapsedTime);
    setTimeout(function() {
      $('#loader').fadeOut(200, function() { // Fade out the loader
        console.log('Loader: Finished loading');
        $("html").removeClass("locked"); // Unlock scroll
        console.log('Scroll: Unlocked');
        $("html").addClass("animated"); // Add "animated" class
        console.log('HTML: Animated');
        reveal(); // Reveal after loader is finished
        console.log('Reveal');
      });
    }, remainingTime);
  }
  const backupTimer = setTimeout(function() { // Backup timer if window load is too long
    console.log('Loader: Backup timer triggered. Window load took too long.');
    loadPage(); // Hide the loader, start animations
  }, maxTime);
  $(window).on("load", function() { // Wait for site to load
    clearTimeout(backupTimer); // Clear the backup timer if window load event triggers successfully
    loadPage(); // Hide the loader, start animations
  });
// If user does not prefer reduced motion, no loader & not static
} else {
  $("html").addClass("animated"); // Add "animated" class
  console.log('HTML: Animated');
  const backupTimer = setTimeout(function() { // Backup timer if window load is too long
    reveal(); // Reveal after window load
    console.log('Reveal: Backup timer triggered. Window load took too long.');
  }, maxTime);
  $(window).on("load", function() { // Wait for site to load
    clearTimeout(backupTimer); // Clear the backup timer if window load event triggers successfully
    reveal(); // Reveal after window load
    console.log('Reveal');
  });
};

$(window).on("load", function() { // Wait for site to load
  const windowLoadEndTime = new Date().getTime();
  const windowLoad = windowLoadEndTime - docReadyStartTime;
  console.log('Window Load:', windowLoad, 'ms');
  $("html").addClass("loaded"); // Add "loaded" class
  console.log('HTML: Loaded');
});

// ========================================================================== //
// - Animate/reveal on scroll

const revealPoint = 0;
const revealDelay = 200; // Reveal delay in milliseconds

$(window).on("scroll", reveal);

function reveal() {
  const reveals = $(".reveal, .reveal_section > *");
  const windowHeight = $(window).height();
  reveals.each(function(index, element) {
    const revealTop = element.getBoundingClientRect().top;
    const revealBottom = element.getBoundingClientRect().bottom;
    if (revealTop < windowHeight - revealPoint) { // If revealTop is less than windowHeight - revealPoint: add "revealed" class
      setTimeout(function() {
        $(element).addClass("revealed");
      }, revealDelay);
    } else if ($("#loop").hasClass("active")) { // If loop is active
      $(element).removeClass("revealed");
    }
    if ($("#loop").hasClass("active") && revealBottom < revealPoint) { // If #loop is active and revealBottom is less than revealPoint: remove "revealed" class
      $(element).removeClass("revealed");
    }
  });
}

// ========================================================================== //
// HEADER <header>
// ========================================================================== //

// ========================================================================== //
// - header.scrolled

const scrollThreshold = 1; // Scroll threshold (in pixels)

$(window).scroll(function() {
  if ($(this).scrollTop() >= scrollThreshold) { // If scrolled more than scroll threshold
    $("html").addClass("scrolled");           // Add .scrolled class
  } else {                                      // If at top of page
    $("html").removeClass("scrolled");        // Remove .scrolled class
  }
});

// ========================================================================== //
// - #notification

const notificationDuration = 5000; // Notification duration (in milliseconds)

// Scroll to top and show if in focus
$("#notification").on("focusin", focusable, function() {
  $("html, body").scrollTop(0);
});

// Lose focus when header is "visible"
$("#hamburger").click(function() {
  if ($("header").hasClass("visible")) { // Check if header is "visible"
    $("#notification").blur(); // Remove focus from #notification
  }
});

// Cycle through multiple notifications
const notifications = $("html.animated #notification .notification");

if (notifications.length > 1) {
  setInterval(function() {
    const activeNotification = $("#notification .active");
    const nextNotification = activeNotification.next(".notification");
    if (nextNotification.length === 0) {
      nextNotification = notifications.first();
    }
    activeNotification.removeClass("active");
    nextNotification.addClass("active");
  }, notificationDuration);
};

// ========================================================================== //
// - #hamburger & #nav-overlay

// Add "with-nav-overlay" and change descriptive text w/ #hamburger click
$("#hamburger").on("click", function (e) {
  $("header").toggleClass("with-nav-overlay");
  $("#hamburger-label").fadeOut(function() {
    $(this).text(function (index, text) {
      return text === "Menu" ? "Close" : "Menu";
    }).fadeIn();
  });
});

// Click #hamburger w/ click of anchor link
$("header a[href^='#']").on("click", function (e) {
  if ($("header").hasClass("with-nav-overlay")) {
    $("#hamburger").click();
  }
});

// Click #hamburger w/ Esc key
$(document).keyup(function(e) {
  if ($("header").hasClass("with-nav-overlay")) {
    if (e.key === "Escape") {
      $("#hamburger").click();
    }
  }
});

// ========================================================================== //
// Modals
// ========================================================================== //

const modalSpeed = 400;

// Show modal
function showModal(modalId) {
  // Lock <html>
  $("html").addClass("locked");
  console.log(`HTML: Locked`);
  // Add "with-modal" class to <html>
  $("html").addClass("with-modal");
  // Fade in modal
  $("#" + modalId).removeClass("modal--hidden");
  setTimeout(function() {
    $("#" + modalId).addClass("modal--visible");
  }, 0);
  // Accessibility
  $("#" + modalId).attr('aria-expanded', 'true');
}

// Hide modal
function hideModal(modalId) {
  // Unlock <html>
  $("html").removeClass("locked");
  console.log(`HTML: Unlocked`);
  // Remove "with-modal" class to <html>
  $("html").removeClass("with-modal");
  // Fade out modal
  $("#" + modalId).removeClass("modal--visible");
  setTimeout(function() {
    $("#" + modalId).addClass("modal--hidden");
  }, modalSpeed);
  // Accessibility
  $("#" + modalId).attr('aria-expanded', 'false');
}

// Toggle modal w/ toggle button or Enter
$("button.button--modal-toggle").click(function() {
  let modalId = $(this).data("modal-id");
  if ($("#" + modalId).hasClass("modal--hidden")) {
    showModal(modalId);
    console.log(`Modal shown w/ toggle: ${modalId}`);
  } else if ($("#" + modalId).hasClass("modal--visible")) {
    hideModal(modalId);
    console.log(`Modal hidden w/ toggle: ${modalId}`);
  }
});

// Hide modal w/ hide button
$("button.button--modal-hide").click(function() {
  let modalId = $(this).data("modal-id");
  hideModal(modalId);
  console.log(`Modal hidden w/ hide button: ${modalId}`);
});

// Hide modal w/ Esc key
$(document).keyup(function(e) {
  if ($("dialog").hasClass("modal--visible")) {
    let modalId = $("dialog.modal--visible").attr("id");
    if (e.key === "Escape") {
      hideModal(modalId);
      console.log(`Modal hidden w/ Esc key: ${modalId}`);
    }
  }
});

// Hide modal w/ outside click
$('.modal_container').click(function(event) {
  let modalId = $("dialog.modal--visible").attr("id");
  if (!$(event.target).closest('.modal').length) {
    hideModal(modalId);
    console.log('Modal hidden w/ outside click: ${modalId}');
  }
});

}); // End jQuery
