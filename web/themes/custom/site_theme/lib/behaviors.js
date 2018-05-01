(function(Drupal, $) {

  Drupal.behaviors.foundation = {
    attach:function(context) {
      $(context).foundation();
    }
  }
}(Drupal, jQuery));