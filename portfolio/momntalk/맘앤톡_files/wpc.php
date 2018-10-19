

(function(w) {
    var wg = w.document.getElementById('wp_tg_cts');
    function doPair(url) {
        if (wg == null) { return; }
        (function(_url) {
            var frm = w.document.createElement('IFRAME');
            frm.width = '1px';
            frm.height = '1px';
            frm.style.display = 'none';
            frm.src='about:blank';
            frm.title = 'tgpairing';
            wg.appendChild(frm);

            var ifrm = (frm.contentWindow) ? frm.contentWindow : (frm.contentDocument.document ? frm.contentDocument.document : frm.contentDocument);
            ifrm.document.open();
            ifrm.document.write('<img src="' + _url + '"/>');
            ifrm.document.close();

            setTimeout(function() {
                wg.removeChild(frm);
            }, 2000);
        })(url);
    }

    try {
        var links = ["\/\/cm.g.doubleclick.net\/pixel?google_nid=wider_planet&google_cm&google_ula=12153253,1535620090&poaid=3e239a0803daf105913355b1b234011b","\/\/mat.adpies.com\/mat\/init?oaid=3e239a0803daf105913355b1b234011b&landing=https%3A%2F%2Fastg.widerplanet.com%2Fdelivery%2Fwpp.php%3Fwpg%3Dadpies_rtb%26oaid%3D%24%7BOAID%7D","https:\/\/\/\/idsync.admixer.co.kr:4450\/idsync?pid=102&uid=3e239a0803daf105913355b1b234011b","\/\/analytics.ad.daum.net\/match?d=106&uid=3e239a0803daf105913355b1b234011b","\/\/ssp.meba.kr\/cm.mezzo\/?buyerid=3e239a0803daf105913355b1b234011b&url="],
            len = links.length,
            i;
        for (i=0; i<len; i++) {
            doPair(links[i]);
        }
    } catch(e) {}
})(window);
            
window.bk_async = function()
{ bk_addPageCtx("widerplanet_id", "3e239a0803daf105913355b1b234011b"); BKTAG.doTag(28541, 10); }
;
(function()
{ var scripts=document.getElementsByTagName('script')[0]; var s=document.createElement('script'); s.async = true; s.src = '//tags.bkrtx.com/js/bk-coretag.js'; scripts.parentNode.insertBefore(s, scripts); }
());

(function(w) {
    var skpImg = new Image();

    skpImg.src = '//idm.skplanet.com/pixel?nid=15&uid=3e239a0803daf105913355b1b234011b&url=https%3A%2F%2Fastg.widerplanet.com%2Fdelivery%2Fwpp.php%3Fwpg%3Dskplanet%26uid%3D%25%25SKPDMP_UID%25%25%26err%3D%25%25SKPDMP_ERR%25%25';
})(window);
