<?php
function getContent ($file) {
	$info = array();
	$dfile = fopen($file, "r") or die("Unable to open file!");
	while(!feof($dfile)) {
		$line = trim(fgets($dfile));
		if (substr($line, 0, 1) != "#") {
			$pars = explode("=", $line);
			if (count($pars) == 2) {
				$var = trim($pars[0]);
				$val = trim($pars[1]);
				$info[$var] = $val;
			}
		}
	}
	fclose($dfile);	
	return $info;
}
$info = array();
switch ($_GET["d"]) {
	case "contact":
		$info = getContent("data.inf");
	break;
	case "social":
		$info = getContent("social.inf");
	break;
}

echo json_encode($info);
?>