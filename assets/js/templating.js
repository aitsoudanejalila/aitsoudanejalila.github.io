var pathName = window.location.pathname;
pathName = pathName.replace('.html', '').replace('/', '').replace('/', ''); 
window.navItems =
[
	{ 
		"id": 1,
		"text": "Acceuil",
		"link": "/",
		"active": pathName == "index" || "" ? "active" : "" 
	},
	{
		"id": 2,
		"text": "Publications et Communications",
		"hasSubItems": true,
		"active": pathName == "communications" || pathName == "publications" ? "active" : "",
		"items": [
			{ "_text": "Publications", "_link": "/publications", "active": pathName == "publications" ? "active" : "" },
			{ "_text": "Communications", "_link": "/communications", "active": pathName == "communications" ? "active" : "" }                
		]
	},
	{
		"id": 3,
		"text": "Activites et Services",
		"hasSubItems": true,
		"active": pathName == "activites" || pathName == "services" ? "active" : "",
		"items": [
			{ "_text": "Activites", "_link": "/activites", "active": pathName == "activites" ? "active" : ""},
			{ "_text": "Services", "_link": "/services", "active": pathName == "services" ? "active" : "" }                
		]
	},
	{
		"id": 4,
		"text": "Enseignement",
		"link": "/enseignement",
		"active": pathName == "enseignement" ? "active" : "",
	},
	{
		"id": 5,
		"text": "Evenements",
		"link": "/evenements",
		"active": pathName == "evenements" ? "active" : "",
	},
	{
		"id": 8,
		"text": "Livres",
		"link": "/livres",
		"active": pathName == "livres" ? "active" : "",
	},		
	{
		"id": 8,
		"text": "MASTER MANAGEMENT STRATEGIQUE DES RESSOURCES HUMAINES",
		"link": "/msrh",
		"active": pathName == "msrh" ? "active" : "",
	},	
	{
		"id": 9,
		"text": "CONTRIBUTION A DES PROJETS NATIONAUX",
		"link": "/contributions",
		"active": pathName == "contributions" ? "active" : "",
	},
	{
		"id": 10,
		"text": "Prix",
		"link": "/prix",
		"active": pathName == "prix" ? "active" : "",
	},			
	{
		"id": 6,
		"text": "Biographie",
		"link": "/biographie",
		"active": pathName == "biographie" ? "active" : "",
	},
	{
		"id": 7,
		"text": "Formation",
		"hasSubItems": true,
		"active": pathName == "master" || pathName == "doctorat" || pathName == "license" ? "active" : "",
		"items": [
			{ "_text": "Lisence", "_link": "/lisence", "active": pathName == "lisence" ? "active" : "" },
			{ "_text": "Matser", "_link": "/master", "active": pathName == "master" ? "active" : "" },
			{ "_text": "Doctorat", "_link": "/doctorat", "active": pathName == "dotorat" ? "active" : "" },                
		]
	}
];
window.loadSidebar = function (){
        
    $.Mustache.load('/templates/items-template.html')
        .done(function () {
            $("#menu>ul").mustache('item-tmpl', window.navItems);
            window.setupSidebar();
    });
};

window.setupSidebar = function() {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {
					
					// Prevent default.
					event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');
						
					// Trigger resize (sidebar lock).
					$window.triggerHandler('resize.sidebar-lock');

				});

			});

};


window.loadHeader = function(){
	$.Mustache.load('/templates/header-template.html')
	.done(function () {
		var activeItem = window.navItems.find(i => i.active === 'active');
		if(activeItem.items != 'undefined') {
			title = activeItem.items.find(i => i.active === 'active')._text;
		} else title = activeItem.text;
		$("#header").mustache('header-tmpl', { title: title });
	});
};

$(document).ready(() => { 
	window.loadHeader();	
	window.loadSidebar();
});

[{"Id":":TestModels","Name":"TestModels","DisplayName":null,"AreaName":null,"Actions":[{"Id":":TestModels:Get","Name":"Get","DisplayName":null,"ControllerId":":TestModels"},{"Id":":TestModels:Post","Name":"Post","DisplayName":null,"ControllerId":":TestModels"},{"Id":":TestModels:Put","Name":"Put","DisplayName":null,"ControllerId":":TestModels"},{"Id":":TestModels:Delete","Name":"Delete","DisplayName":null,"ControllerId":":TestModels"}]}]