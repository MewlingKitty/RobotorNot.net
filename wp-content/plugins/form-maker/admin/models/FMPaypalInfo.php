<?php

/**
 * Class FMModelPaypal_info
 */
class FMModelPaypal_info extends FMAdminModel {
  /**
   * Get form session.
   *
   * @param  int $id
   * @return object $row
   */
  public function get_form_session( $id = 0 ) {
    global $wpdb;
    $row = $wpdb->get_row($wpdb->prepare('SELECT * FROM ' . $wpdb->prefix . 'formmaker_sessions WHERE group_id="%d"', $id));

    return $row;
  }
}
