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
});
