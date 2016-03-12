
(function( $ ) {
    $(function(){

        'use strict';

        var Adminka = document.adminkaInterpro;
        Adminka.init({});

        var SIZES = {};

        document.initUploadImage = function(sizes){
            SIZES = sizes;
        };

        var uploadImage = function(){

            var $this = $(this);

            var entity_name  = $this.data('entity');
            var block_name   = $this.data('block');
            var group_name   = $this.data('group');
            var field_name   = $this.data('field-name');

            var messagecontainer;
            var item_id;

            var preview;
            var tags = {};
            var prefix_tag;

            var formData = new FormData();

            var action;

            if(entity_name == 'block') {

                action = 'update_block_image';

                for(var size in SIZES){
                    if (SIZES.hasOwnProperty(size)) {
                        tags[size] = $('.' + SIZES[size] + '[data-block="'+block_name+'"][data-field-name="'+field_name+'"]');
                    }
                }

                if(SIZES.preview !== undefined){
                    preview = $('.preview[data-block="'+block_name+'"][data-field-name="'+field_name+'"]');
                }

                prefix_tag = $('.prefix[data-block="'+block_name+'"][data-field-name="'+field_name+'"]');


                //Информатор:
                messagecontainer = $('.message-container');

            } else if(entity_name == 'groupitem') {

                action = 'update_group_image';

                item_id = $this.data('item-id');

                formData.append("group_id", item_id);

                for(var size in SIZES){
                    if (SIZES.hasOwnProperty(size)) {
                        tags[size] = $('.' + SIZES[size] + '[data-block="'+block_name+'"][data-field-name="'+field_name+'"][data-item-id="'+item_id+'"]');
                    }
                }

                if(SIZES.preview !== undefined){
                    preview = $('.preview[data-block="'+block_name+'"][data-field-name="'+field_name+'"][data-item-id="'+item_id+'"]');
                }

                prefix_tag = $('.prefix[data-block="'+block_name+'"][data-field-name="'+field_name+'"][data-item-id="'+item_id+'"]');

                //Информатор:
                messagecontainer = $('.message-container');
            }

            formData.append("imagefile",  this.files[0]);
            formData.append("image_name", field_name);
            formData.append("block_name", block_name);
            formData.append("group_name", group_name);

            //Сброс информатора:
            messagecontainer.removeClass('alert');
            messagecontainer.removeClass('sucess');
            messagecontainer.text('');
            //-------------------------------------------

            $(this).adminka(
                'postimage',
                {
                    data: formData,
                    url: '/adm/'+action
                },
                {
                    done_callback: function(data){
                        if (data.status === 'OK') {

                            if(data.sizes !== undefined){

                                for(var size in SIZES){
                                    if(data.sizes[size] !== undefined){
                                        tags[size].val(data.sizes[size]);
                                    }
                                }

                                if(data.sizes.preview !== undefined){
                                    preview.attr('src', '/images/' + data.sizes.preview + '?' + (10*Math.random()));
                                }

                                if(data.prefix !== undefined){
                                    prefix_tag.val(data.prefix);
                                }

                            }

                            messagecontainer.addClass('success');
                            messagecontainer.text('Картинка загружена.');
                        }else{
                            messagecontainer.addClass('alert');
                            messagecontainer.text('Картинка НЕ загружена. Статус ошибки: ' + data.status);
                        }
                    },
                    fail_callback: function(data){
                        messagecontainer.addClass('alert');
                        messagecontainer.append('Что-то пошло не по плану: <br>'+JSON.stringify(data));
                    },
                    always_callback: function(data){
                        //Убрать индикатор загрузки, если появится
                    }
                }

            );

        };


        $(document).on('change', '.input_file', uploadImage);

        $(document).on('click', '.clear_slots', function(){
            var $this = $(this);
            var itemid = $(this).data('item-id');
            var blockname = $(this).data('block');

            for(var size in SIZES){
                if (SIZES.hasOwnProperty(size)) {
                    $('.' + SIZES[size] + '[data-item-id="'+itemid+'"][data-block="'+blockname+'"]').val('');
                }
            }

            if(SIZES.preview !== undefined){
                $('.preview[data-item-id="'+itemid+'"][data-block="'+blockname+'"]').attr('src', '');
            }
        });

    });
})(jQuery);