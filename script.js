document.addEventListener('DOMContentLoaded', () => {
  const textArea = document.querySelector('.text-area'); // This is now a div
  const boldButton = document.getElementById('bold-button');
  const italicButton = document.getElementById('italic-button');
  const strikethroughButton = document.getElementById('strikethrough-button'); // New button

  // Helper function to ensure focus and execute command
  const execFormatCommand = (command) => {
    if (textArea) {
      textArea.focus(); // Ensure the contentEditable div is focused
      document.execCommand(command, false, null);
    }
  };

  // Updated event listeners
  if (boldButton) {
    boldButton.addEventListener('click', () => execFormatCommand('bold'));
  }
  if (italicButton) {
    italicButton.addEventListener('click', () => execFormatCommand('italic'));
  }
  if (strikethroughButton) {
    strikethroughButton.addEventListener('click', () => execFormatCommand('strikeThrough'));
  }

  // Font size selection
  const fontSizeSelect = document.getElementById('fontsize-select');
  if (fontSizeSelect) {
    fontSizeSelect.addEventListener('change', (event) => {
      if (textArea) {
        textArea.focus(); // Ensure the contentEditable div is focused
        const selectedValue = event.target.value;
        document.execCommand('fontSize', false, selectedValue);
      }
    });
  }

  // The old applyStyle function is no longer needed for these buttons.
  // If it was used by other features, it should be kept, otherwise it can be removed.
  // For this task, we assume it's only for these buttons and can be removed.

  // "Save as .txt" functionality
  const saveTxtButton = document.getElementById('save-txt');
  if (saveTxtButton) {
    saveTxtButton.addEventListener('click', () => {
      try {
        const textToSave = textArea.innerText; // Use innerText for contentEditable div
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = 'document.txt'; // Default filename

        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link); // Clean up

        URL.revokeObjectURL(link.href); // Release the object URL
      } catch (e) {
        console.error("Error saving text file:", e);
        // Optionally, inform the user that something went wrong
        alert("Could not save the file. See console for details.");
      }
    });
  }

  // "Save as .docx (mock)" functionality
  const saveDocxButton = document.getElementById('save-docx');
  if (saveDocxButton) {
    saveDocxButton.addEventListener('click', () => {
      try {
        const textToSave = textArea.innerHTML; // Use innerHTML to preserve formatting
        // For this mock, we'll save as HTML content but with a .docx extension.
        const blob = new Blob([textToSave], { type: 'text/html' }); // Change MIME type
        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = 'document.docx'; // Filename with .docx extension

        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link); // Clean up

        URL.revokeObjectURL(link.href); // Release the object URL
      } catch (e) {
        console.error("Error saving .docx (mock) file:", e);
        alert("Could not save the file as .docx. See console for details.");
      }
    });
  }

  // "Print to PDF" functionality
  const printPdfButton = document.getElementById('print-pdf');
  if (printPdfButton) {
    printPdfButton.addEventListener('click', () => {
      try {
        // Ensure the content that needs to be printed is properly focused or selected
        // For this app, the main textarea is the primary content.
        // Modern browsers are pretty good at guessing, but specific print styles (@media print)
        // in style.css would offer more control over what's printed and how.
        if (textArea) { // Ensure textArea is defined
          textArea.focus(); // Good practice to focus the area to be printed
        }
        window.print();
      } catch (e) {
        console.error("Error printing to PDF:", e);
        alert("Could not initiate printing. See console for details.");
      }
    });
  }
});
