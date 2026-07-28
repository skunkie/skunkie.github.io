// SPDX-FileCopyrightText: 2026 TorrPlay
//
// SPDX-License-Identifier: MIT

document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('.highlight > pre');

  codeBlocks.forEach((block) => {
    const container = document.createElement('div');
    container.className = 'code-block-container';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-button';
    copyBtn.title = 'Copy to clipboard';
    copyBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span>Copy</span>
    `;

    copyBtn.addEventListener('click', async () => {
      const codeEl = block.querySelector('code') || block;
      const text = codeEl.textContent || codeEl.innerText;

      try {
        await navigator.clipboard.writeText(text);
        copyBtn.classList.add('copied');
        copyBtn.querySelector('span').textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.querySelector('span').textContent = 'Copy';
        }, 2000);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          copyBtn.classList.add('copied');
          copyBtn.querySelector('span').textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.querySelector('span').textContent = 'Copy';
          }, 2000);
        } catch (e) {
          console.error('Failed to copy:', e);
        }
        document.body.removeChild(textarea);
      }
    });

    container.appendChild(copyBtn);

    const parent = block.parentNode;
    parent.insertBefore(container, block);
    container.appendChild(block);
  });
});
