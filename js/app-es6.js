(function () {
  const $elements = {
    triggers: [],
    items: [],
  };
  const cssClasses = {
    activeFilter: 'active',
    filtered: 'hidden',
  };

  let activeFilter = null;

  function init () {
    getElements();

    if (!$elements.triggers.length || !$elements.items.length) {
      console.error('There is nothing to filter.')
      return;
    }

    toggleAll(false);

    $elements.triggers.map(item => {
      item.addEventListener('click', clickHandler);
    });
    $elements.triggers[0].click();
  };

  function getElements () {
    $elements.triggers = Array.from(document.querySelectorAll('[data-filter-triggers] li a'));
    $elements.items = Array.from(document.querySelectorAll('[data-filter-items] li'));
  };

  function clickHandler(e) {
    e.preventDefault();
    const clickedEl = e.target;
    const tag = clickedEl.innerText.toLowerCase();

    activeFilter = tag.replace(' ', '-');

    addClass(clickedEl);
    tag === 'all' ? toggleAll(true) : filter();
  };

  function addClass(activeItem) {
    $elements.triggers.map(item => {
      item.classList.remove(cssClasses.activeFilter)
    });
    activeItem.classList.add(cssClasses.activeFilter);
  };

  function toggleAll (conditional) {
    $elements.items.map(item => {
      conditional ?
        item.classList.remove(cssClasses.filtered)
        : item.classList.add(cssClasses.filtered);
    })
  }

  function toggleItem (item, conditional) {
    conditional ?
       item.classList.remove(cssClasses.filtered)
       : item.classList.add(cssClasses.filtered);
  };

  function checkItem (tagList) {
    return tagList.some(item => item === activeFilter);
  };

  function getTagsArray(tags) {
    return tags.innerText.replace(/[#,]/g, '').split(' ');
  }

  function filter () {
    $elements.items.map(item => {
      const tagsList = getTagsArray(item.querySelector('figcaption'));

      toggleItem(item, checkItem(tagsList));
    });
  };

  init();

})();
