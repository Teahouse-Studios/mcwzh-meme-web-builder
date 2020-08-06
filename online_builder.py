import importlib
import json
import os
import subprocess
import time
from threading import Lock

from flask import Flask, render_template, request, jsonify, send_from_directory, json, make_response

app = Flask(__name__, template_folder='./views/',
            static_folder="static", static_url_path="/static")
app.config['TEMPLATES_AUTO_RELOAD'] = True
nt = 0
lock = Lock()


# TODO: separate java sections and bedrock sections
# TODO: get currently existent modules from both submodule
# TODO: send appropriate args to backend


@app.route('/')
def generate_website():
    je_builder = importlib.import_module('meme-pack-java.build')
    be_builder = importlib.import_module('meme-pack-bedrock.build')
    mods = ["mods/" + file for file in os.listdir('meme-pack-java/mods')]
    enmods = ["en-mods/" + file for file in os.listdir('meme-pack-java/en-mods')]
    language_modules = [
        "modules/" + module for module in je_builder.module_checker().get_module_list('language')]
    resource_modules = [
        "modules/" + module for module in je_builder.module_checker().get_module_list('resource')]
    header_existence = os.path.exists("./views/custom/header.html")
    notice_existence = os.path.exists("./views/custom/notice.html")
    footer_existence = os.path.exists("./views/custom/footer.html")
    manifests = je_builder.module_checker().get_manifests()
    return render_template("index.html", mods=mods, enmods=enmods, language=language_modules, resource=resource_modules,
                           be_resource=be_builder.module_checker().get_module_list(),
                           be_manifests=be_builder.module_checker().get_manifests(),
                           header_existence=header_existence, notice_existence=notice_existence,
                           footer_existence=footer_existence, manifests=manifests)


@app.route('/ajax', methods=['POST'])
def ajax():
    global nt
    lock.acquire(timeout=60)
    try:
        recv_data = json.loads(request.get_data('data'))
        logs = ""
        if nt + 60 <= time.time():
            nt = time.time()
            p = subprocess.Popen(["git", "pull", "origin", "master", "--recurse-submodules"],
                                 stdout=subprocess.PIPE, stderr=subprocess.STDOUT, stdin=subprocess.PIPE)
            p.wait()
            logs += str(p.communicate()[0], 'utf-8', 'ignore')
        else:
            logs += 'Skipping the repository update because there\'s an available cache within 60 seconds.\n'
        # TODO: use importlib to introduce backend builder
        message = {}
        if not recv_data['_be']:
            builder = importlib.import_module('meme-pack-java.build').builder()
            builder.set_args(recv_data)
            builder.build()
            logs += builder.get_logs()
            message = {"code": 200, "argument": recv_data,
                       "logs": logs, "filename": builder.get_filename()}
        else:
            builder = importlib.import_module('meme-pack-bedrock.build').builder()
            builder.set_args(recv_data)
            builder.build()
            logs += builder.get_logs()
            message = {"code": 200, "argument": recv_data,
                       "logs": logs, "filename": builder.get_filename()}
        print(recv_data)
    finally:
        lock.release()
    return json.dumps(message)


@app.route('/builds/<file_name>', methods=['GET'])
def get_file(file_name):
    directory = "./builds"
    try:
        response = make_response(send_from_directory(
            directory, file_name, as_attachment=True))
        return response
    except Exception as e:
        return jsonify({"code": "500", "message": "{}".format(e)})


if __name__ == '__main__':
    app.run()
