<?php declare(strict_types=1);

require_once __DIR__ . "/../src/Utils/Images/ExifData.php";

use App\Utils\Images\ExifData;

$template = new class {
    public $exifData = null;
    public string|null $error = null;
};

function processRequest($template) {
    if ($_SERVER["REQUEST_METHOD"] !== "POST" || !isset($_FILES["image"])) {
        return;
    }

    $imageUpload = $_FILES["image"];

    if ($imageUpload["error"] !== UPLOAD_ERR_OK) {
        $template->error = sprintf("File upload failed with code %d", $_FILES["image"]["error"]);
        return;
    }

    $imagePath = $imageUpload["tmp_name"];

    if (!file_exists($imagePath)) {
        $template->error = sprintf("Cannot access image upload path %s", $imagePath);
        return;
    }

    if (!exif_imagetype($imagePath)) {
        $template->error = "The uploaded file is not a valid image";
        return;
    }

    $exifData = exif_read_data($imagePath);
    
    if (!$exifData) {
        $template->error = "Failed to read exif data of the provided image.";
        return;
    }

    $template->exifData = $exifData;
    //$template->exifData = ExifData::from($exifData);
}

processRequest($template);
?>

<!DOCTYPE html>
<html>

<head>
    <title>Exif test</title>
</head>

<body>
    <form method="post" enctype="multipart/form-data">
        <label for="image">Select an image to upload:</label>
        <input type="file" name="image" id="image" accept="image/*" required>
        <br><br>
        <input type="submit" value="Upload and Display EXIF Data">
    </form>

    <hr />

    <?php if ($template->error): ?>
        <p style="background-color: red;padding: 10px">
            <?php echo $template->error; ?>
        </p>
    <?php endif; ?>

    <?php if ($template->exifData): ?>
        <pre><?php print_r($template->exifData); ?></pre>    
    <?php endif; ?>

</body>

</html>