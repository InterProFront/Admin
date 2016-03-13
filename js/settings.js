(function( $ ) {
    $(function(){

        'use strict';

        //Инициализация загрузчика соответствием имен картинок
        //по размерам и насзначению в серверном компоненте
        //и data-field-name атрибутов в разметке виджета загрузки картинок

        document.initUploadImage({
            original:  'original_link',
            primary:   'primary_link',
            secondary: 'secondary_link',
            icon:      'icon_link',
            preview:   'preview_link',
            alt:       'alt-text'
        });

    });

})(jQuery);






















