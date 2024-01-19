const fileInput = document.querySelector("#file-input");

/**
 * Checks the File type on client-side
 * @returns void
 */
function checkFileType() {
  const file = fileInput.files[0];
  if (file) {
    if (file.type !== "text/csv") {
      alert("Upload only csv file");
      fileInput.value = "";
      return;
    }
  }
}

fileInput.addEventListener("change", checkFileType);
