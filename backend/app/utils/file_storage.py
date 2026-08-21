import os
import uuid
import shutil
from fastapi import UploadFile, HTTPException, status
from app.config import settings

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE_MB = 10

def save_uploaded_image(file: UploadFile) -> str:
    # Check extension
    _, ext = os.path.splitext(file.filename.lower())
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format: '{ext}'. Allowed: JPG, JPEG, PNG, WEBP"
        )

    # Generate unique filename
    unique_filename = f"{uuid.uuid4().hex}{ext}"
    dest_path = os.path.join(settings.UPLOAD_DIR, unique_filename)

    try:
        with open(dest_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to write image to disk: {str(e)}"
        )
    finally:
        file.file.close()

    # Return relative static URL path
    return f"/uploads/{unique_filename}"
