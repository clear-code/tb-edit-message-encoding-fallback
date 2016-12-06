/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
  const PREF_FALLBACK = 'extensions.edit-message-encoding-fallback@clear-code.com.fallback';

  const { Services } = Components.utils.import('resource://gre/modules/Services.jsm');

  var originalRecipients2CompFields = window.Recipients2CompFields;
  window.Recipients2CompFields = function Recipients2CompFields(aCompFields) {
    var result = originalRecipients2CompFields.apply(this, arguments);

    var charsetData = CharsetMenu.getData();
    var allSupportedEncodings = charsetData.pinnedCharsets.map(function(aData) { return aData.value })
                                  .concat(charsetData.otherCharsets.map(function(aData) { return aData.value }));
    if (gMsgCompose.compFields.characterSet &&
        allSupportedEncodings.indexOf(gMsgCompose.compFields.characterSet) < 0) {
      let encoding = Services.prefs.getComplexValue(PREF_FALLBACK, Components.interfaces.nsISupportsString).data;
      SetDocumentCharacterSet(encoding);
    }

    return result;
  };
})();
