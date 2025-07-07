let video;
let overlayImage;
let showVideo = true;

// 🔧 Placeholders for LEFT links
const leftLinksData = [
  { text: "Patent by Margaret", href: "https://patents.google.com/patent/US640348A" },
  { text: "Patent by Helen", href: "https://patents.google.com/patent/US683901A" },
  { text: "Patent by Helen", href: "https://patents.google.com/patent/US683901A" },
  { text: "Human Computers", href: "https://www.computerhistory.org/revolution/calculators/1/65/272" },
  { text: "Human Computers", href: "https://www.computerhistory.org/revolution/calculators/1/65/272" },
  { text: "Human Computers", href: "https://www.computerhistory.org/revolution/calculators/1/65/2209" },
  { text: "Patent by Helen", href: "https://patents.google.com/patent/US683901A" },
  { text: "Patent by Helen", href: "https://patents.google.com/patent/US683901A" },
  { text: "Presentation Labor", href: "https://www.computerhistory.org/revolution/minicomputers/11/362" }
];

// 🔧 Placeholders for RIGHT links
const rightLinksData = [
  { text: "Patent by Helen", href: "https://patents.google.com/patent/US683901A" },
  { text: "Patent by Mary", href: "https://patents.google.com/patent/US258518A" },
  { text: "Patent by Mary", href: "https://patents.google.com/patent/US258518A" },
  { text: "Patent by Mary", href: "https://patents.google.com/patent/US258518A" },
  { text: "Patent by Harriet", href: "https://patents.google.com/patent/US666578A" },
  { text: "Patent by Mary", href: "https://patents.google.com/patent/US258518A" },
  { text: "Patent by Mary", href: "https://patents.google.com/patent/US258518A" },
  { text: "Presentation Labor", href: "https://www.computerhistory.org/revolution/minicomputers/11/intro/1910" },
  { text: "Presentation Labor", href: "https://www.computerhistory.org/revolution/minicomputers/11/362" }
];

function preload() {
  overlayImage = loadImage("overlay.png"); // make sure overlay.png is in the same folder
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture({
    video: { facingMode: { ideal: "environment" } },
    audio: false
  });
  video.size(windowWidth, windowHeight);
  video.hide();

  generateLinks();
  updateLayout();
}

function draw() {
  background(0);
  if (showVideo) {
    image(video, 0, 0, width, height);
  }

  // 🖼️ Draw large overlay image in bottom half
  const halfHeight = height / 2;
  let overlayW = width * 0.7;
  let overlayH = overlayImage.height * (overlayW / overlayImage.width);
  const maxH = halfHeight * 0.85;

  if (overlayH > maxH) {
    overlayH = maxH;
    overlayW = overlayImage.width * (overlayH / overlayImage.height);
  }

  const xOffset = (width - overlayW) / 2;
  const yOffset = halfHeight + (halfHeight - overlayH) / 2;

  image(overlayImage, xOffset, yOffset, overlayW, overlayH);

  // 📐 Align links with top of overlay image
  document.getElementById("left-links").style.top = `${yOffset}px`;
  document.getElementById("right-links").style.top = `${yOffset}px`;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
  updateLayout();
}

function generateLinks() {
  const leftCol = document.getElementById("left-links");
  const rightCol = document.getElementById("right-links");

  // Clear existing links (if resizing or redrawing)
  leftCol.innerHTML = "";
  rightCol.innerHTML = "";

  // 🚀 Generate left-side links
  leftLinksData.forEach(link => {
    const a = document.createElement("a");
    a.className = "link-overlay";
    a.innerText = link.text;
    a.href = link.href;
    leftCol.appendChild(a);
  });

  // 🚀 Generate right-side links
  rightLinksData.forEach(link => {
    const a = document.createElement("a");
    a.className = "link-overlay";
    a.innerText = link.text;
    a.href = link.href;
    rightCol.appendChild(a);
  });
}

function updateLayout() {
  showVideo = windowWidth < 300 || windowHeight < 300 ? false : true;

  const outerFrame = document.getElementById("outer-frame");
  const topFrame = document.getElementById("top-frame");

  outerFrame.style.width = `${windowWidth}px`;
  outerFrame.style.height = `${windowHeight}px`;
  outerFrame.style.top = "0px";
  outerFrame.style.left = "0px";

  topFrame.style.width = `${windowWidth}px`;
  topFrame.style.height = `${windowHeight / 2}px`;
  topFrame.style.top = "0px";
  topFrame.style.left = "0px";
}
