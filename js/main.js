/**
 * Created by KocaHocTpa on 10.02.2016.
 */

$(document).ready(function () {

    $('.menu-name').click(function () {
        if (!$(this).next().is(':visible')) {
            $(this).next().slideDown("normal");
            $(this).children('.triangle').html('▲');

        } else {
            $(this).next().slideUp("normal");
            $(this).children('.triangle').html('▼');
        }
    });

    $('.load-price').on('click', function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        var file = new FormData();
        if ($('.price-list-send')[0].files[0] != undefined) {
            file.append('price', $('.price-list-send')[0].files[0]);
        }
        var deffered = $.ajax({
            type: 'POST',
            url: '/adm/price',
            contentType: false,
            processData: false,
            data: file
        });
        deffered.done(function(data){
            if(data.status == "OK"){
                $('.input-field[data-field-name=price_name]').val(data.name);
                $('.global-save').click();
            }
        });
    });


    $('.select-item').on('click', function () {
        $('.select-item').removeClass('active');
        if ($(this).attr('href') == '#seo') {
            $('.seo-wrap').css('display', 'block');
            $('.content-wrap').css('display', 'none');
            $(this).addClass('active');
        } else {
            $('.content-wrap').css('display', 'block');
            $('.seo-wrap').css('display', 'none');
            $(this).addClass('active');
        }
    });
    var customizedButtonPaneTbwOptions = {
        resetCss: true,
        removeformatPasted: true,
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
            'formatting',
            'bold',
            'italic',
            'link',
            '|', 'align',
            '|', 'btnGrp-lists',
            '|', 'image',
            '|', 'removeformat']
    };
    $('textarea')
        .trumbowyg(customizedButtonPaneTbwOptions)
        .on('dblclick', function () {
            $(this).trumbowyg(customizedButtonPaneTbwOptions);
        });

    $.fn.dndhover = function (options) {

        return this.each(function () {

            var self = $(this);
            var collection = $();

            self.on('dragenter', function (event) {
                if (collection.size() === 0) {
                    self.trigger('dndHoverStart');
                }
                collection = collection.add(event.target);
            });

            self.on('dragleave', function (event) {
                /*
                 * Firefox 3.6 fires the dragleave event on the previous element
                 * before firing dragenter on the next one so we introduce a delay
                 */
                setTimeout(function () {
                    collection = collection.not(event.target);
                    if (collection.size() === 0) {
                        self.trigger('dndHoverEnd');
                    }
                }, 1);
            });
        });
    };
    function translit() {
        var space = '-';
        var text = $('.input[data-field-name="category_name"]').val().toLowerCase();
        var transl = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
            'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
            ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
            '#': space, '$': space, '%': space, '^': space, '&': space, '*': space,
            '(': space, ')': space, '-': space, '\=': space, '+': space, '[': space,
            ']': space, '\\': space, '|': space, '/': space, '.': space, ',': space,
            '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
            '?': space, '<': space, '>': space, '№': space
        };
        var result = '';
        var curent_sim = '';
        for (i = 0; i < text.length; i++) {
            if (transl[text[i]] != undefined) {
                if (curent_sim != transl[text[i]] || curent_sim != space) {
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

    $('.input[data-field-name="category_name"]').keyup(function () {
        translit();
    });
    $('body').on('click', function () {
        $('.message-container').removeClass('success').removeClass('alert');
    });
});