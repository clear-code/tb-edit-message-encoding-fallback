/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
  var originalRecipients2CompFields = window.Recipients2CompFields;
  window.Recipients2CompFields = function Recipients2CompFields(aCompFields) {
    var charsetData = CharsetMenu.getData();
    var allSupportedEncodings = charsetData.pinnedCharsets.map(function(aData) { return aData.value })
                                  .concat(charsetData.otherCharsets.map(function(aData) { return aData.value }));
    if (gMsgCompose.compFields.characterSet &&
        allSupportedEncodings.indexOf(gMsgCompose.compFields.characterSet) < 0)
      SetDocumentCharacterSet('UTF-8');

    return originalRecipients2CompFields.apply(this, arguments);
  };
})();
