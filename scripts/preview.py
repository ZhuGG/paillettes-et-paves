from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit
import os
ROOT = Path(__file__).resolve().parent.parent / 'out'
BASE = '/paillettes-et-paves'
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def translate_path(self, path):
        if path.startswith(BASE + '/'):
            path = path[len(BASE):]
        return super().translate_path(path)
    def do_GET(self):
        if urlsplit(self.path).path in ('/', BASE):
            self.send_response(302)
            self.send_header('Location', BASE + '/')
            self.end_headers()
            return
        super().do_GET()
    def send_error(self, code, message=None, explain=None):
        if code == 404 and (ROOT / '404.html').exists():
            data = (ROOT / '404.html').read_bytes()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        else:
            super().send_error(code, message, explain)
print('Local preview: http://127.0.0.1:4828/paillettes-et-paves/', flush=True)
ThreadingHTTPServer(('127.0.0.1',4828), Handler).serve_forever()
