;(function ($, window, document, undefined) {

    var pluginName = 'vibrancy',
        uidCounter = 0,
        defaults = {
            panelClass: 'panel',
            backgroundSrc: ''
        };

    function Vibrancy(el, options) {

        this.el = el;
        this.settings = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    $.extend(Vibrancy.prototype, {

        init: function() {

            var t = this;

            if ($.trim(t.settings.backgroundSrc) === '') {
                throw 'The backgroundSrc option must be set to a valid image source.';
            }

            t.$target = $(t.el);
            t.$target.css('position', 'relative'); // Enables absolute positioning of child elements

            t.targetW = t.$target.width();
            t.targetH = t.$target.height();

            t.$panels = $('.' + t.settings.panelClass, t.$target);
            if (t.$panels.length === 0) {
                throw 'Unable to find any elements with a class matching the panelClass setting "' + t.settings.panelClass + '" within the targeted element.';
            }

            t.vibObjects = [];
            t.imgObjects = [];
            t.imgSources = [];
            t.dataAttrs = [
                'vibrance',
                'blur',
                'brightness'
            ];

            // Calculate and store target-relative panel coordinates
            t.$panels.each(function(i, o) {
                var $panel = $(o),
                    panelPos = $panel.position();
                    panelCoords = [];

                panelCoords.w = $panel.outerWidth();
                panelCoords.h = $panel.outerHeight();
                panelCoords.top = panelPos.top;
                panelCoords.right = (t.targetW - (panelPos.left + panelCoords.w));
                panelCoords.bottom = (t.targetH - (panelPos.top + panelCoords.h));
                panelCoords.left = panelPos.left;

                var canvasId = t._name + '_canvas_' + uidCounter;
                uidCounter++;

                $('<canvas>')
                    .attr({
                        id: canvasId,
                        width: panelCoords.w,
                        height: panelCoords.h
                    })
                    .css({
                        display: 'none',
                        position: 'absolute',
                        top: panelCoords.top,
                        left: panelCoords.left,
                        right: panelCoords.right,
                        bottom: panelCoords.bottom
                    })
                    .appendTo(t.$target);

                var $canvas = $('#' + canvasId),
                    vib = {
                        canvas: $canvas,
                        context: $canvas[0].getContext('2d'),
                        coords: panelCoords,
                        panel: $panel
                    };

                // Retrive data attributes for all panels
                $.each(t.dataAttrs, function(i, s) {
                    vib[s] = (vib.panel.attr('data-vibrancy-' + s)) ? parseInt(vib.panel.attr('data-vibrancy-' + s)) : 0;
                });

                t.vibObjects.push(vib);
            });

            this.loadBackground(t.settings.backgroundSrc);
        },

        loadBackground: function(src) {

            var t = this,
                i = t.imgSources.indexOf(src);

            if (i > -1) {

                t.$target.css('background-image', 'url(' + src + ')');
                t.renderPanels(t.imgObjects[i]);
            } else {

                var img = new Image();
                img.width = t.targetW;
                img.height = t.targetH;
                img.src = src;
                img.onload = function() {
                    t.$target.css('background-image', 'url(' + src + ')');
                    t.imgSources.push(src);
                    t.imgObjects.push(img);
                    t.renderPanels(img);
                }
            }
        },

        renderPanels: function(img) {

            var t = this;

            $.each(t.vibObjects, function(i, o) {

                o.context.drawImage(img, o.coords.left, o.coords.top, o.coords.w, o.coords.h, 0, 0, o.coords.w, o.coords.h);

                Caman(o.canvas[0], function () {

                    this.reloadCanvasData();
                    this.vibrance(o.vibrance).brightness(o.brightness).stackBlur(o.blur).render();

                    // @todo: This should be optional by letting you set a boolean, delay, and a class for things to show
                    if (!o.canvas.is(':visible')) {

                        o.canvas.stop(true, false).fadeIn(100, function() {
                            //o.panel.stop(true, false).fadeIn(200);
                        });
                    }
                });
            });
        }

    });

    // Prevent multiple instantiations
    $.fn[pluginName] = function(options) {

        this.each(function() {

            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Vibrancy(this, options));
            }
        });

        return this;
    };

})(jQuery, window, document);