function convertDriveUrl(url="") {
    if (!url.includes("drive.google.com")) {
        return url; // Return original URL if it's not a Google Drive link
    }

    // Check for standard /file/d/.../view format
    const fileIdMatch = url.match(/\/file\/d\/(.*?)\/view/);
    if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }

    // Check for uc?id=...&export=view format
    const idParamMatch = url.match(/[?&]id=([^&]+)/);
    if (idParamMatch && idParamMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${idParamMatch[1]}`;
    }
}

export { convertDriveUrl };