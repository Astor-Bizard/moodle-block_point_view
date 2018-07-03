define(['jquery'], function($) {
    return {
        init: function(idmax, types, moduleids) {
            /* Shortcut to the "SAVE" button at the bottom of the page */
            $('#id_go_to_save').on('click', function() {
                window.location = '#id_submitbutton';
            }).removeClass('btn-secondary').addClass('btn-primary');

            /**
             * Management of the Enable/Disable all types button
             */
            function manageButtonGroup() {
                types.forEach(function(type) {
                    var checkedType = $('.' + type + ':checkbox:checked').length;
                    if ( checkedType === $('.' + type + ':checkbox').length) {
                        $('#id_enable' + jsUcfirst(type) + 's').addClass('active');
                        $('#id_disable' + jsUcfirst(type) + 's').removeClass('active');
                    } else if (checkedType === 0) {
                        $('#id_disable' + jsUcfirst(type) + 's').addClass('active');
                        $('#id_enable' + jsUcfirst(type) + 's').removeClass('active');
                    } else {
                        $('#id_enable' + jsUcfirst(type) + 's').removeClass('active');
                        $('#id_disable' + jsUcfirst(type) + 's').removeClass('active');
                    }
                });
            }

            /**
             * Management of the Enable/Disable all section button
             */
            function manageButtonSection() {
                for (var j = 2; j <= idmax; j++) {
                    var checkedBoxGroup = $('.checkboxgroup' + j + ':checkbox:checked').length;
                    if (checkedBoxGroup === $('.checkboxgroup' + j + ':checkbox').length) {
                        $('#id_enable_' + j).addClass('active');
                        $('#id_disable_' + j).removeClass('active');
                    } else if (checkedBoxGroup === 0) {
                        $('#id_disable_' + j).addClass('active');
                        $('#id_enable_' + j).removeClass('active');
                    } else {
                        $('#id_disable_' + j).removeClass('active');
                        $('#id_enable_' + j).removeClass('active');
                    }
                }
            }

            /**
             * Enable all activities in the section
             * @param {array} event
             */
            function treatEnableForm(event) {
                $('.check_section_' + event.data.id).prop('checked', true);
                $(this).addClass('active');
                $('#id_disable_' + event.data.id).removeClass('active');
                /* Update the buttons state */
                manageButtonGroup();
            }

            /**
             * Disable all activities in the section
             * @param {array} event
             */
            function treatDisableForm(event) {
                $('.check_section_' + event.data.id).prop('checked', false);
                $(this).addClass('active');
                $('#id_enable_' + event.data.id).removeClass('active');
                /* Update the buttons state */
                manageButtonGroup();
            }

            /**
             * Put the first character of a string in upper case
             * @param string A low case string
             * @returns {string} String with the first character in upper case
             */
            function jsUcfirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            /**
             *
             * @param event
             */
            function manageButton(event) {
                if (!$(this).is(':checked')) {
                    $('#id_enable_' + event.data.id).removeClass('active');
                    $('#id_enable' + jsUcfirst(event.data.type) + 's').removeClass('active');
                } else {
                    $('#id_disable_' + event.data.id).removeClass('active');
                    $('#id_disable' + jsUcfirst(event.data.type) + 's').removeClass('active');
                }

                var checkedBoxGroup = $('.checkboxgroup' + event.data.id + ':checkbox:checked').length;
                if (checkedBoxGroup === $('.checkboxgroup' + event.data.id + ':checkbox').length) {
                    $('#id_enable_' + event.data.id).addClass('active');
                } else if (checkedBoxGroup === 0) {
                    $('#id_disable_' + event.data.id).addClass('active');
                }

                var checkedType = $('.' + event.data.type + ':checkbox:checked').length;
                if ( checkedType === $('.' + event.data.type + ':checkbox').length) {
                    $('#id_enable' + jsUcfirst(event.data.type) + 's').addClass('active');
                } else if (checkedType === 0) {
                    $('#id_disable' + jsUcfirst(event.data.type) + 's').addClass('active');
                }
            }

            /**
             *
             * @param event
             */
            function selectChange(event) {
                var value = parseInt(this.value);

                if (value !== 0) {
                    var difficulty;
                    switch (value) {
                        case 1:
                            difficulty = '#129800';
                            break;
                        case 2:
                            difficulty = '#0b619f';
                            break;
                        case 3:
                            difficulty = '#bd0f29';
                            break;
                        case 4:
                            difficulty = '#01262e';
                            break;
                    }

                    (event.data.module).css({
                        'background-color': difficulty,
                        'color': 'white'
                    });
                } else {
                    (event.data.module).css({
                        'background-color': '',
                        'color': ''
                    });
                }
            }

            /**
             *
             */
            function checkConf() {
                if ($('#id_config_enable_likes_checkbox').is(':checked')
                    || $('#id_config_enable_difficulties_checkbox').is(':checked')) {
                    $('#id_activities').css({'display': ''});
                } else {
                    $('#id_activities').css({'display': 'none'});
                }

                if (!$('#id_config_enable_likes_checkbox').is(':checked')) {
                    $('#id_config_images').css({'display': 'none'});
                } else {
                    $('#id_config_images').css({'display': ''});
                }
            }

            $('#id_close_field').on('click', function() {
                $('#id_activities').addClass('collapsed');
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            });

            /* TODO Commenter : Quand une checkbox est coché/décoché, je met à jour l'affachage des boutons Enable/Disable */
            moduleids.forEach(function(moduleId) {
                var classList = $('#id_config_moduleselectm' + moduleId).attr('class');
                if (classList !== undefined) {
                    var type = classList.split(" ")[0];
                    var id = classList.split(" ")[2].slice(13);
                    $('#id_config_moduleselectm' + moduleId).on('click', {id: id, type: type}, manageButton);
                }

                var value = parseInt($('#id_config_difficulty_' + moduleId + ' :selected').val());
                var idConfigDifficulty = $('#id_config_difficulty_' + moduleId);

                if (value !== 0) {
                    var difficulty;
                    switch (value) {
                        case 1:
                            difficulty = '#129800';
                            break;
                        case 2:
                            difficulty = '#0b619f';
                            break;
                        case 3:
                            difficulty = '#bd0f29';
                            break;
                        case 4:
                            difficulty = '#01262e';
                            break;
                    }

                    idConfigDifficulty.css({
                        'background-color': difficulty,
                        'color': 'white'
                    });
                } else {
                    idConfigDifficulty.css({
                        'background-color': '',
                        'color': ''
                    });
                }

                idConfigDifficulty.change({module: idConfigDifficulty}, selectChange);
            });

            /* TODO Commenter : Les boutons Enable/Disable sont mis à jour au chargement de la page */
            for (var j = 2; j <= idmax; j++) {
                $('#id_enable_' + j).on('click', {id: j}, treatEnableForm)
                    .removeClass('btn-secondary').addClass('btn-outline-success');
                $('#id_disable_' + j).on('click', {id: j}, treatDisableForm)
                    .removeClass('btn-secondary').addClass('btn-outline-danger');
            }

            manageButtonSection();

            types.forEach(function(type) {
                $('#id_enable' + jsUcfirst(type) + 's').on('click', function() {
                    /* Check all checkbox of $type */
                    $('input.' + type).prop('checked', true);
                    /* Make the button darker without disable it */
                    $(this).addClass('active');
                    /* And reset the other one to see that this one was cliked */
                    $('#id_disable' + jsUcfirst(type) + 's').removeClass('active');
                    manageButtonSection();
                }).removeClass('btn-secondary').addClass('btn-outline-success');

                $('#id_disable' + jsUcfirst(type) + 's').on('click', function() {
                    $('input.' + type).prop('checked', false);
                    $(this).addClass('active');
                    $('#id_enable' + jsUcfirst(type) + 's').removeClass('active');
                    manageButtonSection();
                }).removeClass('btn-secondary').addClass('btn-outline-danger');
                manageButtonGroup();
            });

            /* Reset images buttun  */
            $('#id_config_reset_pix').on('click', function() {
                $('#id_config_enable_pix_checkbox:checked').prop('checked', false);
                $('#mform1').submit();
            });

            /* Hide fieldsets if Like or Difficulties checkboxes are disabled */
            checkConf();

            $('#id_config_enable_likes_checkbox').on('click', checkConf);
            $('#id_config_enable_difficulties_checkbox').on('click', checkConf);
        }
    };
});