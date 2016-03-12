/* ===========================================================
 /**
 * Created by KocaHocTpa on 10.02.2016.
 */

(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            ru: {
                fontSize  : 'Размер шрифта',
                fontFamily: 'Шрифт'
            },
            en: {
                fontSize: 'Font size',
                fontFamily: 'Font family'
            }
        }
    });


    if (!$.trumbowyg.opts.fontSizes)
        $.trumbowyg.opts.fontSizes = ['8','10','12','14','16','18','20','22','24','28','32','36'];

    if (!$.trumbowyg.opts.fontFamilys)
        $.trumbowyg.opts.fontFamilys = ["RobotoRegular","RobotoBold","RobotoLight","RobotoCondensedRegular","RobotoCondensedBold","RobotoCondensedLight"];


    function insertHTML() {
        var sel, range;
        if (window.getSelection && (sel = window.getSelection()).rangeCount) {
            range = sel.getRangeAt(0);
            range.collapse(true);
            var span = document.createElement("span");
            span.id = "myId";
            span.appendChild( document.createTextNode("hi") );
            range.insertNode(span);

            // Move the caret immediately after the inserted span
            range.setStartAfter(span);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }

    function setStyle(propNme, propVal)
    {
        var selObj = document.getSelection();
        var parentNode = selObj.anchorNode.parentNode;

        var CSSStyleDecl = parentNode.style;

        var spanTag = $('<span/>', {
            'text': selObj
        });

        //Складываем во временную переменную все установленные стили, которые передобавим
        if(parentNode.nodeName == 'SPAN')
        {
            for (var i = CSSStyleDecl.length-1; i >= 0; i--) {
                spanTag.css(CSSStyleDecl[i], CSSStyleDecl.getPropertyValue(CSSStyleDecl[i]));
            }
        }

        spanTag.css(propNme, propVal);

        var spanString = spanTag.prop('outerHTML');

        document.execCommand('insertHTML', false, spanString);

    }

    $.extend(true, $.trumbowyg, {
        opts: {
            btnsDef: {
                fontSize: {
                    dropdown: buildDropdownSize(function(size)
                    {
                        setStyle('font-size', size);
                    })
                },
                fontFamily: {
                    dropdown: buildDropdownFF(function(ffamily)
                    {
                        setStyle('font-family', ffamily);
                    })
                }
            }
        }
    });

    function buildDropdownSize(func) {
        var dropdown = [];

        $.each($.trumbowyg.opts.fontSizes, function (i, size) {
            var btn = 'Font size: ' + size;
            $.trumbowyg.opts.btnsDef[btn] = {
                func: func,
                param: size+ 'px'
            };
            dropdown.push(btn);
        });

        return dropdown;
    }

    function buildDropdownFF(func) {
        var dropdown = [];

        $.each($.trumbowyg.opts.fontFamilys, function (i, ffamily) {
            var btn = ffamily;
            $.trumbowyg.opts.btnsDef[btn] = {
                func: func,
                param: ffamily
            };
            dropdown.push(btn);
        });

        return dropdown;
    }


})(jQuery);
