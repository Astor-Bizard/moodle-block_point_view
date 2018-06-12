<?php

define('AJAX_SCRIPT', true);

require(__DIR__ . '/../../config.php');

/* Get all the received parameters */
$table = 'block_like';

$userid = $_POST['userid'];
$cmid = $_POST['cmid'];
$type = $_POST['type'];
$vote = $_POST['vote'];

switch ($_POST['func']) {
    case 'insert':
        $dataobject = new stdClass();
        $dataobject->userid = $userid;
        $dataobject->cmid = $cmid;
        $dataobject->type = $type;
        $dataobject->vote = $vote;

        try {
            $DB->insert_record($table, $dataobject, false);
            echo json_encode('Add OK');
        } catch (dml_exception $e) {
            echo json_encode('Exception : ', $e->getMessage(), '\n');
        }
        break;

    case 'remove':
        $conditions = array('userid' => $userid, 'cmid' => $cmid, 'type' => $type, 'vote' => $vote);

        try {
            $DB->delete_records($table, $conditions);
            echo json_encode('Remove OK');
        } catch (dml_exception $e) {
            echo json_encode('Exception : ', $e->getMessage(), '\n');
        }
        break;

    case 'update':
        try {
            /* Get the good record to have the ID (ask by 'update_record' function)*/
            $target = $DB->get_record('block_like', array('userid' => $userid, 'cmid' => $cmid, 'type' => $type));
        } catch (dml_exception $e) {
            echo json_encode('Exception : ', $e->getMessage(), '\n');
        }

        /* Update the vote */
        $target->vote = $vote;

        try {
            /* Overwrite the selected line */
            $DB->update_record($table, $target);
            echo json_encode('Update OK');
        } catch (dml_exception $e) {
            echo json_encode('Exception : ', $e->getMessage(), '\n');
        }

        break;
}