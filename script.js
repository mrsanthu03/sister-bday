const papers = document.querySelectorAll(".paper");

papers.forEach((paper, index) => {
  // Wait until DOM is ready to ensure proper size
  const rect = paper.getBoundingClientRect();
  const paperWidth = rect.width;
  const paperHeight = rect.height;

  // Small random offset to look like scattered papers
  const offsetX = Math.random() * 40 - 20; // -20 to +20 px
  const offsetY = Math.random() * 40 - 20;

  const centerX = window.innerWidth / 2 - paperWidth / 2 + offsetX;
  const centerY = window.innerHeight / 2 - paperHeight / 2 + offsetY;

  paper.style.left = `${centerX}px`;
  paper.style.top = `${centerY}px`;
  paper.style.setProperty("--rand", Math.random());

  let dragOffsetX = 0, dragOffsetY = 0, isDragging = false;

  const onMove = (e) => {
    if (!isDragging) return;

    let clientX = e.clientX ?? e.touches[0].clientX;
    let clientY = e.clientY ?? e.touches[0].clientY;

    paper.style.left = `${clientX - dragOffsetX}px`;
    paper.style.top = `${clientY - dragOffsetY}px`;
  };

  const onUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", onUp);
  };

  const onDown = (e) => {
    e.preventDefault(); // Prevent scrolling on mobile
    isDragging = true;

    let clientX = e.clientX ?? e.touches[0].clientX;
    let clientY = e.clientY ?? e.touches[0].clientY;

    const rect = paper.getBoundingClientRect();
    dragOffsetX = clientX - rect.left;
    dragOffsetY = clientY - rect.top;

    // Bring to front
    paper.style.zIndex = `${parseInt(paper.style.zIndex || 0) + 1}`;

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onUp);
  };

  paper.addEventListener("mousedown", onDown);
  paper.addEventListener("touchstart", onDown, { passive: false });
});
