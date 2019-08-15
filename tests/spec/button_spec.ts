describe('pf-btn', function() {
  describe('Changing button type', function() {
    let elem: HTMLElement | null;

    beforeEach(async function() {
      elem = document.body.appendChild(document.createElement('pf-btn'));
      await Promise.resolve();
    });

    it('should choose the right template for default type', function() {
      expect(elem!.shadowRoot!.querySelectorAll('button.pf-c-button').length).toBe(1);
    });

    afterEach(function() {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Changing attributes', function() {
    let elem: HTMLElement | null;

    beforeAll(function() {
      elem = document.body.appendChild(document.createElement('pf-btn'));
    });

    it('should deactivate when disabled attribute is set', async function() {
      elem!.setAttribute('disabled', '');
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('button[disabled]').length).toBe(1);
    });

    afterAll(function() {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });
});
