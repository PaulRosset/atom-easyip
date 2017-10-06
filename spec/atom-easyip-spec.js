'use babel';

import AtomEasyip from '../lib/atom-easyip';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomEasyip', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-easyip');
  });

  describe('when the atom-easyip:launch event is triggered', () => {
    it('Show a new workspace with text', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.atom-easyip')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-easyip:launch');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        atom.workspace.onDidOpen((event) => {
          expect(event).toExist()
          expect(event.item).toExist()
        })

      });
    });
  });
});
