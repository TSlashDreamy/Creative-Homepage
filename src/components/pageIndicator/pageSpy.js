// Function called in index.js
import background from "../background/background.module.css"; // getting react classnames for object position

function pageSpy() {
  var scrollTop = 0; // top position
  var selected = 0; // current position on page
  let bottomObj = document.getElementById("bottomObj"); // main 3d object
  let leftObj = document.getElementById("leftObj"); // left 3d object
  let rightObj = document.getElementById("rightObj"); // right 3d object
  const windowHeight = window.innerHeight; // getting current window height

  // reset selection of section
  function resetSelection(navigation) {
    if (navigation === null) {
      return;
    }

    for (var i = 0; i < navigation.children.length; i++) {
      navigation.children[i].children[0].children[2].classList.remove(
        "selected"
      );
      navigation.children[
        i
      ].children[0].children[1].children[0].classList.remove("selected");
      navigation.children[i].children[0].children[0].classList.remove(
        "selected"
      );
    }
  }

  let objectPositions = [
    [background.bottomPos0, background.leftPos0, background.rightPos0],
    [background.bottomPos1, background.leftPos1, background.rightPos1],
    [background.bottomPos2, background.leftPos2, background.rightPos2],
    [background.bottomPos3, background.leftPos3, background.rightPos3],
    [background.bottomPos4, background.leftPos4, background.rightPos4],
  ];

  // removing object old position
  function removePos() {
    for (let i = 0; i < 5; i++) {
      bottomObj.classList.remove(objectPositions[i][0]);
      leftObj.classList.remove(objectPositions[i][1]);
      rightObj.classList.remove(objectPositions[i][2]);
    }
  }

  // adding object new position
  function addPos(selected) {
    bottomObj.classList.add(objectPositions[selected][0]);
    leftObj.classList.add(objectPositions[selected][1]);
    rightObj.classList.add(objectPositions[selected][2]);
  }

  // morphing objects (based on client section position)
  function morphObjects() {
    let languagePanel = document.getElementById("langContainer"); // language box
    removePos();
    addPos(selected);
    if (selected === 0) {
      languagePanel.style.right = "35px";
    } else {
      languagePanel.style.right = "-300px";
    }
  }

  let scrollSpy = function () {
    const navigation = document.querySelector(".pageIndicator"); // getting indicator element
    const newsections = document.querySelectorAll("section"); // getting section element
    scrollTop = window.scrollY;
    newsections.forEach(function (section, i) {
      if (
        section.offsetTop < scrollTop + windowHeight / 2 &&
        scrollTop < section.offsetTop + windowHeight / 2
      ) {
        resetSelection(navigation);
        morphObjects();
        selected = i;
        if (navigation === null) {
          return;
        }
        navigation.children[i].children[0].children[2].classList.add(
          "selected"
        );

        navigation.children[
          i
        ].children[0].children[1].children[0].classList.add("selected");
        navigation.children[i].children[0].children[0].classList.add(
          "selected"
        );
      }
    });
  };

  let clickSpy = function (i) {
    // getting current link (new)
    var newLink = window.location.href;
    // getting current page from link (new)
    var newRedactedUrl = newLink.substring(
      newLink.indexOf("#") + 1,
      newLink.length
    );
    if (
      newRedactedUrl === "/" ||
      newLink === "https://tslashdreamy.github.io"
    ) {
      const navigation = document.querySelector(".pageIndicator"); // getting indicator element

      if (selected === i) return;
      resetSelection(navigation);
      morphObjects();
      window.scrollTo({
        top: i * windowHeight,
        behavior: "smooth",
      });
    } else {
      return;
    }
    selected = i;
  };

  function linkAllElement() {
    try {
      const navigation = document.querySelector(".pageIndicator"); // getting indicator element
      navigation.querySelectorAll("li").forEach(function (item, i) {
        item.addEventListener("click", function () {
          clickSpy(i);
        });
      });
    } catch {
      // sometime browser can freeze, so we just wait second time for indicator "spawn"
      setTimeout(() => {
        const navigation = document.querySelector(".pageIndicator"); // getting indicator element
        navigation.querySelectorAll("li").forEach(function (item, i) {
          item.addEventListener("click", function () {
            clickSpy(i);
          });
        });
      }, 1000);
    }
  }

  let listenIndicatorButton = function () {
    var newLink = window.location.href;
    // getting current page from link (new)
    var newRedactedUrl = newLink.substring(
      newLink.indexOf("#") + 1,
      newLink.length
    );
    if (
      newRedactedUrl === "/" ||
      newLink === "https://tslashdreamy.github.io"
    ) {
      try {
        linkAllElement();
      } catch (error) {
        console.info(
          "Oh, hello there, from Taras :D\nLooks like we can't find page indicator, welp we trying again: " +
            error
        );
      }
    } else {
      return;
    }
  };

  // adding scroll event listener for viewing section position
  window.addEventListener("scroll", scrollSpy);
  listenIndicatorButton();

  // checking if url was changed
  (function (history) {
    var pushState = history.pushState;
    history.pushState = function (state) {
      // we need delay to add event listener to loaded indicator DOM
      setTimeout(function () {
        listenIndicatorButton();
      }, 2000);

      return pushState.apply(history, arguments);
    };
  })(window.history);
}

export default pageSpy;
