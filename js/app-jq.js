(function () {
  var $elements = {
    triggers: $('[data-filter-triggers] li a'),
    items: $('[data-filter-items] li'),
  };
  var cssClasses = {
    activeFilter: 'active',
    filtered: 'hidden',
  };

  if (!$elements.triggers.length || !$elements.items.length) {
    return;
  }

  init();

  function initCheck () {
    if ($elements.triggers.is('.' + cssClasses.activeFilter)) {
      $('[data-filter-triggers] .' + cssClasses.activeFilter).first().trigger('click.filter');
    } else {
      $('[data-filter-triggers] li a').first().trigger('click.filter');
    }
  }

  function addActiveClass ($item) {
    $elements.triggers.removeClass(cssClasses.activeFilter);
    $item.addClass(cssClasses.activeFilter);
  }

  function init () {
    $elements.triggers.on('click.filter', function (e) {
      e.preventDefault();
      filterClickHandler($(this));
    });

    initCheck();
  };

  function filterClickHandler ($el) {
    var val = $el.text().toLowerCase();

    addActiveClass($el);
    val === 'all' ? clearFilter() : filterItems(val);
  }

  function clearFilter () {
    $elements.items.removeClass(cssClasses.filtered);
  };

  function filterItems (tag) {
    $elements.items.each(function (i, item) {
      var $currentItem = $(item);
      var tagsText = $currentItem.find('figcaption').text();
      var tags = tagsText.replace(/[,#]/g, '').split(' ');

      // if else for readibility because ternary was too long
      if (checkTags(tag, tags)) {
        $currentItem.removeClass(cssClasses.filtered);
      } else {
        $currentItem.addClass(cssClasses.filtered);
      }
    });
  }

  function checkTags (activeTag, tags) {
    var tagsLength = tags.length;
    var isActive = false;

    if (!tagsLength) {
      return false;
    }
    for (var i = 0; i < tagsLength; i++) {
      if (tags[i].replace('-', ' ').trim() === activeTag) {
        isActive = true;
        break;
      }
    }
    return isActive;
  };

})();
