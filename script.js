document.addEventListener('DOMContentLoaded', () => {
  const textArea = document.querySelector('.text-area');
  const boldButton = document.getElementById('bold-button');
  const italicButton = document.getElementById('italic-button');
  const underlineButton = document.getElementById('underline-button');

  const applyStyle = (styleType) => {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    const textBefore = textArea.value.substring(0, start);
    const textAfter = textArea.value.substring(end);

    let styledText;
    let newCursorPos = start;

    switch (styleType) {
      case 'bold':
        styledText = `**${selectedText}**`;
        newCursorPos += 2; // For the two asterisks at the start
        break;
      case 'italic':
        styledText = `*${selectedText}*`;
        newCursorPos += 1; // For the asterisk at the start
        break;
      case 'underline':
        styledText = `__${selectedText}__`; // Using double underscores
        newCursorPos += 2; // For the two underscores at the start
        break;
      default:
        styledText = selectedText; // No change
    }

    textArea.value = textBefore + styledText + textAfter;

    // Adjust cursor position/selection
    if (selectedText) {
      // If text was selected, re-select the modified text
      textArea.setSelectionRange(start, start + styledText.length);
    } else {
      // If no text was selected, place cursor after the inserted opening tags
      textArea.setSelectionRange(newCursorPos, newCursorPos);
    }
    textArea.focus(); // Keep focus on the textarea
  };

  if (boldButton) {
    boldButton.addEventListener('click', () => applyStyle('bold'));
  }
  if (italicButton) {
    italicButton.addEventListener('click', () => applyStyle('italic'));
  }
  if (underlineButton) {
    underlineButton.addEventListener('click', () => applyStyle('underline'));
  }

  // "Save as .txt" functionality
  const saveTxtButton = document.getElementById('save-txt');
  if (saveTxtButton) {
    saveTxtButton.addEventListener('click', () => {
      try {
        const textToSave = textArea.value;
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
        const textToSave = textArea.value;
        // For this mock, we'll save as plain text but with a .docx extension.
        // A real .docx is a zip archive of XML files.
        const blob = new Blob([textToSave], { type: 'text/plain' });
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
        textArea.focus(); // Good practice to focus the area to be printed

        window.print();
      } catch (e) {
        console.error("Error printing to PDF:", e);
        alert("Could not initiate printing. See console for details.");
      }
    });
  }
});
