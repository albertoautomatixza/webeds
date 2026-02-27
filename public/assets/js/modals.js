(function () {
  const modals = {
    privacy: {
      title: 'Privacy Policy',
      content: `
        <p><strong>Effective Date:</strong> January 1, 2026</p>
        <h3>1. Information We Collect</h3>
        <p>Engineering EDS ("we," "us," or "our") may collect personal information you voluntarily provide when contacting us, including your name, email address, phone number, and company name. We may also automatically collect certain technical data such as IP address, browser type, and pages visited.</p>
        <h3>2. How We Use Your Information</h3>
        <p>We use collected information to respond to inquiries, provide our engineering and automation services, improve our website experience, and send relevant service communications. We do not sell, trade, or rent your personal information to third parties.</p>
        <h3>3. Data Security</h3>
        <p>We implement industry-standard security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
        <h3>4. Cookies</h3>
        <p>Our website may use cookies to enhance your browsing experience. You may choose to disable cookies through your browser settings, though this may affect certain website functionality.</p>
        <h3>5. Third-Party Links</h3>
        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their respective privacy policies.</p>
        <h3>6. Your Rights</h3>
        <p>You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us at contact@engineeringeds.com.</p>
        <h3>7. Changes to This Policy</h3>
        <p>We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.</p>
        <h3>8. Contact</h3>
        <p>For questions regarding this Privacy Policy, please contact Engineering EDS at contact@engineeringeds.com.</p>
      `
    },
    terms: {
      title: 'Terms & Conditions',
      content: `
        <p><strong>Effective Date:</strong> January 1, 2026</p>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using the Engineering EDS website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.</p>
        <h3>2. Services</h3>
        <p>Engineering EDS provides industrial automation, robotic integration, CNC machining, and engineering design services. All services are subject to separate written agreements between Engineering EDS and the client.</p>
        <h3>3. Intellectual Property</h3>
        <p>All content on this website, including text, graphics, logos, images, and software, is the property of Engineering EDS and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is strictly prohibited.</p>
        <h3>4. Use of Website</h3>
        <p>You agree to use this website only for lawful purposes. You must not use the site in any way that causes damage, disruption, or impairs the availability of the site or its services to others.</p>
        <h3>5. Disclaimer of Warranties</h3>
        <p>This website is provided on an "as is" and "as available" basis. Engineering EDS makes no representations or warranties of any kind, express or implied, regarding the accuracy or completeness of any information on the site.</p>
        <h3>6. Limitation of Liability</h3>
        <p>Engineering EDS shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of, or inability to use, this website or its content.</p>
        <h3>7. Governing Law</h3>
        <p>These Terms and Conditions are governed by and construed in accordance with the laws of Mexico. Any disputes shall be subject to the exclusive jurisdiction of the courts of Aguascalientes, Mexico.</p>
        <h3>8. Modifications</h3>
        <p>Engineering EDS reserves the right to modify these Terms at any time. Continued use of the website following any changes constitutes acceptance of the revised terms.</p>
      `
    },
    legal: {
      title: 'Legal Notice',
      content: `
        <p><strong>Effective Date:</strong> January 1, 2026</p>
        <h3>1. Company Information</h3>
        <p>This website is operated by Engineering EDS, a company specializing in industrial automation and engineering solutions, headquartered in Aguascalientes, Mexico.</p>
        <h3>2. Website Purpose</h3>
        <p>This website is provided for informational purposes only. The content presented does not constitute a binding offer or contract for services. All service engagements require a separate written agreement.</p>
        <h3>3. No Professional Advice</h3>
        <p>Content on this website does not constitute professional engineering, legal, financial, or technical advice. Engineering decisions must be made in consultation with qualified professionals under formal agreements.</p>
        <h3>4. Accuracy of Information</h3>
        <p>Engineering EDS strives to ensure that the information on this website is accurate and up to date. However, we make no warranties regarding the completeness, accuracy, or reliability of any content displayed.</p>
        <h3>5. Trademarks</h3>
        <p>All trademarks, service marks, trade names, and logos displayed on this site are the property of their respective owners. Nothing on this site grants any license or right to use any trademark without prior written consent.</p>
        <h3>6. Limitation of Liability</h3>
        <p>To the fullest extent permitted by law, Engineering EDS accepts no liability for any loss or damage arising directly or indirectly from use of this website, reliance on its content, or inability to access the site.</p>
        <h3>7. Jurisdiction</h3>
        <p>Any legal claims or proceedings arising from this website shall be governed by the laws of Mexico and subject to the jurisdiction of competent courts in Aguascalientes, Mexico.</p>
        <h3>8. Contact</h3>
        <p>For legal inquiries, please contact Engineering EDS directly at contact@engineeringeds.com.</p>
      `
    }
  };

  function createModal(type) {
    const { title, content } = modals[type];
    const modal = document.createElement('div');
    modal.className = 'eds-modal-overlay';
    modal.id = `modal-${type}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', `modal-title-${type}`);
    modal.innerHTML = `
      <div class="eds-modal">
        <div class="eds-modal-header">
          <h2 id="modal-title-${type}" class="eds-modal-title">${title}</h2>
          <button class="eds-modal-close" aria-label="Close">&times;</button>
        </div>
        <div class="eds-modal-body">${content}</div>
        <div class="eds-modal-footer">
          <button class="eds-modal-accept">I Accept</button>
        </div>
      </div>
    `;

    const close = () => {
      modal.classList.remove('eds-modal-open');
      setTimeout(() => modal.remove(), 300);
      document.body.style.overflow = '';
    };

    modal.querySelector('.eds-modal-close').addEventListener('click', close);
    modal.querySelector('.eds-modal-accept').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });

    return modal;
  }

  function openModal(type) {
    const existing = document.getElementById(`modal-${type}`);
    if (existing) existing.remove();
    const modal = createModal(type);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => modal.classList.add('eds-modal-open'));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(trigger.dataset.modal);
      });
    });
  });
})();
