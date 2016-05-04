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
        var text = $('.input[data-field-name="name"]').val().toLowerCase();
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

    $('.input[data-field-name="name"]').keyup(function () {
        translit();
    });
    $('body').on('click', function () {
        $('.message-container').removeClass('success').removeClass('alert');
    });
});