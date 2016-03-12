/**
 * Created by KocaHocTpa on 10.02.2016.
 */

$(document).ready(function(){
    $("#menu ul").hide();
    $("#menu li span").click(function() {
        $("#menu ul:visible").slideUp("normal");
        $(this).children('.triangle').html('▼');
        if (($(this).next().is("ul")) && (!$(this).next().is(":visible"))) {
            $(this).next().slideDown("normal");
            $(this).children('.triangle').html('▲');
        }
    });

    $('.menu-btn').on('click', function(){
       if ($('aside').hasClass('left')){
           $('aside').css('left','-17%').removeClass('left');
           $('.menu-btn').html(' ► ');
       }else {
           $('aside').addClass('left').css('left','0%');
           $('.menu-btn').html(' ◄ ');
       }
    });
    $(function(){

        $.trumbowyg.btnsGrps.test = ['bold', 'link'];

        var customizedButtonPaneTbwOptions = {
            lang: 'en',
            closable: true,
            fixedBtnPane: true,
            tagsToRemove: ['script', 'style'],
            btnsDef: {
                // Customizables dropdowns
                align: {
                    dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ico: 'justifyLeft'
                },
                image: {
                    dropdown: ['insertImage', 'upload'],
                    ico: 'insertImage'
                }
            },
            btns: ['viewHTML',
                '|', 'formatting',
                '|', 'btnGrp-test',
                '|', 'align',
                '|', 'btnGrp-lists',
                '|', 'image',
                '|', 'foreColor', 'backColor',
                '|', 'fontSize', 'fontFamily',
                '|', 'removeformat']
        };
        $('textarea')
            .trumbowyg(customizedButtonPaneTbwOptions)
            .on('dblclick', function(){
                $(this).trumbowyg(customizedButtonPaneTbwOptions);
            });






    });




    function translit(){
        var space = '-';
        var text = $('.input[data-field-name="name"]').val().toLowerCase();
        var transl = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
            'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
            ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
            '#': space, '$': space, '%': space, '^': space, '&': space, '*': space,
            '(': space, ')': space,'-': space, '\=': space, '+': space, '[': space,
            ']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
            '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
            '?': space, '<': space, '>': space, '№':space
        };
        var result = '';
        var curent_sim = '';
        for(i=0; i < text.length; i++) {
            if(transl[text[i]] != undefined) {
                if(curent_sim != transl[text[i]] || curent_sim != space){
                    result += transl[text[i]];
                    curent_sim = transl[text[i]];
                }
            }
            else {
                result += text[i];
                curent_sim = text[i];
            }
        }
        result = TrimStr(result);
        function TrimStr(s) {
            s = s.replace(/^-/, '');
            return s.replace(/-$/, '');
        }

        $('.input[data-field-name="slug"]').val(result);
    }
    $('.input[data-field-name="name"]').keyup(function(){
        translit();
    });
    $('body').on('click',function(){
       $('.message-container').removeClass('success').removeClass('alert');
    });
});