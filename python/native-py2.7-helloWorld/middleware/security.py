import os.path
from config import MIME_TYPES_PERMITTED


class Authorize:
    def authMimeTypes(self, extension):
        mimeTypes = MIME_TYPES_PERMITTED.get(extension)
        if mimeTypes is not None:
            return {"mimeTypes": mimeTypes, "status": True}
        return {"mimeTypes": "text/html", "status": False}
