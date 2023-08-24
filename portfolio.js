document.addEventListener("DOMContentLoaded", function () {
  //----------------------------------------------------------------------------
  //배경색 바뀌는 함수문
  let bgcolorNum = 0;
  function bgColorFn(selector) {
    const bgColorList = ["#80ffdb", "#6930c3", "#ffffff", "#f58634"];
    const headerbgColor = document.querySelector("header");

    if (bgcolorNum < bgColorList.length) {
      bgcolorNum++;
      if (bgcolorNum == bgColorList.length) {
        bgcolorNum = 0;
      }
    }

    this.selector = document.getElementById("wrapper");
    this.selector.style.backgroundColor = bgColorList[bgcolorNum];
    headerbgColor.style.backgroundColor = bgColorList[bgcolorNum];
  }

  document.querySelector("#bgColor-btn").addEventListener("click", bgColorFn);

  //----------------------------------------------------------------------------
  //skils 슬라이더 함수문

  const skilOpBtn = document.querySelector(".skils-box-btn");
  const skilClBtn = document.querySelector(".skils-box-close");

  function SkilsFn(el, open = false) {
    (this.el = el), (this.isOpen = open);

    this.isOpen ? this.open() : this.close();
  }

  SkilsFn.prototype.open = function () {
    this.isOpen = true;
    this.el.style.right = "-10px";
  };
  SkilsFn.prototype.close = function () {
    this.isOpen = false;
    this.el.style.right = "-300px";
  };

  const skilsSlide = new SkilsFn(document.querySelector(".skils-box"));

  skilOpBtn.addEventListener("click", function () {
    if (skilsSlide.isOpen) {
      skilsSlide.close();
    } else {
      skilsSlide.open();
    }

    this.style.display = "none";
    bestActive();
    checkPoint.close();
  });

  skilClBtn.addEventListener("click", function () {
    skilsSlide.close();
    skilOpBtn.style.display = "";
    bestSkils.forEach((v) => v.classList.remove("opc1"));
  });

  //best 효과 함수문
  const bestSkils = document.querySelectorAll(".best");

  function bestActive() {
    let i = -1;
    const timer = setInterval(function () {
      if (i < bestSkils.length - 1) {
        i++;
        bestSkils[i].classList.add("opc1");
      } else {
        return false;
      }
    }, 200);

    skilClBtn.addEventListener("click", function () {
      clearInterval(timer);
    });
  }

  //----------------------------------------------------------------------------
  //check-point 함수문

  function CheckFn(el, open = false) {
    (this.el = el), (this.isOpen = open);

    this.isOpen ? this.open() : this.close();
  }

  CheckFn.prototype.open = function () {
    this.el.style.display = "";
    this.isOpen = true;
  };
  CheckFn.prototype.close = function () {
    this.el.style.display = "none";
    this.isOpen = false;
  };

  const checkPoint = new CheckFn(document.querySelector(".check-point"));

  document
    .querySelector(".check-open-btn")
    .addEventListener("click", function (e) {
      checkPoint.open();
      skilsSlide.close();
      skilOpBtn.style.display = "";
    });
  document
    .querySelector(".check-close-btn")
    .addEventListener("click", function (e) {
      checkPoint.close();
    });

  //----------------------------------------------------------------------------
  //tab 함수문 (hash태그를 이용)

  function creatTabFn(selector) {
    //함수문에 사용한 요소들을 상수로 정의
    const el = document.querySelector(selector);
    const liEls = el.querySelectorAll("ul li");
    const tabContent = el.querySelector(".tab-content");
    const firstTabliEl = liEls.item(1).firstElementChild;

    //탭 활성화 함수문

    function activate(target) {
      //a요소를 받음

      const hash = target.hash;
      const anchors = target.closest("ul").querySelectorAll("li a");

      Array.from(anchors).forEach((v) => (v.className = ""));

      Array.from(tabContent.children).forEach(
        (v) => (v.style.display = "none")
      );

      target.className = "active";
      tabContent.querySelector(hash).style.display = "";
    }

    //hash가 변경될 때 처리하는 함수문

    function handleHash() {
      if (location.hash) {
        const selector = `a[href = "${location.hash}"]`;
        activate(document.querySelector(selector));
      } else {
        activate(firstTabliEl);
      }
    }

    window.addEventListener("hashchange", handleHash);

    handleHash();
  }

  window.location.hash = "#aboutme"; //새로고침시 초기화
  creatTabFn(".content-container");

  //----------------------------------------------------------------------------
  //project-list 함수문
  document.querySelectorAll(".project-title").forEach((v) =>
    v.addEventListener("click", function () {
      const El = this.closest("li").querySelector(".project-box");

      if (El.classList[1] == "active") {
        El.classList.remove("active");
      } else {
        El.classList.add("active");
      }
    })
  );

  document.querySelectorAll(".project-image").forEach((v) =>
    v.addEventListener("click", function () {
      const El = this.closest("li").querySelector(".project-content");

      activeMobileFn(El);
    })
  );

  document.querySelectorAll(".mobile_btn").forEach((v) =>
    v.addEventListener("click", function () {
      const El = this.parentNode;

      activeMobileFn(El);
    })
  );

  //project-content 함수문
  function activeMobileFn(selecter) {
    if (selecter.classList[1] == "active-m") {
      selecter.classList.remove("active-m");
    } else {
      selecter.classList.add("active-m");
    }
  }
});
